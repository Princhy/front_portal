import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  announcementTitle: string;
  company: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

const Applications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer l'ID de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  // Fonction pour récupérer toutes les candidatures de l'utilisateur
  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/applications/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setApplications(data.applications);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.message || "Impossible de charger les candidatures",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la récupération des candidatures",
      });
      setLoading(false);
    }
  };

  // Récupérer les candidatures lors du chargement du composant
  useEffect(() => {
    fetchApplications();
  }, [userId, toast]);

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "accepted":
        return <Badge variant="default">Acceptée</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejetée</Badge>;
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (applications.length === 0) {
    return <div>Aucune candidature trouvée</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Annonce</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {applications.map((application) => (
    <TableRow key={application.id}>
      <TableCell>{application.Job ? application.Job.titre : "Non spécifié"}</TableCell>
      <TableCell>{application.Entite ? application.Entite.nom_entreprise : "Non spécifié"}</TableCell>
      <TableCell>{application.status}</TableCell>
      <TableCell>{application.createdAt}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleStatusChange(application.id, "accepted")}
          >
            Accepter
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleStatusChange(application.id, "rejected")}
          >
            Rejeter
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ))}
  {applications.length === 0 && (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-8">
        Aucune candidature pour le moment
      </TableCell>
    </TableRow>
  )}
</TableBody>
     </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
