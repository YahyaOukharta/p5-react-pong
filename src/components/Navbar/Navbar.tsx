
import React, { useState } from 'react';
import { Navbar, Container, Nav, Modal, Form, NavDropdown, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import AuthService from "../../services/auth/auth.service"
import { LoginDto, RegisterDto } from "../../services/auth/auth.service"
interface NavbarProps {


}
const NavBar: React.FC<NavbarProps> = (props: NavbarProps) => {

  // isLoading to freeze buttons 
  const [isLoading, setIsLoading] = useState(false)
  const toggleisLoading = (): void => { setIsLoading(!isLoading) }
  //Login
  const [loginModalShow, setLoginModalShow] = useState(false);
  const toggleLoginModal = (): void => { setLoginModalShow(!loginModalShow) }
  const OnLoginModalClose = (): void => {
    toggleLoginModal()
  }

  const onSubmitLoginForm = (): void => {
    toggleisLoading();
    const loginData: LoginDto = { email: "test@mail.com", password: "123456789" }
    AuthService.login(loginData)
      .then((d) => {
        console.log("all good", d)
        console.log(AuthService.getCurrentUser());
        // UserService.changeUsername(Date.now().toString())
        //   .then((e) => {

        //   })
      })
      .catch(e => {
        console.log("not so good", e)
      })

    toggleisLoading();
  }

  const onSubmitRegisterForm = (): void => {
    toggleisLoading();
    const registerData: RegisterDto = { username: "", email: "test2@mail.com", password: "123456789" }
    AuthService.register(registerData)
      .then((d) => {
        console.log("registered good", d)
        console.log(AuthService.getCurrentUser());
        // UserService.changeUsername(Date.now().toString())
        //   .then((e) => {

        //   })
      })
      .catch(e => {
        console.log("not so good", e)
      })
    toggleisLoading();
  }
  //register
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onSubmitLoginForm} type="submit">
            Submit
          </Button>
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
          <Button variant="success" onClick={onSubmitRegisterForm} type="submit">
            Register
          </Button>
          <Button onClick={OnRegisterModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>    </div>
  );
}

export default NavBar;
