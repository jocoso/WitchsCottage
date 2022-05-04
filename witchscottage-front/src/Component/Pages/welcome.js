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


class WelcomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
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
                            onChange: this.onChangeHandler
                        },
                        // Password Input Info
                        {
                            id: "loginpassword",
                            name: "loginpassword",
                            type: "password",
                            label: "User Password",
                            value: '',
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
                            onChange: this.onChangeHandler
                        },
                        {
                            // Email Input Info
                            id: "signupEmail",
                            name: "signupEmail",
                            type: "email",
                            label: "Email Address",
                            value: '',
                            onChange: this.onChangeHandler

                        },
                        {
                            // Password Input Info
                            id: "signupPassword",
                            name: "signupPassword",
                            type: "password",
                            label: "User Password",
                            value: '',
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

    componentDidMount() {
        const { tabs } = this.state;
        tabs[0].inputs[0].value = this.state.data.loginEmail;

        this.setState({tabs});
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        
        const { name, value } = event.target;
        const { data } = this.state;

        if(name in data) {
            data[name] = value;
        } 

        console.log(data);
        this.setState({data});

    }

    onSubmitHandlerLogin = (event) => {
        event.preventDefault();
        console.log("Login button clicked");
    }

    
    onSubmitHandlerSignup = (event) => {
        event.preventDefault();
        console.log("Signup button clicked");
    }

    getNameData = (name) => {
        return this.state.data[name];
    }

    render() {

        return(
            <Container style={{backgroundImage: `url(${Background})`, backgroundSize: "cover", display: "flex", height: "calc(100vh)", color: "white"}} fluid >
               <Row style={{margin: "0px auto"}}>
                   <Col xs={{order: "first"}}></Col>
                   <Col xs={9} style={{textAlign: "center"}}>
                        <Row>
                            <h1>The Witch's Cottage</h1>
                            <h3>The gods have grant you power. What will you do with it?</h3>
                        </Row>
                        <Row>
                        <Tabs style={{width: "60%", margin: "0px auto"}}>
           
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