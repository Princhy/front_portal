import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, FileText, Users } from "lucide-react";
import ResponsiveAppBar from "@/components/mui/headerNavbar";

const CompanyDashboard = () => {
  const [stats] = useState({
    totalAnnouncements: 12,
    totalApplications: 45,
    pendingApplications: 8
  });

  const navigate = useNavigate();

  return (
   <div>
    <ResponsiveAppBar/>
     <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Entreprise</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Annonces</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnnouncements}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatures Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatures en Attente</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des Annonces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate("/announcements/create")} className="w-full">
              Créer une nouvelle annonce
            </Button>
            <Button onClick={() => navigate("/company/announcements")} variant="outline" className="w-full">
              Voir mes annonces
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Candidatures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate("/company/candidatures")} className="w-full">
              Voir les candidatures
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
   </div>
  );
};

export default CompanyDashboard;