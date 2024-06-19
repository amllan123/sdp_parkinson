import React, { useState } from 'react'
import sensor_img from '../assets/sensor-img.jpg'
import spiral_wave_img from '../assets/spiral-wave-img.png'
import int_form_img from '../assets/int-form-img.png'
import SensorDataForm from './Form/SensorDataForm'
import SpiralWaveForm from './Form/SpiralWaveForm';
import MultimodelForm from './Form/MultimodelForm'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainContent = ({ id }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleCardClick = (formName) => {
    setSelectedForm(formName);
  };

  return (
    <div id={id} className='main-content'>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={sensor_img} />
            <Card.Body>
              <Card.Title>Sensor data</Card.Title>
              <Button variant="primary" onClick={() => handleCardClick('sensorData')}>
                Open Form
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={spiral_wave_img} />
            <Card.Body>
              <Card.Title>Spiral & Waves</Card.Title>
              <Button variant="primary" onClick={() => handleCardClick('spiralWaves')}>
                Open Form
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={int_form_img} />
            <Card.Body>
              <Card.Title>Integrated version of both</Card.Title>
              <Button variant="primary" onClick={() => handleCardClick('integrated')}>
                Open Form
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {selectedForm === 'sensorData' && <SensorDataForm />}
      {selectedForm === 'spiralWaves' && <SpiralWaveForm />}
      {selectedForm === 'integrated' && <MultimodelForm />}
    </div>
  );
};

export default MainContent