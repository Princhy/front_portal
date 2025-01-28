import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
nom: string;
  prenom: string;
  email: string;
  location: string;
  contact: string;
  role: string;
}

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Effectuer l'appel API pour récupérer le profil par ID
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        const data = await response.json();

        if (response.ok) {
          // Si la réponse est réussie, mettre à jour le profil
          setProfile(data.user);
        } else {
          // Gérer le cas où le profil n'est pas trouvé
          toast({
            variant: "destructive",
            title: "Erreur",
            description: data.message || "Impossible de charger le profil",
          });
        }
        setLoading(false);
      } catch (error) {
        // Gestion de l'erreur si l'appel échoue
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger le profil",
        });
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, toast]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!profile) {
    return <div>Profil non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Profil de {profile.nom}</span>
            <Button onClick={() => navigate(`/profile/edit/${id}`)}>
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Type</h3>
            <p>{profile.role}</p>
          </div>
          <div>
            <h3 className="font-semibold">Nom</h3>
            <p>{profile.nom}</p>
          </div>
          <div>
            <h3 className="font-semibold">Prenom</h3>
            <p>{profile.prenom}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{profile.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <p>{profile.contact}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProfile;
