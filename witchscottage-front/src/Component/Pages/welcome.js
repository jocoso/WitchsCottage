import React from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

// Libraries

// Media
import Background from "../../image/witchBackground.jpg";

// Components


// GLOBAL
const API_URL = 'http://localhost:9999';

class WelcomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            invalidInput: false,
            submittingError: '',
            data: {
                loginEmail:'',
                loginPassword: '',
                username: '',
                signupEmail: '',
                signupPassword: ''
            },
            tabs: [
                // Login Tab
                {
                    id: "login",
                    name: "login",
                    title: "Log In",
                    inputs: [
                        // Email Input Info
                        {
                            id: "loginEmail",
                            name: "loginEmail",
                            type: "email",
                            label: "Email Address",
                            value: '',
                            err: '',
                            onChange: this.onChangeHandler
                        },
                        // Password Input Info
                        {
                            id: "loginPassword",
                            name: "loginPassword",
                            type: "password",
                            label: "User Password",
                            value: '',
                            err: '',
                            onChange: this.onChangeHandler
                        }
                    ],
                    // Submit Button Info
                    submitLabel: "Log In",
                    onSubmit: this.onSubmitHandlerLogin
                },
                // Sign Up Tab
                {
                    id: "signup",
                    name: "signup",
                    title: "Sign Up",

                    inputs: [
                        {
                            // Username Input Info
                            id: "username",
                            name: "username",
                            type: "text",
                            label: "Username",
                            value: '',
                            err: '',
                            onChange: this.onChangeHandler
                        },
                        {
                            // Email Input Info
                            id: "signupEmail",
                            name: "signupEmail",
                            type: "email",
                            label: "Email Address",
                            value: '',
                            err: '',
                            onChange: this.onChangeHandler

                        },
                        {
                            // Password Input Info
                            id: "signupPassword",
                            name: "signupPassword",
                            type: "password",
                            label: "User Password",
                            value: '',
                            err: '',
                            onChange: this.onChangeHandler
                        }

                    ],
                    
                    // Submit Button Info
                    submitLabel: "Sign Up",
                    onSubmit: this.onSubmitHandlerSignup
                    
                }
            ]
        }
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        
        const { name, value } = event.target;
        const { data } = this.state;

        if(name in data) {
            data[name] = value;
        } 

        this.setState({data});

    }

    // Removes error messages
    cleanErrors = () => {
        let {invalidInput, submittingError, tabs} = this.state;

        if(invalidInput) {
            submittingError = '';

            tabs.map(
                tab => tab.inputs.map(
                    input => input.err = ''
                )
            );
        }

        invalidInput = false;

        this.setState({invalidInput, tabs});
    }
    
    onSubmitHandlerSignup = (event) => {
        event.preventDefault();
        this.cleanErrors();
        
        const { signupEmail, signupPassword, username } = this.state.data;
        let { tabs, invalidInput, submittingError } = this.state;

        // Validation
        const emailValid = signupEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const usernameValid = username.length > 5 && username.length < 20;
        const passwordValid = signupPassword.length > 5 && signupPassword.length < 50;


        // Invalid Email
        if(!emailValid) {
            // Modify the signup email tab
            tabs[1].inputs[1].err = 'Invalid Signup email.';
            invalidInput = true;
        }

        // Invalid Username
        if(!usernameValid) {
            // Modify the signup username tab
            tabs[1].inputs[0].err = 'Invalid Username.';
            invalidInput = true;
        }

        if(!passwordValid) {
            // Modify the signup password tab
            tabs[1].inputs[2].err = 'Invalid Password';
            invalidInput = true;
        }

        // If any of the aforementined is invalid -> Complain under the input
        if(invalidInput) {
            console.log("is invalid")
            this.setState({ invalidInput, tabs });
            return;
        }

        // Call
        fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signupEmail,
                password: signupPassword,
                username
            })
        })
        .then((response) => {
            
            if(response.statusText === 'Conflict') {
                invalidInput = true;
                tabs[1].inputs[1].err = 'Specified email is already in use.'
                this.setState({invalidInput, submittingError});
                return;
            } else {

                let { data } = this.state;
                data.signupEmail = '';
                data.signupPassword = '';
                data.username = '';

                this.setState({ data });
            }

            response.json()
            .then((json) => {
                console.log(json);
                
            })
        }).catch(err => {
            invalidInput = true;
            submittingError = "Not a valid user";
            console.log(err);
            this.setState({invalidInput, submittingError});
        });

        
    }

    onSubmitHandlerLogin = (event) => {
        event.preventDefault();
        this.cleanErrors();

        const { loginEmail, loginPassword } = this.state.data;
        let { tabs, invalidInput, submittingError } = this.state;

        // Validation
        const emailValid = loginEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const passwordValid = loginPassword.length > 5 && loginPassword.length < 50;

        // Invalid Email
        if(!emailValid) {
            // Modify the signup email tab
            tabs[0].inputs[0].err = 'Invalid Signup email.';
            invalidInput = true;
        }

        if(!passwordValid) {
            // Modify the signup password tab
            tabs[0].inputs[1].err = 'Invalid Password';
            invalidInput = true;
        }

        // If any of the aforementined is invalid -> Complain under the input
        if(invalidInput) {
            console.log("is invalid")
            this.setState({ invalidInput, tabs });
            return;
        }

        // Call
        fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })
        .then((response) => {
            
            response.json()
            .then((json) => {
                console.log(json);  
                alert("Welcome " + json.username);
            })

        }).catch(err => {
            invalidInput = true;
            submittingError = "Not a valid user";
            console.log(err);
            this.setState({invalidInput, submittingError});
        });


    }

    getNameData = (name) => {
        return this.state.data[name];
    }

    render() {

        return(
            // Root
            <Container style={{backgroundImage: `url(${Background})`, backgroundSize: "cover", display: "flex", height: "calc(100vh)", color: "white"}} fluid >
               <Row style={{margin: "0px auto"}}>

                   {/* Empty Column*/}
                   <Col xs={{order: "first"}}></Col>

                   {/* Main Page */}
                   <Col xs={9} style={{textAlign: "center"}}>
                        <Row>
                            <h1>The Witch's Cottage</h1>
                            <h3>The gods have grant you power. What will you do with it?</h3>
                        </Row>
                        {this.state.submittingError !== '' ? <span className="p-2 mb-2 bg-danger text-light" style={{display: "block", borderRadius: "5px", opacity: '.5'}}>{this.state.submittingError}</span> :''}
                        {/* Form */}
                        <Row>
                            <Tabs style={{width: "60%", margin: "0px auto"}}>

                                {/* Adds all the inputs inside this.state */}
                                {this.state.tabs.map(
                                    (tab, idx) => {
                                        return <Tab style={{width: "60%", margin: "0px auto"}} key={idx} eventKey={tab.title} title={tab.title} name={tab.name} >
                                                <h1>{tab.title}</h1>
                                                <hr/>
                                                <Form>
                                                    {tab.inputs.map(
                                                        (input, idx) => {
                                                            return(
                                                                <Form.Group key={idx} controlId={input.id} style={{padding: "10px"}} >
                                                                    <Form.Label>{input.label}</Form.Label>
                                                                    <Form.Control type={input.type} name={input.name} onChange={input.onChange} value={this.getNameData(input.name)} />
                                                                    {input.err !== '' ? <span className="p-2 mb-2 bg-danger text-light" style={{display: "block", borderRadius: "5px", opacity: '.5'}}>{input.err}</span> :''}
                                                                </Form.Group>
                                                            )
                                                        }
                                                    )}

                                                    <Button variant="primary" type="submit" onClick={tab.onSubmit} >
                                                        {tab.submitLabel}
                                                    </Button>
                                                </Form>
                                        </Tab>
                                    }
                                )}
                                
                            </Tabs>
                        </Row>
                   </Col>
                   <Col xs={{order: "last"}}></Col>
               </Row>
            </Container>
        );

    }
}


export default WelcomePage;