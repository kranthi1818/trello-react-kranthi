import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";


export default function Cards({ name, id ,prefs}) {

  const navigate = useNavigate()
  function navigateToBoard(id) {
    navigate(`/${id}`)
  }

  const backgroundImage = prefs?.backgroundImage;
  const backgroundColor = prefs?.backgroundColor || '#7E4E91';

  return (
    <Card onClick={() => navigateToBoard(id)} sx={{ minWidth: '15rem', marginLeft: 3, marginTop: 10, borderRadius: 2 }}>
      <CardMedia
         sx={{
          height: '5rem',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: !backgroundImage ? backgroundColor : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}

      />
      <CardContent sx={{ bgcolor: '#333C43', color: 'white', height: '4rem' }}>
        <Typography sx={{ cursor: 'pointer' }} variant="h5" component='div'>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
