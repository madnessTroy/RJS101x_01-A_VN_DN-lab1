import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Input, Label } from 'reactstrap';
import { Control, Form, Errors, actions } from "react-redux-form"
import { Link } from 'react-router-dom';

const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val))
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        //e.preventDefault();
        this.props.resetFeedbackForm()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>

                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            {/* First Name */}
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}> First Name: </Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" name="firstName" id="firstName"
                                            placeholder="First Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                     />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        messages={{
                                            required: "Required |",
                                            minLength: " Must be greater than 2 characters",
                                            maxLength: " Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/* Last Name */}
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}> Last Name: </Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" name="lastName" id="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        messages={{
                                            required: "Required |",
                                            minLength: " Must be greater than 2 characters",
                                            maxLength: " Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/* Phone */}
                            <Row className="form-group">
                                <Label htmlFor="phone" md={2}> Phone numbers: </Label>
                                <Col md={10}>
                                    <Control.text model=".phone" name="phone" id="phone"
                                        placeholder="Phone numbers"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".phone"
                                        show="touched"
                                        messages={{
                                            required: "Required |",
                                            minLength: " Must be greater than 2 numbers",
                                            maxLength: " Must be 15 numbers or less",
                                            isNumber: " Must be a number"
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/* Email */}
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}> Email: </Label>
                                <Col md={10}>
                                    <Control.text model=".email" name="email" id="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: "Required |",
                                            validEmail: " Invalid email"
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/* Checkbox and select */}
                            <Row className="form-group">
                                {/* Contact Customer */}
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".a" name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <b>May we contact you?</b>
                                        </Label>
                                    </div>
                                </Col>

                                {/* select box */}
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" type="select"
                                        className="form-control">
                                            <option>by Phone</option>
                                            <option>by Email</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            {/* Feedback form */}
                            <Row className="form-group">
                                <Label htmlFor="msg" md={2}> Your Feedback: </Label>
                                <Col md={10}>
                                    <Control.textarea model=".msg" name="msg" id="msg"
                                        placeholder="Your feedback..." rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>

                            {/* Submit buttom */}
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary" className="text-center">
                                        Send your feedback!
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;