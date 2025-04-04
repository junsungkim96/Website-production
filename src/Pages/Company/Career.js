import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
// import Button from 'react-bootstrap/Button';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import data from '../../data/Career_data.js';
import {MdArrowDropDown, MdArrowDropUp} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {company_name} from '../../data/Company_data.js';

const Careers = () => {
  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>Careers at {isSmallScreen ? <br/> : null} {company_name} </p> <br/>
          </div>
          <div>
            <p style = {{fontSize: '30px', marginBottom: '10vh'}}>If you are passionate about revolutionizing computer vision, come join us!</p>
          </div>
          {/* <div>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px', marginRight: '1%'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All teams</div>
            </Button>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All locations</div> 
            </Button>
          </div> */}
          {/* <div>
            <DownloadButton/>
          </div> */}
        </div>
      </div>

      <hr class="separator"></hr>
      
      {data.map((a, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <hr className="separator" />}
          <div
            className="update-container"
            style={{ marginBottom: '30px', marginTop: '30px', cursor: 'pointer' }}
            onClick={() => setTab(tab === i ? null : i)} // Click toggles expansion
          >
            <div className="career-left-text" style={{ cursor: 'pointer'}}>
              <span className="role-container" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {tab === i ? (
                  <MdArrowDropUp color="white" size="1.2em" />
                ) : (
                  <MdArrowDropDown color="white" size="1.2em" />
                )}
                <span className="role-text">{a.role}</span>
                
              </span>
              <p style={{ margin: 0, color: 'lightgray'}}>{a.location}</p> {/* a.location on a separate line */}
            </div>
            <div className="right-text" style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
              <span className="underline" style={{ padding: '5px 10px', // adjust padding to make the area smaller
                                                  borderRadius: '5px',}}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  navigate('/apply');
                }}
              >
                <p>Apply now</p>
              </span>
            </div>
          </div>

          {/* The expanded part is also clickable */}
          {tab === i && (
            <div
              className = "career-description"
              style={{
                textAlign: 'left',
                fontSize: '20px',
                marginBottom: '3.5vh',
                cursor: 'pointer', // Add cursor pointer to show that it's clickable
              }}
              onClick={() => setTab(tab === i ? null : i)} // Keep the click event here
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: a.description.replace(/\n/g, '<br/>'),
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
      
    </div>
  )
};


export default Careers;