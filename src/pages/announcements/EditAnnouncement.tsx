import { useToast } from "@/components/ui/use-toast";

const EditAnnouncement = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Modifier l'annonce</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Formulaire de modification d'annonce à implémenter</p>
      </div>
    </div>
  );
};

export default EditAnnouncement;