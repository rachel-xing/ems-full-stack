import React, { useState } from 'react';
import { createEmployee } from "../services/EmployeeService.js";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");

    const [ errors, setErrors ] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    function validateForm () {
        let isValid = true;

        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First Name is required";
            isValid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last Name is required";
            isValid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            isValid = false;
        }

        setErrors(errorsCopy);

        return isValid;
    }

    const navigator = useNavigate();

    function saveEmployee (e) {
        e.preventDefault();
        const employee = { firstName, lastName, email };
        if (validateForm()) {
            createEmployee(employee).then(response => {
                console.log(response.data);
                navigator("/employees");
            });
        }

    }

    return (
        <div className="container">
            <br/><br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">Create Employee</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="firstName"
                                       className="form-label">First
                                    Name: < /label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter Employee First Name"
                                    className= {`form-control ${errors.firstName ? 'is-invalid' : ''}` }
                                    value={ firstName }
                                    onChange={ (e) => setFirstName(
                                        e.target.value) }
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}


                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="lastName"
                                       className="form-label">Last
                                    Name: < /label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Employee Last Name"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}` }
                                    value={ lastName }
                                    onChange={ (e) => setLastName(
                                        e.target.value) }
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="email"
                                       className="form-label">Email: < /label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Employee email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}` }
                                    value={ email }
                                    onChange={ (e) => setEmail(
                                        e.target.value) }
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <button className="btn btn-success"
                                    onClick={ saveEmployee }>Submit
                            </button>

                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default EmployeeComponent;