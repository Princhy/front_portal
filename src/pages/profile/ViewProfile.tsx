import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  name: string;
  skills: string;
  level: string;
  location: string;
  description: string;
  type: "candidate" | "company";
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
        // TODO: Implement API call to fetch profile
        // const response = await fetch(`/api/profiles/${id}`);
        // const data = await response.json();
        // setProfile(data);
        setLoading(false);
      } catch (error) {
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
            <span>Profil de {profile.name}</span>
            <Button onClick={() => navigate(`/profile/edit/${id}`)}>
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Type</h3>
            <p>{profile.type === "candidate" ? "Candidat" : "Entreprise"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Compétences</h3>
            <p>{profile.skills}</p>
          </div>
          <div>
            <h3 className="font-semibold">Niveau</h3>
            <p>{profile.level}</p>
          </div>
          <div>
            <h3 className="font-semibold">Localisation</h3>
            <p>{profile.location}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{profile.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProfile;