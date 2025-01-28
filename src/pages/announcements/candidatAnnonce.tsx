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
        const response = await axios.get('http://localhost:5000/products/getjob');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setFormData({
      ...formData,
      jobId: job.id,
      titre: job.titre,
      location: job.location,
      salary: job.salary || '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0], // Récupère le fichier CV sélectionné
    });
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('message', formData.message);
      form.append('cv', formData.cv); // Ajoute le fichier CV
      form.append('userId', formData.userId);
      form.append('jobId', formData.jobId);
      form.append('entiteId', formData.entiteId);
      form.append('status', formData.status);

      await axios.post('http://localhost:5000/api/posts/postuler', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Votre candidature a été soumise avec succès.');
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la soumission de la candidature:', error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="mx-2 my-2" variant="outlined">
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom variant="h5" component="div">
                  {job.titre}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(job)}
                >
                  Postuler
                </Button>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {job.description}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Stack direction="row" spacing={1}>
                <Chip label={`${job.salary?.toLocaleString() || 'N/A'} Ar`} variant="outlined" />
                <Chip label={job.location} variant="outlined" />
              </Stack>
            </Box>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Postuler pour : {selectedJob?.titre}
          </Typography>
          <TextField
            fullWidth
            name="message"
            label="Message de motivation"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <input
            type="file"
            accept=".pdf"
            name="cv"
            onChange={handleFileChange}
            style={{ display: 'block', marginTop: '1rem' }}
          />
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Postuler
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AllAnnouncements;
