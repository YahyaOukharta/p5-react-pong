
import React, { ChangeEvent, useState } from 'react';
import { Navbar, Container, Nav, Modal, Form, NavDropdown, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import AuthService from "../../services/auth/auth.service"
import { LoginDto, RegisterDto } from "../../services/auth/auth.service"
import validator from "validator"

interface NavbarProps {
  user: Object | null | undefined;
  setUser: Function;
}
const NavBar: React.FC<NavbarProps> = (props: NavbarProps) => {

  // isLoading to freeze buttons 
  const [isLoading, setIsLoading] = useState(false)
  const toggleisLoading = (): void => { setIsLoading(!isLoading); console.log("toggled loading", isLoading) }

  const handleLogout = ():void=>{
    AuthService.logout();
    props.setUser(null);
  }

  //Login
  const [loginModalShow, setLoginModalShow] = useState(false);
  const toggleLoginModal = (): void => { setLoginModalShow(!loginModalShow) }
  const OnLoginModalClose = (): void => {
    toggleLoginModal()

  }
  //login data
  const [loginDataEmail, setLoginDataEmail] = useState("")
  const [loginDataPassword, setLoginDataPassword] = useState("")
  const [loginFormError, setLoginFormError] = useState("") // login error alert
  const handleLoginDataEmailUpdate = (e: ChangeEvent): void => {
    if (isLoading) return;
    let target: EventTarget | null = e.target;
    if (target && (target as HTMLInputElement).value)
      setLoginDataEmail((target as HTMLInputElement).value)
  }
  const handleLoginDataPasswordUpdate = (e: ChangeEvent): void => {
    if (isLoading) return;
    let target: EventTarget | null = e.target;
    if (target && (target as HTMLInputElement).value)
      setLoginDataPassword((target as HTMLInputElement).value)
  }
  //onsubmit login
  const onSubmitLoginForm = (): void => {
    if (isLoading) return;
    setIsLoading(true);
    setLoginFormError("")
    const loginData: LoginDto = { email: loginDataEmail, password: loginDataPassword }
    AuthService.login(loginData)
      .then((d) => {
        // console.log("all good", d)
        // console.log(AuthService.getCurrentUser());
        props.setUser(AuthService.getCurrentUser());
        toggleLoginModal();
        // UserService.changeUsername(Date.now().toString())
        //   .then((e) => {

        //   })

        setIsLoading(false);
      })
      .catch(e => {
        //console.log("not so good", e)
        if (e.code === "ERR_NETWORK") {
          setLoginFormError("Network error")
        }
        else {
          setLoginFormError("Wrong credentials");
        }
        setIsLoading(false);
      })
  }

  //register
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const toggleRegisterModal = (): void => { setRegisterModalShow(!registerModalShow) }
  const OnRegisterModalClose = (): void => {
    toggleRegisterModal()
  }

  //register data
  const [registerDataUsername, setRegisterDataUsername] = useState("")
  const [registerDataEmail, setRegisterDataEmail] = useState("")
  const [registerDataPassword, setRegisterDataPassword] = useState("")
  const [registerFormError, setRegisterFormError] = useState("") // login error alert
  const [registerFormSuccess, setRegisterFormSuccess] = useState("") // login error alert

  const handleRegisterDataUsernameUpdate = (e: ChangeEvent): void => {
    if (isLoading) return;
    let target: EventTarget | null = e.target;
    if (target && (target as HTMLInputElement).value)
      setRegisterDataUsername((target as HTMLInputElement).value)
  }

  const handleRegisterDataEmailUpdate = (e: ChangeEvent): void => {
    if (isLoading) return;
    let target: EventTarget | null = e.target;
    if (target && (target as HTMLInputElement).value)
      setRegisterDataEmail((target as HTMLInputElement).value)
  }

  const handleRegisterDataPasswordUpdate = (e: ChangeEvent): void => {
    if (isLoading) return;
    let target: EventTarget | null = e.target;
    if (target && (target as HTMLInputElement).value)
      setRegisterDataPassword((target as HTMLInputElement).value)
  }
  //onsubmit register
  const onSubmitRegisterForm = (): void => {
    setIsLoading(true);
    setRegisterFormError("");
    setRegisterFormSuccess("");

    const registerData: RegisterDto = { username: registerDataUsername, email: registerDataEmail, password: "123456789" }
    
    console.log(registerData)
    if(!validator.isEmail(registerData.email))
    {
      setRegisterFormError("Invalid Email");
      setIsLoading(false);
      return;
    }
    if(registerData.password ==="")
    {
      setRegisterFormError("Empty password");
      setIsLoading(false);
      return;
    }
    AuthService.register(registerData)
      .then((d) => {
        console.log("registered good", d)
        console.log(AuthService.getCurrentUser());
        setRegisterFormSuccess("Registered successfully");

      })
      .catch(e => {
        //console.log("not so good", e)
        if (e.code === "ERR_NETWORK") {
          setRegisterFormError("Network error")
        }
        else {
          setRegisterFormError("Email already used"); 
        }
        setIsLoading(false);
      })
    toggleisLoading();
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

            {props.user ?
              <NavDropdown title="Welcome User">
                <NavDropdown.Item >Play</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              :
              <NavDropdown title="Get started">
                <NavDropdown.Item onClick={toggleLoginModal}>Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={toggleRegisterModal}>Register</NavDropdown.Item>
              </NavDropdown>
            }
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
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={loginDataEmail} onChange={handleLoginDataEmailUpdate} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={loginDataPassword} onChange={handleLoginDataPasswordUpdate} />
            </Form.Group>


          </Form>
          {loginFormError &&
            <Alert variant="danger">
              {loginFormError}
            </Alert>
          }
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={registerDataUsername} onChange={handleRegisterDataUsernameUpdate} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={registerDataEmail} onChange={handleRegisterDataEmailUpdate} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={registerDataPassword} onChange={handleRegisterDataPasswordUpdate} />
            </Form.Group>


          </Form>
          {registerFormError &&
            <Alert variant="danger">
              {registerFormError}
            </Alert>
          }
          {registerFormSuccess &&
            <Alert variant="success">
              {registerFormSuccess}
            </Alert>
          }
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
