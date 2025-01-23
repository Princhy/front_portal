import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: "service" | "emploi" | "stage";
}

const JobCard = ({ title, company, location, type }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-heading">{title}</CardTitle>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 className="w-4 h-4" />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Voir l'annonce</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;