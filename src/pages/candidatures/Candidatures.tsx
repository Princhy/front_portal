import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '@/components/mui/headerNavbar';
import axios from 'axios';
import { 
    Box, 
    TextField,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip 
  } from '@mui/material';

 import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  
  interface Candidature {
    id: number;
    cv: string;
    userId: number;
    jobId: number;
    entiteId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }


const AllPosts = () => {

const [candidatures, setCandidatures] = useState<Candidature[]>([]);

const [value, setValue] = React.useState('all');

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    
  };
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/post/getposts');
        setCandidatures(response.data.posts);
        console.log(candidatures)
      } catch (error) {
        console.error('Erreur lors de la récupération des candidatures:', error);
      }
    };
    fetchCandidatures();
  }, []);
    return (
        <div>
            <ResponsiveAppBar />
            <div className='container'>
            <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Recherche" variant="standard" />
        
    </Box>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
         <FormControlLabel value="all" control={<Radio />} label="Toutes" />
        <FormControlLabel value="female" control={<Radio />} label="En attente" />
        <FormControlLabel value="male" control={<Radio />} label="Accepte" />
        <FormControlLabel value="other" control={<Radio />} label="Refuse" />
      </RadioGroup>
    </FormControl>
    <Divider/>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>CV</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Job ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Date de création</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidatures.map((candidature) => (
            <TableRow
              key={candidature.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {candidature.id}
              </TableCell>
              <TableCell>{candidature.cv}</TableCell>
              <TableCell align="right">{candidature.userId}</TableCell>
              <TableCell align="right">{candidature.jobId}</TableCell>
              <TableCell align="right">
                <Chip 
                  label={candidature.status}
                  color={candidature.status === 'pending' ? 'warning' : 'success'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                {new Date(candidature.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                <DeleteIcon color="error" />
                </IconButton>
                <IconButton>
                <EditIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
    );
};

export default AllPosts;