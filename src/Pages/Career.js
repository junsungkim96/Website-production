import '../App.css';
import Button from 'react-bootstrap/Button';
import React, {useLayoutEffect, useState} from 'react';
import DownloadButton from '../component/DownloadBtn';
import data from '../data/Career_data.js';
import {MdArrowDropDown} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>Careers at QuantumAI</p> <br/>
          </div>
          <div>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px', marginRight: '1%'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All teams</div>
            </Button>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All locations</div> 
            </Button>
          </div>
          <div>
            <DownloadButton/>
          </div>
        </div>
      </div>

      <hr class="separator"></hr>
      
      {
        data.map((a, i) => (
          <>
          {i !== 0 && <hr class="separator"></hr>}
          <div class="update-container" style = {{marginBottom: '30px', marginTop: '30px', cursor: 'pointer'}} 
          onClick = {()=>setTab(i === tab ? null : i)}>
            <div className="career-left-text">
              {tab === i && <MdArrowDropDown color = 'white' size = '1.2em'/>}
              { a.role} <br/>
              <p2>{a.location}</p2>
            </div>
            <div className="right-text" onClick = {()=>{navigate('/apply')}}>
              <span className = "underline" style = {{cursor: 'pointer'}}>Apply now</span> ↗
            </div>
          </div>
          {tab === i && <div style = {{textAlign: 'left', fontSize: '20px', paddingLeft: '20%', paddingRight: '20%', marginBottom: '3.5vh'}}>
            <p2>{a.description}</p2></div>}
          </>
        ))
      }
      
    </div>
  )
};


export default Careers;