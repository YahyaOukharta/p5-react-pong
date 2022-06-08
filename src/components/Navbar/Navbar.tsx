
import React, { useState } from 'react';
import { Navbar, Container, Nav, Modal, FormControl, NavDropdown, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
interface NavbarProps {


}
const NavBar: React.FC<NavbarProps> = (props: NavbarProps) => {

  const [loginModalShow, setLoginModalShow] = useState(false);
  const toggleLoginModal = (): void => { setLoginModalShow(!loginModalShow) }
  const OnLoginModalClose = (): void => {
    toggleLoginModal()
  }

  const [registerModalShow, setRegisterModalShow] = useState(false);
  const toggleRegisterModal = (): void => { setRegisterModalShow(!registerModalShow) }
  const OnRegisterModalClose = (): void => {
    toggleRegisterModal()
  }
  return (
    <div className="">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
            <NavDropdown title="Get started">
              <NavDropdown.Item onClick={toggleLoginModal}>Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={toggleRegisterModal}>Register</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal
        show={loginModalShow}
        // size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={OnLoginModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={OnLoginModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal
        show={registerModalShow}
        // size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={OnRegisterModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Register Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={OnRegisterModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>    </div>
  );
}

export default NavBar;
