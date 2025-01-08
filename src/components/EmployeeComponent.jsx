import React, { useEffect, useState } from 'react';
import {
    createEmployee,
    getEmployee,
    updateEmployee,
} from "../services/EmployeeService.js";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");

    const [ errors, setErrors ] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const { id } = useParams();

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

    function pageTitle () {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Create Employee</h2>;
        }

    }

    useEffect(() => {
        return () => {
            if (id) {
                getEmployee(id).then(response => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                }).catch(error => console.log(error));
            }
        };
    }, []);

    function createOrUpdateEmployee (e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };
            if (id) {
                updateEmployee(id, employee)
                    .then(response => {
                        console.log(response.data);
                        navigator("/employees");
                    }).catch(error => {
                    console.log(error);
                });
            } else {
                createEmployee(employee).then(response => {
                    console.log(response.data);
                    navigator("/employees");
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }


    return (
        <div className="container">
            <br/><br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {
                        pageTitle()
                    }
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
                                    className={ `form-control ${ errors.firstName ? 'is-invalid' : '' }` }
                                    value={ firstName }
                                    onChange={ (e) => setFirstName(
                                        e.target.value) }
                                />
                                { errors.firstName && <div
                                    className="invalid-feedback">{ errors.firstName }</div> }
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="lastName"
                                       className="form-label">Last
                                    Name: < /label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Employee Last Name"
                                    className={ `form-control ${ errors.lastName ? 'is-invalid' : '' }` }
                                    value={ lastName }
                                    onChange={ (e) => setLastName(
                                        e.target.value) }
                                />
                                { errors.lastName && <div
                                    className="invalid-feedback">{ errors.lastName }</div> }
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="email"
                                       className="form-label">Email: < /label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Employee email"
                                    className={ `form-control ${ errors.email ? 'is-invalid' : '' }` }
                                    value={ email }
                                    onChange={ (e) => setEmail(
                                        e.target.value) }
                                />
                                { errors.email && <div
                                    className="invalid-feedback">{ errors.email }</div> }
                            </div>
                            <button className="btn btn-success"
                                    onClick={ createOrUpdateEmployee }>Submit
                            </button>


                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default EmployeeComponent;