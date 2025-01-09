import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from "../services/EmployeeService.js";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
    const [ employees, setEmployees ] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees () {
        listEmployees().then(response =>
            setEmployees(response.data),
        ).catch(error => console.error(error));
    }

    function createNewEmployee () {
        navigator("/create-employee");
    }

    function updateEmployee (id) {
        navigator(`/update-employee/${ id }`);
    }

    function removeEmployee (id) {

        deleteEmployee(id).then(response => {
            getAllEmployees();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2"
                    onClick={ createNewEmployee }>Create Employee
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={ employee.id }>
                                <td>{ employee.id }</td>
                                <td>{ employee.firstName }</td>
                                <td>{ employee.lastName }</td>
                                <td>{ employee.email }</td>
                                <th>
                                    <button className="btn btn-success"
                                            onClick={ () => updateEmployee(
                                                employee.id) }>Update
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={ () => removeEmployee(
                                                employee.id) }
                                            style={{marginLeft:'10px'}}

                                    >Delete
                                    </button>
                                </th>


                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    );
};

export default ListEmployeeComponent;