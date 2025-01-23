import { useState } from "react";
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

interface Application {
  id: string;
  announcementTitle: string;
  company: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

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

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Mes candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Annonce</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.announcementTitle}</TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{application.appliedAt}</TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
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