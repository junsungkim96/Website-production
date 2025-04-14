import './styles/desktop.css';
import './styles/laptop.css';
import './styles/tablet.css';
import './styles/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Suspense} from 'react';
import Menubar from './component/Menubar';
import Footer from './component/Footer';
import Homepage from './pages/Homepage.js';
import Product from './pages/Product/Product.js';
import Pricing from './pages/Product/Pricing.js';
import Research from './pages/Research/Research.js';
import Optics from './pages/Research/Optics.js';
import Sensor from './pages/Research/Sensor.js';
import ISP from './pages/Research/ISP.js';
import QPU from './pages/Research/QPU.js';
import Illuminant from './pages/Research/Illuminant.js';
import Blog from './pages/Company/Blog.js';
import FoundingStory from './pages/Company/BlogPost/1_FoundingStory.js';
import CV from './pages/Company/BlogPost/2_ComputerVision.js';
import Company from './pages/Company/Company.js';
import Careers from './pages/Company/Career.js';
import Stories from './pages/Company/Stories.js';
import IR from './pages/Company/IR.js';
import News from './pages/Company/News.js';
import Login from './pages/Utils/Login.js';
import Signup from './pages/Utils/Signup.js';
import ApplicationFrom from './pages/Utils/Apply.js';
import Submit from './pages/Utils/Submit.js';
import Contact from './pages/Utils/Contact.js';
import ContactSales from './pages/Utils/ContactSales.js';
import Terms from './pages/Utils/Terms.js';
import Privacy from './pages/Utils/Privacy.js';

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
        <Route path="/product_features" element={<MainLayout>< Product /></MainLayout>}/>
        <Route path="/product_pricing" element={<MainLayout>< Pricing /></MainLayout>}/>
        
        {/* Research */}
        <Route path="/research" element={<MainLayout>< Research /></MainLayout>}/>
        <Route path="/illuminant" element={<MainLayout>< Illuminant /></MainLayout>}/>
        <Route path="/optics" element={<MainLayout>< Optics /></MainLayout>}/>
        <Route path="/sensor" element={<MainLayout>< Sensor /></MainLayout>}/>
        <Route path="/isp" element={<MainLayout>< ISP /></MainLayout>}/>
        <Route path="/qpu" element={<MainLayout>< QPU /></MainLayout>}/>
        
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
        <Route path="/submit" element={< Submit /> } />

        {/* Contact, Terms of Use & Privacy */}
        <Route path="/contact" element={<MainLayout>< Contact /></MainLayout>}/>
        <Route path="/terms" element={<MainLayout>< Terms /></MainLayout>}/>
        <Route path="/privacy" element={<MainLayout>< Privacy /></MainLayout>}/>
        <Route path="/contact_sales" element = {<MainLayout>< ContactSales /></MainLayout>}/>

      </Routes>
    </Suspense>
  </Router>
);

export default App;