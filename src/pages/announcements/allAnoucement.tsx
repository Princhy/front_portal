import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '@/components/mui/headerNavbar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useToast } from "@/hooks/use-toast";

import axios from 'axios';
const styles = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   // border: 'rounded',
    boxShadow: 24,
    p: 4,
  };


const AllAnnouncements = () => {

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);  
    const { toast } = useToast();
     // Ajout des états pour le formulaire
const [formData, setFormData] = useState({
    titre: '',
    description: '',
    salary: '',
    location: ''
});
    
    // États pour les modales
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    // Fonctions pour la modale de suppression
    const handleOpenDelete = (job) => {
        setSelectedJob(job);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setSelectedJob(null);
        setOpenDelete(false);
    };

    // Fonctions pour la modale de modification
    
// Mise à jour de handleOpenEdit
const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setFormData({
        titre: job.titre,
        description: job.description,
        salary: job.salary,
        location: job.location
    });
    setOpenEdit(true);
};

const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};
    const handleCloseEdit = () => {
        setSelectedJob(null);
        setOpenEdit(false);
    };

    // Fonction de suppression
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/deletejob/${selectedJob.id}`);
            setJobs(jobs.filter(job => job.id !== selectedJob.id));
            handleCloseDelete();
            toast({
                title: "Annonce supprimée",
                description: "Votre annonce a été supprimée avec succès",
              });
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    // Fonction de modification
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/products/updatejob/${selectedJob.id}`, formData);
            setJobs(jobs.map(job => 
                job.id === selectedJob.id 
                    ? { ...job, ...formData }
                    : job
            ));
            handleCloseEdit();
            toast({
                title: "Annonce modifiée",
                description: "Votre annonce a été modifiée avec succès",
              });
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products/getjob');
                setJobs(response.data.jobs);
                console.log(jobs)
            } catch (error) {
                console.error('Erreur lors de la récupération des emplois:', error);
            }
        };
        fetchJobs();
    }, []);
    return (
        <div>
            <ResponsiveAppBar/>
            <div className="container p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                    <Card key={job.id} className='mx-2 my-2' variant="outlined">
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h5" component="div">
                                    {job.titre}
                                </Typography>
                                <Typography>
                                <button onClick={() => handleOpenEdit(job)}> <ModeEditOutlineIcon color="success" /></button>
                                <button onClick={() => handleOpenDelete(job)}> <DeleteIcon sx={{ color: pink[500] }}/></button>
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="body2">
                                {job.description}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <Chip label={`${job.salary.toLocaleString()} Ar`} variant="outlined" />
                                <Chip label={job.location} variant="outlined" />
                                <Chip label={job.statuts} color="success" />
                                <Chip label={job.type} color="primary" />
                            </Stack>
                            
                        
                        </Box>
                       
                    </Card>
                ))}
            </div>

        {/* Modale de suppression */}
        <Modal open={openDelete} onClose={handleCloseDelete}>
            <Box sx={style}>
                <Typography variant="h6">
                    Confirmer la suppression
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Êtes-vous sûr de vouloir supprimer cette annonce ?
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button onClick={handleCloseDelete} variant="outlined">
                        Annuler
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Supprimer
                    </Button>
                </Stack>
            </Box>
        </Modal>

        {/* Modale de modification */}
        
<Modal open={openEdit} onClose={handleCloseEdit}>
    <Box sx={style}>
        <Typography variant="h6">
            Modifier l'annonce
        </Typography>
        <form onSubmit={handleEdit}>
            <TextField
                fullWidth
                label="Titre"
                name="titre"
                value={formData.titre}
                onChange={handleFormChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                fullWidth
                label="Salaire"
                name="salary"
                value={formData.salary}
                onChange={handleFormChange}
                margin="normal"
                type="number"
            />
            <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                margin="normal"
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button onClick={handleCloseEdit} variant="outlined">
                    Annuler
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Enregistrer
                </Button>
            </Stack>
        </form>
    </Box>
</Modal>
        </div>
    );
};

export default AllAnnouncements;