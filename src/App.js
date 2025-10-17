import './styles/desktop.css';
import './styles/laptop.css';
import './styles/tablet.css';
import './styles/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {Suspense} from 'react';
import Menubar from './component/Menubar';
import Footer from './component/Footer';
import Homepage from './Pages/LandingPage/Homepage.js';
import Product from './Pages/Product/Product.js';
import Pricing from './Pages/Product/Pricing.js';
import DownloadPage from './Pages/Product/Download.js';
import Payment from './Pages/Product/Payment.js';
import Research from './Pages/Research/Research.js';
import Optics from './Pages/Research/Optics.js';
import Sensor from './Pages/Research/Sensor.js';
import ISP from './Pages/Research/ISP.js';
import QPU from './Pages/Research/QPU.js';
import Illuminant from './Pages/Research/Illuminant.js';
import Blog from './Pages/Company/Blog.js';
import FoundingStory from './Pages/Company/BlogPost/1_FoundingStory.js';
import CV from './Pages/Company/BlogPost/2_ComputerVision.js';
import Company from './Pages/Company/Company.js';
import Careers from './Pages/Company/Career.js';
import Stories from './Pages/Company/Stories.js';
import IR from './Pages/Company/IR.js';
import News from './Pages/Company/News.js';
import Login from './Pages/Utils/Login.js';
import Signup from './Pages/Utils/Signup.js';
import ApplicationFrom from './Pages/Company/Apply.js';
import Submit from './Pages/Company/Submit.js';
import Contact from './Pages/Utils/Contact.js';
import ContactSales from './Pages/Utils/ContactSales.js';
import Terms from './Pages/Utils/Terms.js';
import Privacy from './Pages/Utils/Privacy.js';
import Demo from './Pages/Utils/Demo.js';
import Simulate from './Pages/Simulation/Simulate.js';
import DesktopInfo from './Pages/Utils/DesktopLogin.js';
import Dashboard from './Pages/Utils/Dashboard.js';

import {Analytics} from '@vercel/analytics/react';

const MainLayout = ({ children }) => (
  <div className="App">
    <Menubar />
    {children}
    <Footer />
  </div>
);

const ProtectedRoute = ({children}) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if(!isLoggedIn){
    alert('You must be logged in to access this page')
    return <Navigate to="/login" replace />
  }

  return children
}

const App = () => (
  <>
    {/* Vercel Analytics for Website */}
    <Analytics/>

    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<MainLayout>< Homepage /></MainLayout>} />
          
          {/* Product */}
          <Route path="/product_features" element={<MainLayout>< Product /></MainLayout>}/>
          <Route path="/product_pricing" element={<MainLayout>< Pricing /></MainLayout>}/>
          <Route path="/download" element = {<DownloadPage />}/>
          <Route path="/payment" element = {<Payment />}/>
          
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
          <Route path="/simulate" element = {<ProtectedRoute> <Simulate/> </ProtectedRoute>} />

          {/* Signup & Apply */}
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/apply" element={< ApplicationFrom />} />
          <Route path="/submit" element={< Submit /> } />
          <Route path="/desktop-info" element={< DesktopInfo/>} />

          {/* Contact, Terms of Use & Privacy */}
          <Route path="/contact" element={<MainLayout>< Contact /></MainLayout>}/>
          <Route path="/terms" element={<MainLayout>< Terms /></MainLayout>}/>
          <Route path="/privacy" element={<MainLayout>< Privacy /></MainLayout>}/>
          <Route path="/contact_sales" element = {<MainLayout>< ContactSales /></MainLayout>}/>
          <Route path="/demo" element = {<MainLayout><Demo/></MainLayout>}/>

          {/* Admin Page */}
          <Route path="/dashboard" element={< Dashboard />} />

        </Routes>
      </Suspense>
    </Router>
  </>
);

export default App;