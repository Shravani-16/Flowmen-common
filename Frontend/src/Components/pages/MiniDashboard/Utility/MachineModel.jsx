import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Machine from "./Machine"; // Ensure to import your Machine component
import AreaChart from "./AllCharts/AreaChart";
import LChart from "./AllCharts/LineChart";

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 60%;
  }

  .modal-body {
    max-height: 70vh;
    overflow-y: auto;
  }
`;

const StyledCol = styled(Col)`
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    max-width: 100%;
  }

  height: 200px;
  overflow-y: auto;
`;

const MachineModel = ({ show, handleClose, selectedComponent }) => {
  return (
    <StyledModal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ margin: "0px 0px 0px 0px" }}>
        <Modal.Title>Machine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <StyledCol xs={12} md={12}>
              {selectedComponent === "machine" && <Machine />}
              {selectedComponent === "bar-chart" && <Machine />}
              {selectedComponent === "area-chart" && <AreaChart />}
              {selectedComponent === "line-chart" && <LChart />}
            </StyledCol>
          </Row>
        </Container>
      </Modal.Body>
    </StyledModal>
  );
};

export default MachineModel;
