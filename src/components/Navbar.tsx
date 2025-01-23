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