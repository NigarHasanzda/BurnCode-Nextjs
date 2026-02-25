"use client";

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function CardSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1300,
        margin: '60px auto',
        display: 'grid',
        gap: 4, 
        px: { xs: 2, md: 4 },
        gridTemplateColumns: {
          xs: '1fr',     
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)', 
        },
        alignItems: 'stretch' 
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: '#F7F9FB', 
            borderRadius: '48px', 
            p: '14px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%', 
          }}
        >
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              borderRadius: '38px', 
              width: '100%',
              height: 230, 
              bgcolor: 'rgba(0,0,0,0.04)',
              transform: 'none' 
            }} 
            animation="wave" 
          />
          <Box sx={{ pt: 4, pb: 2, px: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Skeleton variant="circular" width={18} height={18} animation="wave" />
              <Skeleton variant="text" width="30%" height={20} animation="wave" />
            </Box>
            <Skeleton variant="text" width="95%" height={30} animation="wave" sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="70%" height={30} animation="wave" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}