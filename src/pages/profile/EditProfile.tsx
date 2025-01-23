import { useToast } from "@/components/ui/use-toast";

const EditProfile = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Modifier le profil</h1>
      {/* Placeholder for edit profile form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Formulaire de modification de profil à implémenter</p>
      </div>
    </div>
  );
};

export default EditProfile;