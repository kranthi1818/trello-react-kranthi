import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";


export default function Cards({ name, id }) {

  const navigate = useNavigate()
  function navigateToBoard(id) {
    navigate(`/${id}`)
  }

  return (
    <Card onClick={() => navigateToBoard(id)} sx={{ minWidth: '15rem', marginLeft: 3, marginTop: 10, borderRadius: 2 }}>
      <CardMedia
        sx={{ height: '5rem', bgcolor: '#7E4E91' }}

      />
      <CardContent sx={{ bgcolor: '#333C43', color: 'white', height: '4rem' }}>
        <Typography sx={{ cursor: 'pointer' }} variant="h5" component='div'>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
