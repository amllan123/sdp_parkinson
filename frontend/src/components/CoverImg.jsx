import React from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';

function CoverImg() {
  const handleClick = () => {
    const mainContent = document.getElementById('main-content');
    mainContent.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className='hero-container'>
      <h3>EARLY PD DETECTOR</h3>
      <div style={{width:"50vw"}}>
      <p style={{textAlign: 'center'}}>Parkinson's disease as first described by the British scientist Dr. James Parkinson in 1817, is a progressive neurodegenerative disorder, that affects the dopamine producing neurons, which in turn results in motor dysfunction.</p>
      <p style={{textAlign: 'center'}}> With our early PD detector we aim to provide accurate results through spiral and wave drawings, sensor readings taken via digitized pen on a graphical tablet or an integrated version of both taken through handwriting activity.</p>
      </div>
      <div className='hero-btns'>
        <Button variant='success' onClick={handleClick}>
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default CoverImg;