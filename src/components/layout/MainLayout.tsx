import React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout = observer(() => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderTop: 1}}>
        <Typography variant="caption" sx={{ padding: "8px" }}>
          {"© STG User Dashboard"}
        </Typography>
      </Box>
      
    </>
  );
});

export default MainLayout;
