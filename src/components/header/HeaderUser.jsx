import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/reactlogo.png";
import "./header.scss";
function Header({ menuIcon, children }) {
  const location = useLocation();
  return (
    <div id="header">
      <Navbar expand="lg" className="py-0 h-60px">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} width={70} height="auto" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="mobile-nav"
            className="shadow-none bg-white"
          />
          <Navbar.Collapse id="mobile-nav">
            <Nav className="ms-auto p-2 gap-2">
              <Nav.Link
                as={Link}
                to="/"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Trang chủ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/link"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/link" ? "active" : ""
                }`}
              >
                Tra cứu giao dịch
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/news"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/news" ? "active" : ""
                }`}
              >
                Tin tức
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/guire"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/guire" ? "active" : ""
                }`}
              >
                Chỉ dẫn
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Liên hệ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className={`px-0 mx-2 text-uppercase text-white text-12 ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                <i className="fas fa-sign-in-alt me-1"></i>Đăng nhập
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className={`px-0 mx-2 text-uppercase text-white text-12 ${
                  location.pathname === "/register" ? "active" : ""
                }`}
              >
                <i className="fas fa-user-plus me-1"></i>Đăng ký
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
