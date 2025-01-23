import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Content {
  id: string;
  type: "profile" | "announcement" | "application";
  title: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<Content[]>([]);

  const handleValidate = async (id: string) => {
    try {
      // TODO: Implement API call to validate content
      toast({
        title: "Contenu validé",
        description: "Le contenu a été validé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Implement API call to delete content
      toast({
        title: "Contenu supprimé",
        description: "Le contenu a été supprimé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des contenus</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>{content.type}</TableCell>
                  <TableCell>{content.title}</TableCell>
                  <TableCell>{content.status}</TableCell>
                  <TableCell>{content.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleValidate(content.id)}
                      >
                        Valider
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(content.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;