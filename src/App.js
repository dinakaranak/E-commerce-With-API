import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Website from './Components/Website';
import Signup from './Components/Signup';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/Website' element={<Website />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
       

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App