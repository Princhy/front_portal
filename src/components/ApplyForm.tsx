import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const ApplyForm = ({ announcementId }: { announcementId: string }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    coverLetter: "",
    cv: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, cv: file });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner un fichier PDF",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cv || !formData.coverLetter) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et joindre votre CV",
      });
      return;
    }

    try {
      // TODO: Implement API call to submit application
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été soumise avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la candidature",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Postuler à cette offre</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Lettre de motivation</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Présentez votre motivation pour ce poste"
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv">CV (PDF uniquement)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="cv"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cv")?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {formData.cv ? formData.cv.name : "Sélectionner votre CV"}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Envoyer ma candidature
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplyForm;