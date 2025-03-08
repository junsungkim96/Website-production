import './styles/desktop.css';
import './styles/laptop.css';
import './styles/tablet.css';
import './styles/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Suspense} from 'react';
import Menubar from './component/Menubar';
import Footer from './component/Footer';
import Homepage from './Pages/Homepage';
import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Research from './Pages/Research';
import Optics from './Pages/Optics';
import Sensor from './Pages/Sensor';
import ISP from './Pages/ISP';
import Algorithms from './Pages/Algorithms';
import Blog from './Pages/Blog';
import Company from './Pages/Company';
import Careers from './Pages/Career';
import Stories from './Pages/Stories';
import IR from './Pages/IR';
import News from './Pages/News';
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
        {/* Homepage */}
        <Route path="/" element={<MainLayout>< Homepage /></MainLayout>} />
        
        {/* Product */}
        <Route path="/product_overview" element={<MainLayout>< Product /></MainLayout>}/>
        <Route path="/product_pricing" element={<MainLayout>< Pricing /></MainLayout>}/>
        
        {/* Research */}
        <Route path="/research" element={<MainLayout>< Research /></MainLayout>}/>
        <Route path="/optics" element={<MainLayout>< Optics /></MainLayout>}/>
        <Route path="/sensor" element={<MainLayout>< Sensor /></MainLayout>}/>
        <Route path="/isp" element={<MainLayout>< ISP /></MainLayout>}/>
        <Route path="/algorithms" element={<MainLayout>< Algorithms /></MainLayout>}/>
        
        {/* Company */}
        <Route path="/company" element={<MainLayout>< Company /></MainLayout>} />
        <Route path="/blog" element={<MainLayout>< Blog /></MainLayout>}/>
        <Route path="/careers" element={<MainLayout>< Careers /></MainLayout>} />
        <Route path="/stories" element={<MainLayout>< Stories /></MainLayout>} />
        <Route path="/ir" element={<MainLayout>< IR /></MainLayout>} />
        <Route path="/news" element={<MainLayout>< News /></MainLayout>} />
        
        {/* Signup & Apply */}
        <Route path="/login" element={< Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/apply" element={< ApplicationFrom />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;