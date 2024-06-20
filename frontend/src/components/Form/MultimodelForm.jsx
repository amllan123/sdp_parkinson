import React, { useState } from "react";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
const baseurl = import.meta.env.VITE_API_IP

const MultimodelForm = () => {
  const [selectedSpiral, setSelectedSpiral] = useState(null);
  const [selectedWave, setSelectedWave] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [spiralFile, setSpiralFile] = useState(null);
  const [waveFile, setWaveFile] = useState(null);
  const [formData, setFormData] = useState({
    x: 0,
    y: 0,
    z: 0,
    pressure: 0,
    gripAngle: 0,
    timestamp: "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpiralUpload = (event) => {
    const file = event.target.files[0];
    setSpiralFile(file);
    setSelectedSpiral(URL.createObjectURL(file));
  };

  const handleWaveUpload = (event) => {
    const file = event.target.files[0];
    setWaveFile(file);
    setSelectedWave(URL.createObjectURL(file));
  };

  const handleClearSpiral = () => {
    setSelectedSpiral(null);
    setSpiralFile(null);
  };

  const handleClearWave = () => {
    setSelectedWave(null);
    setWaveFile(null);
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
      selectedSpiral &&
      selectedWave
    ) {
      

      const data = new FormData();
      data.append("wave_file", waveFile);
      data.append("spiral_file", spiralFile);
      data.append("x", formData.x);
      data.append("y", formData.y);
      data.append("z", formData.z);
      data.append("pressure_angle", formData.pressure);
      data.append("grip_angle", formData.gripAngle);
      data.append("timestamp", formData.timestamp);

      try {
        const response = await axios.post(`https://sdp-api-d469.onrender.com/predict_combined`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setPredictionResult(response.data.prediction);
        notifySuccess('Prediction completed successfully');
        handleShow();
      } catch (error) {
        console.error('There was an error!', error);
        notifyError('Prediction failed');
        handleShow();
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
                      type="number"
                      name="x"
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
                      type="number"
                      name="y"
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
                      type="number"
                      name="z"
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
              <Form.Group controlId="formPressure">
                <Form.Label>Pressure</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="pressure"
                    value={formData.pressure}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text>.Unit</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group controlId="formGripAngle">
                <Form.Label>Grip Angle</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="gripAngle"
                    value={formData.gripAngle}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                  <InputGroup.Text>Deg</InputGroup.Text>
                </InputGroup>
              </Form.Group>
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
            <Row className="mt-4 justify-content-center">
              <Col xs={12} md={6}>
                <Form.Group
                  controlId="formSpiralUpload"
                  className="text-center"
                >
                  <Form.Label>Upload Spiral Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleSpiralUpload}
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
              {selectedSpiral && (
                <Col xs={12} md={6}>
                  <div
                    className="border p-3 mb-4 position-relative"
                    style={{ width: "200px", height: "200px" }}
                  >
                    <CloseButton
                      className="position-absolute top-0 end-0 mt-2 me-2"
                      onClick={handleClearSpiral}
                    />
                    <Image src={selectedSpiral} fluid />
                  </div>
                </Col>
              )}
            </Row>
            <Row className="mt-4 justify-content-center">
              <Col xs={12} md={6}>
                <Form.Group controlId="formWaveUpload" className="text-center">
                  <Form.Label>Upload Wave Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleWaveUpload}
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
              {selectedWave && (
                <Col xs={12} md={6}>
                  <div
                    className="border p-3 mb-4 position-relative"
                    style={{ width: "200px", height: "200px" }}
                  >
                    <CloseButton
                      className="position-absolute top-0 end-0 mt-2 me-2"
                      onClick={handleClearWave}
                    />
                    <Image src={selectedWave} fluid />
                  </div>
                </Col>
              )}
            </Row>

            <Row className="mt-4 justify-content-center">
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
          <h5 className={predictionResult ? "red" : "green"}>Final Prediction: {predictionResult ? "Parkinson" : "Healthy"}</h5>
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

export default MultimodelForm;
