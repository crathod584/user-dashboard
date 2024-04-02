// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Box } from '@mui/material';
import Navigation from './routes/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: "100%", minHeight: "100%" }}>
          <Navigation />
        </Box>
    </Provider>
  );
};

export default App;
