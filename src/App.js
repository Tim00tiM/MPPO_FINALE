import React from 'react';
import LoginPage from './LoginPage'
import UserPage from './UserPage';
import { Routes, Route } from 'react-router-dom';
import Graph from './graph/graph'
function App(){


  return (
        <>
          <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/sensor/:id" element={<Graph />} />
          </Routes>
        </>
  )
}

export default App;