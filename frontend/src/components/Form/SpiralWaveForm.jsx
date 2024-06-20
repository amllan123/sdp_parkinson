import React, { useEffect, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_IP

const SpiralWaveForm = () => {
  const [selectedSpiral, setSelectedSpiral] = useState(null);
  const [selectedWave, setSelectedWave] = useState(null);

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

  const handleSpiralUpload = (event) => {
    const file = event.target.files[0];
    setSelectedSpiral(file);
  };

  const handleWaveUpload = (event) => {
    const file = event.target.files[0];
    setSelectedWave(file);
  };

  const handleClearSpiral = () => {
    setSelectedSpiral(null);
  };

  const handleClearWave = () => {
    setSelectedWave(null);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [active, setActive] = useState(0);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedSpiral || selectedWave) {
      try {
        let response;
        if (active == 1) {
          const formData = new FormData();
          formData.append("file", selectedSpiral);
          response = await axios.post(`https://sdp-api-d469.onrender.com/predict_vgg16`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
        } else if (active == 2) {
          const formData = new FormData();
          formData.append("file", selectedWave);
          response = await axios.post(`https://sdp-api-d469.onrender.com/predict_wave`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        setPredictionResult(response.data.prediction);
        handleShow();
      } catch (error) {
        notifyError("An error occurred while processing the image.");
      }
    } else {
      notifyError("Upload the image to continue!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Row className="mt-4 justify-content-center">
        <Form.Select
          aria-label="Image Type"
          onChange={(e) => setActive(e.target.value)}
        >
          <option>Select Image Type</option>
          <option value="1">Spiral</option>
          <option value="2">Wave</option>
        </Form.Select>
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} className="p-4 mb-4">
            {active == 1 && (
              <Form.Group controlId="formSpiralUpload" className="text-center">
                <Form.Label>Upload Spiral Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleSpiralUpload}
                  className="mb-3"
                />
              </Form.Group>
            )}
            {active == 2 && (
              <Form.Group controlId="formWaveUpload" className="text-center">
                <Form.Label>Upload Wave Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleWaveUpload}
                  className="mb-3"
                />
              </Form.Group>
            )}
            {(active == 1 || active == 2) && (
              <Row>
                <Col xs={12} className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            )}
          </Form>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        {selectedSpiral && active == 1 && (
          <Col xs={12} md={6}>
            <div
              className="border p-3 mb-4 position-relative"
              style={{ width: "200px", height: "200px" }}
            >
              <CloseButton
                className="position-absolute top-0 end-0 mt-2 me-2"
                onClick={handleClearSpiral}
              />
              <Image src={URL.createObjectURL(selectedSpiral)} fluid />
            </div>
          </Col>
        )}
        {selectedWave && active == 2 && (
          <Col xs={12} md={6}>
            <div
              className="border p-3 mb-4 position-relative"
              style={{ width: "200px", height: "200px" }}
            >
              <CloseButton
                className="position-absolute top-0 end-0 mt-2 me-2"
                onClick={handleClearWave}
              />
              <Image src={URL.createObjectURL(selectedWave)} fluid />
            </div>
          </Col>
        )}
      </Row>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prediction Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h6>
            Based on the provided information, the analysis suggests a{" "}
            {predictionResult ? "high" : "low"} likelihood of Parkinson's disease.
          </h6> */}
          
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
    </div>
  );
};

export default SpiralWaveForm;
