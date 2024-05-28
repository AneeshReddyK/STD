import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login';
import LogoutForm from './components/Logout';
import SignUpForm from './components/register';
import StudentForm from './components/StudentsForm';
import HomePage from './components/Homepage';
import ViewResults from './components/ViewResults';
import ResultPage from './components/ResultsPage';
import Header from './components/Header';
import AuthContext, { AuthProvider } from './components/AuthContext';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>

        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/authcontext" element={<AuthContext />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/Homepage" element={<HomePage />} />
              <Route path="/Studentsform" element={<StudentForm />} />
              <Route path="/ViewResults" element={<ViewResults />} />
              <Route path="/ResultsPage/:hallTicketNo" element={<ResultPage />} />
              <Route path="/logout" element={<LogoutForm />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
