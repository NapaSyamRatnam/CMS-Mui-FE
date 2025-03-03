import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GalleryCard from './Gallery';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)({
  marginTop: "8px",
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'common.white',
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Gallerydisplay() {

  return (
    <div style={{ overflowY: "auto" }}>
    <Grid container spacing={4}>
      <Grid item xs={6} md={1} lg={1} xl={1}></Grid>
      <Grid item xs={6} md={11} lg={11} xl={11} style={{ padding: "60px" }}>
        <GalleryCard/>
      </Grid>
    </Grid>
    </div>
  );
}
