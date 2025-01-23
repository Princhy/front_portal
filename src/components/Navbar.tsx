import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-primary">
          MadaPro
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/entreprises" className="text-gray-600 hover:text-primary">
            Entreprises
          </Link>
          <Link to="/annonces" className="text-gray-600 hover:text-primary">
            Annonces
          </Link>
          <Button asChild variant="outline">
            <Link to="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Inscription</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;