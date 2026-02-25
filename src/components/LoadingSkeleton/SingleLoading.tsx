"use client";

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function SingleSkeleton() {
  return (
    <Box
      sx={{
        width: '98%',
        maxWidth: 1300, // Ana konteynerlə eyni genişlik
        margin: '40px auto',
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          // BlogCard ilə eyni vizual struktur
          bgcolor: '#F7F9FB', 
          borderRadius: '48px', 
          p: '18px', // Şəkildəki p-4/p-5 arası boşluq
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Şəkil Skeletonu - Hündürlük 360px olaraq saxlanıldı */}
        <Skeleton 
          variant="rectangular" 
          sx={{ 
            borderRadius: '38px', 
            width: '100%',
            height: 360, 
            bgcolor: 'rgba(0,0,0,0.04)',
            transform: 'none'
          }} 
          animation="wave" 
        />

        {/* Məzmun Hissəsi */}
        <Box sx={{ pt: 5, pb: 3, px: 2 }}>
          {/* Tarix bölməsi üçün yer */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" width="15%" height={25} animation="wave" />
          </Box>

          {/* Başlıq bölməsi - Daha böyük və dolğun */}
          <Skeleton variant="text" width="90%" height={45} animation="wave" sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={45} animation="wave" />
          
          {/* Əlavə olaraq mətn (content) yeri (Single post olduğu üçün) */}
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="100%" height={20} animation="wave" />
            <Skeleton variant="text" width="100%" height={20} animation="wave" />
            <Skeleton variant="text" width="40%" height={20} animation="wave" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}