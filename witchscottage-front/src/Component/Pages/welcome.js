import React from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

// Libraries
import PropType from 'prop-types';

class WelcomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <h1>Welcome</h1>
        );
    }
}

// PropType
WelcomePage.propTypes = {

};

export default WelcomePage;