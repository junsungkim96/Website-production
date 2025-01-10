import '../App.css';
import React, {useLayoutEffect} from 'react';

const Blog = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', paddingBottom: '10vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>
              Technology Blog
            </p>
            <br/>
          </div>
          <div>
            <p>
              Lens Design Optimization for Downstream Tasks
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Physical sensor simulation
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Active illumination methods
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              AI recommendation for Image Signal Processing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Blog;