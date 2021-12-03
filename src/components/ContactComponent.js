import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Col, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            agree: false,
            contactType: "Tel,",
            msg: "",
            touched: {
                firstName: false,
                lastName: false,
                phone: false,
                email: false,
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)

        this.handleInputChange = this.handleInputChange.bind(this)

        this.handleBlur = this.handleBlur.bind(this)
    }

    handleInputChange(e) {
        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        console.log("Current state is: " + JSON.stringify(this.state));
        e.preventDefault();
    }

    handleBlur = (field) => (e) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        })
    }

    validate(firstName, lastName, phone, email) {
        const errors = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
        }

        if (this.state.touched.firstName && firstName.length < 3)
            errors.firstName = "First name should be longer than 3 characters";
        else if (this.state.touched.firstName && firstName.length > 10)
            errors.firstName = "First name should be shorter than 10 characters";

        if (this.state.touched.lastName && lastName.length < 3)
            errors.lastName = "Last name should be longer than 3 characters";
        else if (this.state.touched.lastName && lastName.length > 10)
            errors.LastName = "Last name should be shorter than 10 characters";

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = "Phone numbers should contain only numbers";

        if (this.state.touched.email && email.split("").filter(x => x === "@").length !== 1)
            errors.email = "Please check again your email";

        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.firstName,
            this.state.lastName,
            this.state.phone,
            this.state.email
        )
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
                        <Form onSubmit={this.handleSubmit}>
                            {/* First Name */}
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}> First Name: </Label>
                                <Col md={10}>
                                    <Input type="text" name="firstName" id="firstName"
                                            placeholder="First Name" value={this.state.firstName}
                                            valid = {errors.firstName === ""}
                                            invalid = {errors.firstName !== ""}
                                            onBlur = {this.handleBlur("firstName")}
                                            onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.firstName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            {/* Last Name */}
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}> Last Name: </Label>
                                <Col md={10}>
                                    <Input type="text" name="lastName" id="lastName"
                                        placeholder="Last Name" value={this.state.lastName}
                                        valid = {errors.lastName === ""}
                                        invalid = {errors.lastName !== ""}
                                        onBlur = {this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.lastName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            {/* Phone */}
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}> Phone numbers: </Label>
                                <Col md={10}>
                                    <Input type="tel" name="phone" id="phone"
                                        placeholder="Phone numbers" value={this.state.phone}
                                        valid = {errors.phone === ""}
                                        invalid = {errors.phone !== ""}
                                        onBlur = {this.handleBlur("phone")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.phone}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            {/* Email */}
                            <FormGroup row>
                                <Label htmlFor="email" md={2}> Email: </Label>
                                <Col md={10}>
                                    <Input type="email" name="email" id="email"
                                        placeholder="Email" value={this.state.email}
                                        valid = {errors.email === ""}
                                        invalid = {errors.email !== ""}
                                        onBlur = {this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            {/* Checkbox and select */}
                            <FormGroup row>
                                {/* Contact Customer */}
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} />
                                            <b>May we contact you?</b>
                                        </Label>
                                    </FormGroup>
                                </Col>

                                {/* select box */}
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Label select>
                                        <Input type="select" name="contactType"
                                                value={this.state.contactType}
                                                onChange={this.handleInputChange} >
                                            <option>by Phone</option>
                                            <option>by Email</option>
                                        </Input>
                                    </Label>
                                </Col>
                            </FormGroup>

                            {/* Feedback form */}
                            <FormGroup row>
                                <Label htmlFor="msg" md={2}> Your Feedback: </Label>
                                <Col md={10}>
                                    <Input type="textarea" name="msg" id="msg"
                                        placeholder="Your feedback..." rows="12" value={this.state.msg}onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>

                            {/* Submit buttom */}
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary" className="text-center">
                                        Send your feedback!
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;