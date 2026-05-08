import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "/public/weather_app_icon_blue.svg";

const MyNavbar = function (props) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchDetailPage = () => {
    if (!props.query) return;
    navigate(`/Details/${props.query}`);
    props.setQuery("");
  };

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
          <img src={Logo} style={{ width: "70px" }} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            {location.pathname.includes("/Details/") && (
              <Link className="nav-link disabled active fw-bold" to="ing">
                Previsioni
              </Link>
            )}
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              searchDetailPage();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search location"
              className="me-2 bg-white text-dark"
              aria-label="Search"
              value={props.query}
              onChange={(e) => {
                props.setQuery(e.target.value);
              }}
            />
            <Button
              variant="outline-dark"
              className="text-black"
              onClick={searchDetailPage}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
