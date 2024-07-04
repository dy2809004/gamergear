import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './Component/LoginPage/LoginPage'
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/HomePage/HomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/SignUpPage' element={<SignUpPage />} />
              <Route path='/HomePage' element={<HomePage />} />
              <Route path='SignUpPage/HomePage' element={<HomePage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
