import { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import nazioni from "../../data/Nazioni";

const SelectPlace = function (props) {
  console.log(props.nazioneSelezionata);
  console.log(props.citta);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form.Select
            aria-label="Default select example"
            value={props.nazioneSelezionata}
            onChange={(e) => {
              props.setNazioneSelezionata(e.target.value);
              props.setCitta(nazioni[e.target.value].capoluoghi[0]);
            }}
            onClick={() => {
              props.setQuery("");
            }}
          >
            {Object.values(nazioni).map((nazione) => {
              return (
                <option value={nazione.code} key={nazione.code}>
                  {nazione.bandiera} {nazione.nome}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            aria-label="Default select example"
            value={props.citta}
            onChange={(e) => props.setCitta(e.target.value)}
            onClick={() => {
              props.setQuery("");
            }}
          >
            {nazioni[props.nazioneSelezionata].capoluoghi.map((citta) => {
              return (
                <option key={citta} value={citta}>
                  {citta}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectPlace;
