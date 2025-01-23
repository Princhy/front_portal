import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase } from "lucide-react";

interface CompanyCardProps {
  name: string;
  location: string;
  sector: string;
  size: "petite" | "moyenne" | "grande";
}

const CompanyCard = ({ name, location, sector, size }: CompanyCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-heading">{name}</CardTitle>
          <Badge>{size}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{sector}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;