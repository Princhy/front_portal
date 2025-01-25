import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import CompanyCard from "@/components/CompanyCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import  Navbar  from "@/components/Navbar";

const Index = () => {
  // Exemple de données (à remplacer par des vraies données plus tard)
  const recentJobs = [
    {
      title: "Développeur Full Stack",
      company: "Tech Solutions Madagascar",
      location: "Antananarivo",
      type: "emploi" as const,
    },
    {
      title: "Stage Marketing Digital",
      company: "Digital Agency",
      location: "Toamasina",
      type: "stage" as const,
    },
  ];

  const featuredCompanies = [
    {
      name: "Tech Solutions Madagascar",
      location: "Antananarivo",
      sector: "Technologies",
      size: "moyenne" as const,
    },
    {
      name: "Digital Agency",
      location: "Toamasina",
      sector: "Marketing",
      size: "petite" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">
            Trouvez votre opportunité professionnelle à Madagascar
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            MadaPro connecte les talents avec les meilleures entreprises de Madagascar
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/entreprises">Explorer les entreprises</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/annonces">Voir les annonces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-heading font-bold">Dernières annonces</h2>
          <Button asChild variant="ghost">
            <Link to="/annonces" className="flex items-center gap-2">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16 container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-heading font-bold">Entreprises en vedette</h2>
          <Button asChild variant="ghost">
            <Link to="/entreprises" className="flex items-center gap-2">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCompanies.map((company, index) => (
            <CompanyCard key={index} {...company} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;