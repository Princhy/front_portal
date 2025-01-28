import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResponsiveAppBar from "@/components/mui/headerNavbar";
import axios from "axios";


interface FormData {
  titre: string;
  description: string;
  location: string;
  salary: string;
  publied_by: string;
  type: string;
  statuts: string;
}

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    location: "",
    salary: "",
    publied_by: "", // À récupérer depuis localStorage
    type: "emploi",
    statuts: "Disponible"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.description || !formData.type || !formData.location) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    // TODO: Implement announcement creation logic with your backend
    try {
      // const response = await createAnnouncement(formData);
      const response = await axios.post("http://localhost:5000/products/storejob", {
        titre: formData.titre,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
        publied_by:"10",
        type:formData.type, 
        statuts: formData.statuts});

      toast({
        title: "Annonce créée",
        description: "Votre annonce a été publiée avec succès",
      });
      navigate("/company/announcements");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'annonce",
      });
    }
  };

  return (
    <div>
      <ResponsiveAppBar/>
      <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Publier une annonce</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input
                id="title"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                placeholder="Titre de l'annonce"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type d'annonce</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type d'annonce" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emploi">Emploi</SelectItem>
                  <SelectItem value="stage">Stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Localisation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Salaire</Label>
              <Input
                id="location"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="salaire"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée de l'annonce"
                className="min-h-[200px]"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Publier l'annonce
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default CreateAnnouncement;