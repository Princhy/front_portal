import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface CompanyFields {
  size: "petite" | "moyenne" | "grande";
  sector: string;
  region: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom:"",
    contact:"",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "candidate",
     // or "company"
  });

  const [companyFields, setCompanyFields] = useState<CompanyFields>({
    size: "petite",
    sector: "",
    region: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    if (formData.userType === "company" && (!companyFields.sector || !companyFields.region)) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs entreprise",
      });
      return;
    }

    try {
      // TODO: Implement registration logic with your backend
      if (formData.userType === "company") {
        // Company Registration
        await axios.post("http://localhost:5000/api/entite", {
          nom_entreprise: formData.nom, // Adjust as needed
          email: formData.email,
          password: formData.password,
          adresse: companyFields.region,
          contact: formData.contact, // Add contact if needed
          logo: "", // Add logo if needed
          secteur: companyFields.sector,
          taille: companyFields.size,
        });

        toast({
          title: "Inscription réussie",
          description: "Votre compte entreprise a été créé avec succès",
        });
    
        navigate("/login");
      } else {
        // User Registration
        await axios.post("http://localhost:5000/api/signup", {
          nom: formData.nom,
          prenom:formData.nom, // Add name if needed
          email: formData.email,
          password: formData.password,
          role:"Candidate",
          contact: formData.contact,
          
        });
    
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      })

      navigate("/login");
    } 
  }catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
      });
      console.log(formData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="number"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="votre contact"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label>Type de compte</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={(value) => setFormData({ ...formData, userType: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <Label htmlFor="candidate">Candidat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Entreprise</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.userType === "company" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Taille de l'entreprise</Label>
                  <Select
                    value={companyFields.size}
                    onValueChange={(value: "petite" | "moyenne" | "grande") =>
                      setCompanyFields({ ...companyFields, size: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petite">Petite (&lt; 50 employés)</SelectItem>
                      <SelectItem value="moyenne">Moyenne (50-250 employés)</SelectItem>
                      <SelectItem value="grande">Grande (&gt; 250 employés)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Secteur d'activité</Label>
                  <Input
                    id="sector"
                    value={companyFields.sector}
                    onChange={(e) =>
                      setCompanyFields({ ...companyFields, sector: e.target.value })
                    }
                    placeholder="Ex: Informatique, Finance, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Région</Label>
                  <Input
                    id="region"
                    value={companyFields.region}
                    onChange={(e) =>
                      setCompanyFields({ ...companyFields, region: e.target.value })
                    }
                    placeholder="Ex: Île-de-France, PACA, etc."
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;