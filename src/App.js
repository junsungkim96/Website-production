import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Suspense} from 'react';
import Menubar from './component/Menubar';
import Footer from './component/Footer';
import Homepage from './Pages/Homepage';
import Careers from './Pages/Career';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ApplicationFrom from './Pages/Apply';

const MainLayout = ({ children }) => (
  <div className="App">
    <Menubar />
    {children}
    <Footer />
  </div>
);

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />
        <Route path="/careers" element={<MainLayout><Careers /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply" element={<ApplicationFrom />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;