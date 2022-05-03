import React from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

// Libraries


// Components
import FormTabBar from '../Functional/formtabbar';

class WelcomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: [
                // Login Tab
                {
                    id: "login",
                    name: "login",
                    title: "Log In",
                    inputs: [
                        // Email Input Info
                        {
                            id: "login_email",
                            name: "login_email",
                            type: "email",
                            label: "Email Address"
                        },
                        // Password Input Info
                        {
                            id: "login_password",
                            name: "login_password",
                            type: "password",
                            label: "User Password"
                        }
                    ],
                    // Submit Button Info
                    submitLabel: "Log In"
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
                            label: "Username"
                        },
                        {
                            // Email Input Info
                            id: "signup_email",
                            name: "signup_email",
                            type: "email",
                            label: "Email Address"

                        },
                        {
                            // Password Input Info
                            id: "signup_password",
                            name: "signup_password",
                            type: "password",
                            label: "User Password"
                        }

                    ],
                    
                    // Submit Button Info
                    submitLabel: "Sign Up"
                }
            ]
        }
    }

    render() {


        return(
            <Container>
                <FormTabBar 
                    tabs={this.state.data} 
                    style={
                        {
                            width: "30em"
                        }
                    }
                />
            </Container>
        );
    }
}


export default WelcomePage;