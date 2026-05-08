import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = function (props) {
  return (
    <Navbar
      className="py-3"
      expand="md"
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      }}
    >
      <Container fluid>
        <Link className="navbar-brand" to="/">
          METEO
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/searchCity">
              Cerca
            </Link>
            <Link className="nav-link" to="ing">
              previsioni
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 bg-white text-dark"
              aria-label="Search"
              value={props.query}
              onChange={(e) => {
                props.setQuery(e.target.value);
              }}
            />
            <Button variant="outline-dark" className="text-black">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
