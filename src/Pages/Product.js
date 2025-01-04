import '../App.css';
import Button from 'react-bootstrap/Button';
import React, {useLayoutEffect} from 'react';

const Product = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>Main features</p> <br/>
          </div>
          <div>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px', marginRight: '1%'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>Illuminant Change</div>
            </Button>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All locations</div> 
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Product;