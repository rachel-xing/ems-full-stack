import React, { useState } from 'react';
import { createEmployee } from "../services/EmployeeService.js";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");

    const navigator = useNavigate();

    function saveEmployee (e) {
        e.preventDefault();
        const employee = { firstName, lastName, email };
        createEmployee(employee).then(response => {
            console.log(response.data);
            navigator("/employees");
        });

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
                                    className="form-control"
                                    value={ firstName }
                                    onChange={ (e) => setFirstName(
                                        e.target.value) }
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="lastName"
                                       className="form-label">Last
                                    Name: < /label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Employee Last Name"
                                    className="form-control"
                                    value={ lastName }
                                    onChange={ (e) => setLastName(
                                        e.target.value) }
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="email"
                                       className="form-label">Email: < /label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Employee email"
                                    className="form-control"
                                    value={ email }
                                    onChange={ (e) => setEmail(
                                        e.target.value) }
                                />
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