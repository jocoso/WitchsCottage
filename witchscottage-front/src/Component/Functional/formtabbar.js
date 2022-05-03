import React from 'react';

// BootStraps
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

// Libraries
import PropTypes from 'prop-types';

function FormTabBar({ tabs, style }) {

    return(

       <Tabs style={style}>
           
           {tabs.map(
               (tab, idx) => {
                   return <Tab style={style} key={idx} eventKey={tab.title} title={tab.title} name={tab.name} >
                        <h1>{tab.title}</h1>
                        <hr/>
                        <Form>

                            {tab.inputs.map(
                                (input, idx) => {
                                    return(
                                        <Form.Group key={idx} className="mb-3" controlId={input.id} >
                                            <Form.Label>{input.label}</Form.Label>
                                            <Form.Control type={input.type} />
                                        </Form.Group>
                                    )
                                }
                            )}

                            <Button variant="primary" type="submit">
                                {tab.submitLabel}
                            </Button>
                        </Form>
                   </Tab>
               }
           )}

       </Tabs>
       
    );
    
}

// PropType
FormTabBar.propTypes = {
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                title: PropTypes.string.isRequired,
                inputs: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string,
                        name: PropTypes.string,
                        type: PropTypes.string.isRequired,
                        label: PropTypes.string.isRequired,
                        onChange: PropTypes.string
                    })
                ).isRequired,
                submitLabel: PropTypes.string.isRequired,
                onSubmit: PropTypes.func

            })
        ).isRequired,

        style: PropTypes.object,
        className: PropTypes.string
};

export default FormTabBar;