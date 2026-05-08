import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container, Card } from "react-bootstrap";

const previsioniAPI = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const myKey = "&appid=4146ec1e1131a29a34efa1ecc6687a6c";

const Details = function () {
  const [previsioniCitta, setPrevisioniCitta] = useState();
  const params = useParams();
  const [hover, setHover] = useState(false);

  const chiamaPrevisioni = function () {
    fetch(`${previsioniAPI}${params.name}${myKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(params);
        setPrevisioniCitta(data);
      })
      .catch((err) => console.log("errore", err));
  };

  useEffect(() => {
    chiamaPrevisioni();
  }, [params]);

  if (!previsioniCitta) return;

  const previsioniGiornaliere = previsioniCitta.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  console.log(previsioniCitta);
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">
        📍 {previsioniCitta.city.name}, {previsioniCitta.city.country}
      </h2>
      <Row className="gy-4 justify-content-center">
        {previsioniGiornaliere.map((giorno) => {
          const data = new Date(giorno.dt * 1000).toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });

          return (
            <Col xs={12} md={4} lg={2} key={giorno.dt}>
              <Card
                className="text-center h-100"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fffbeb",
                  border: hover ? "1px solid #fde68a" : "1px solid #fde68a",
                  boxShadow: hover ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Card.Body>
                  <p className="fw-bold text-capitalize">{data}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${giorno.weather[0].icon}@2x.png`}
                    alt={giorno.weather[0].description}
                  />
                  <h4>{Math.round(giorno.main.temp - 273.15)}°C</h4>
                  <p className="text-muted text-capitalize">
                    {giorno.weather[0].description}
                  </p>
                  <small>💧 {giorno.main.humidity}%</small>
                  <br />
                  <small>🌬️ {giorno.wind.speed} m/s</small>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Details;
