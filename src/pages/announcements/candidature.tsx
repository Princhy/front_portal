import { useEffect, useState } from 'react';
import ResponsiveAppBar from '@/components/mui/navbarcandidat';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AllAnnouncements = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Annonce sélectionnée
  const [isModalOpen, setIsModalOpen] = useState(false); // État du modal
  const [formData, setFormData] = useState({
    message: '', // Message de motivation
    cv: null, // Le fichier CV
    userId: 1, // ID utilisateur (à remplacer avec l'utilisateur connecté)
    jobId: '', // ID de l'emploi
    entiteId: 1, // ID de l'entité (à remplacer avec l'ID de l'entité de l'utilisateur)
    status: 'pending', // Statut de la candidature (par défaut 'pending')
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/api/posts/posts');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    };
    fetchJobs();
  }, []);

  


  return (
    <div>
      <ResponsiveAppBar />
   

     
    </div>
  );
};

export default AllAnnouncements;
