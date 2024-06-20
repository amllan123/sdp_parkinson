import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_IP
const SensorDataForm = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [formData, setFormData] = useState({
    x: 0,
    y: 0,
    z: 0,
    pressure: 0,
    gripAngle: 0,
    timestamp: 0,
  });

  const notifySuccess = (msg) =>
    toast.success(msg, {
      duration: 4000,
      position: "bottom-right",
    });
  const notifyError = (msg) =>
    toast.error(msg, {
      duration: 4000,
      position: "bottom-right",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.x !== 0 &&
      formData.y !== 0 &&
      formData.z !== 0 &&
      formData.gripAngle !== 0 &&
      formData.pressure !== 0 &&
      formData.timestamp !== 0
    ) {
      try {
        const { x, y, z, pressure, gripAngle, timestamp } = formData;
        const data = {
          x: parseFloat(x),
          y: parseFloat(y),
          z: parseFloat(z),
          pressure_angle: parseFloat(pressure),
          grip_angle: parseFloat(gripAngle),
          timestamp: parseFloat(timestamp),
        };
  
        const response = await axios.post(`https://sdp-api-d469.onrender.com/predict_bltsm`, data);
        const result = response.data;
        setPredictionResult(result.result);
        setAccuracy(result.prediction);
        handleShow();
        notifySuccess("Prediction successful!");
      } catch (error) {
        notifyError("Prediction failed!");
      }
    } else {
      notifyError("Fill every field to continue!");
    }
  };
  

  return (
    <Container fluid>
      <div className="form-wrapper">
        <div className="sensor-form">
          <Form onSubmit={handleSubmit}>
            <Row className="mt-3">
              <Col className="p-3">
                <Form.Group controlId="formX">
                  <Form.Label>X</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="x"
                      type="number"
                      value={formData.x}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>m/sec</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col className="p-3">
                <Form.Group controlId="formY">
                  <Form.Label>Y</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="y"
                      type="number"
                      value={formData.y}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>m/sec</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col className="p-3">
                <Form.Group controlId="formZ">
                  <Form.Label>Z</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="z"
                      type="number"
                      value={formData.z}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>m/sec</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="p-3">
                <Form.Group controlId="formPressure">
                  <Form.Label>Pressure</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="pressure"
                      type="number"
                      value={formData.pressure}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>Unit</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="p-3">
                <Form.Group controlId="formGripAngle">
                  <Form.Label>Grip Angle</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="gripAngle"
                      type="number"
                      value={formData.gripAngle}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>Unit</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="p-3">
                <Form.Group controlId="formTimestamp">
                  <Form.Label>Timestamp</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="timestamp"
                      type="number"
                      value={formData.timestamp}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>Unit</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12} className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prediction Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className={predictionResult ? "red" : "green"}>
            Final Prediction: {predictionResult ? "Parkinson" : "Healthy"}
          </h5>
  
          <p>
            Please note that this result is an estimate and should not be
            considered a definitive diagnosis. It is important to consult with a
            qualified healthcare professional for a comprehensive evaluation and
            formal diagnosis.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </Container>
  );
};

export default SensorDataForm;
