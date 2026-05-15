import { useEffect, useState } from "react";
import { Card, Row, Col ,Container,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const APIlink = "https://api.openweathermap.org/data/2.5/weather?q=";
const myKey = "&appid=4146ec1e1131a29a34efa1ecc6687a6c";

const WheatherLocation = function (props) {
  const [meteo, setMeteo] = useState(null);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const searchByQuery = function () {
    if (props.query.length < 3) return;

    fetch(`${APIlink}${props.query}${myKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          return (
            <Container className="mt-5 text-center">
              <h4>😕 City not found</h4>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                className="mt-3"
              >
                Torna indietro
              </Button>
            </Container>
          );
        }
        setMeteo(data);
      })
      .catch(console.error);
  };

  const searchBySelect = function () {
    fetch(`${APIlink}${props.citta},${props.nazioneSelezionata}${myKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("meteo", meteo);
        setMeteo(data);
      })
      .catch((error) => {
        console.log("errore nel caricamento", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.query) {
        searchByQuery();
        return;
      }
      searchBySelect();
    }, 1500);

    return () => clearTimeout(timer);
  }, [props.nazioneSelezionata, props.citta, props.query]);

  if (!meteo) return <p>Caricamento...</p>;

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={11} md={9} lg={8} xl={6}>
        <Card
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="text-center h-100"
          style={{
            cursor: "pointer",
            backgroundColor: "#fffbeb",
            border: hover ? "1px solid #fde68a" : "1px solid #fde68a",
            boxShadow: hover ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
            transition: "all 0.2s ease",
          }}
          onClick={() => navigate(`/Details/${meteo.name}`)}
        >
          <Card.Body>
            <h4 className="fw-bold">{meteo.name}</h4>
            <img
              src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
              alt={meteo.weather[0].description}
            />
            <h3>{Math.round(meteo.main.temp - 273.15)}°C</h3>
            <p className="text-muted text-capitalize">
              {meteo.weather[0].description}
            </p>
            <small>
              Min: {Math.round(meteo.main.temp_min - 273.15)}°C / Max:{" "}
              {Math.round(meteo.main.temp_max - 273.15)}°C
            </small>
            <br />
            <small>💧 {meteo.main.humidity}%</small>
            <br />
            <small>🌬️ {meteo.wind.speed} m/s</small>
            <br />
            <small>👁️ {meteo.visibility / 1000} km</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default WheatherLocation;
