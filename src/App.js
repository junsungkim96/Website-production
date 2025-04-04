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
import Product from './Pages/Product/Product';
import Pricing from './Pages/Product/Pricing';
import Research from './Pages/Research/Research';
import Optics from './Pages/Research/Optics';
import Sensor from './Pages/Research/Sensor';
import ISP from './Pages/Research/ISP';
import Illuminant from './Pages/Research/Illuminant';
import Blog from './Pages/Company/Blog';
import FoundingStory from './Pages/Company/BlogPost/1_FoundingStory';
import CV from './Pages/Company/BlogPost/2_ComputerVision.js';
import Company from './Pages/Company/Company';
import Careers from './Pages/Company/Career';
import Stories from './Pages/Company/Stories';
import IR from './Pages/Company/IR';
import News from './Pages/Company/News';
import Login from './Pages/Utils/Login';
import Signup from './Pages/Utils/Signup';
import ApplicationFrom from './Pages/Utils/Apply';

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
        <Route path="/illuminant" element={<MainLayout>< Illuminant /></MainLayout>}/>
        <Route path="/optics" element={<MainLayout>< Optics /></MainLayout>}/>
        <Route path="/sensor" element={<MainLayout>< Sensor /></MainLayout>}/>
        <Route path="/isp" element={<MainLayout>< ISP /></MainLayout>}/>
        
        {/* Company */}
        <Route path="/company" element={<MainLayout>< Company /></MainLayout>} />
        <Route path="/blog" element={<MainLayout>< Blog /></MainLayout>}/>
        <Route path="/careers" element={<MainLayout>< Careers /></MainLayout>} />
        <Route path="/stories" element={<MainLayout>< Stories /></MainLayout>} />
        <Route path="/ir" element={<MainLayout>< IR /></MainLayout>} />
        <Route path="/news" element={<MainLayout>< News /></MainLayout>} />

        {/* Company Blog */}
        <Route path="/blog/founding_story" element={<MainLayout>< FoundingStory /></MainLayout>}/>
        <Route path="/blog/cv" element={<MainLayout>< CV /></MainLayout>}/>
        
        {/* Signup & Apply */}
        <Route path="/login" element={< Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/apply" element={< ApplicationFrom />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;