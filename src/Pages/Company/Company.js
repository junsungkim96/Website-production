import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const Company = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh' }}>
      <div className="career-left-text">
        <div>
          <p style = {{fontSize: '50px'}}>
            Our Vision
          </p>
          <br/>
          <p>
            Accelerate innovation through advanced simulation software solutions
          </p>
        </div>
        <div style = {{marginTop: '15vh'}}>
          <p style = {{fontSize: '50px'}}>
            Our Mission
          </p>
          <br/>
          <p>
            By advancing computer vision simulation technology, we help industries develop smarter, 
            more efficient vision systems while eliminating the need for physical prototypes, 
            reducing waste, and protecting the environment
          </p>
        </div>
        <div style = {{marginTop: '15vh'}}>
          <p style = {{fontSize: '50px'}}>
            Our Core Values
          </p>
          <br/>
          <p>
            
          </p>
        </div>
    
      </div>
    </div>
  );
};

export default Company;
