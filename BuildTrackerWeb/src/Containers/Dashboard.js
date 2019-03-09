import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Dashboard = (props) => {
    return (
        
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="1">
                    <ButtonToolbar>
                        <Button variant="outline-primary">Server 1 <span className="glyphicon glyphicon-arrow-right"></span></Button>
                    </ButtonToolbar>
                </Col>
                <Col xs lg="1">
                    <ButtonToolbar>
                    <Button variant="outline-primary">Server 2 <span className="glyphicon glyphicon-arrow-right"></span></Button>
                    </ButtonToolbar>
                </Col>
                <Col xs lg="1">
                    <ButtonToolbar>
                        <Button variant="outline-primary">Server 3 <span className="glyphicon glyphicon-arrow-right"></span></Button>
                    </ButtonToolbar>
                </Col>
                <Col xs lg="1">
                    <ButtonToolbar>
                        <Button variant="outline-primary">Server 4 <span className="glyphicon glyphicon-arrow-right"></span></Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </Container>
            
    );
};

export default Dashboard;