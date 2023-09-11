import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Employe.css"
function Employe() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', dob: " " });


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://sweede.app/DeliveryBoy/Get-Employee/');
                setEmployees(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    const addEmployee = async () => {
        try {
        
            const response = await axios.post('https://sweede.app/DeliveryBoy/Add-Employee/', newEmployee);

            if (response.status === 200) {

                fetchEmployees();
            } else {
                console.error('Error adding employee:', response.data);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {

            await axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`);


            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };


    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://sweede.app/DeliveryBoy/Get-Employee/');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    return (
        <>
            <div className="add-container">
                <div className="add-body">
                    <h2>Add Employee</h2>
                    <input
                        className='inpute'
                        type="text"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />

                    <input
                        type="text"
                        className='inpute'

                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                    <input
                        type="date"
                        className='inpute'
                        placeholder="DOB"
                        value={newEmployee.dob}
                        onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}
                    />
                    <button className='add-btn' onClick={addEmployee}>Add</button>

                    <h1>Employee List</h1>
                    <ul>
                        {employees.map((employee) => (
                            <li key={employee.id}>
                                {employee.name} {employee.email} {employee.dob} 
                                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>



            </div>



        </>
    );
}

export default Employe;
