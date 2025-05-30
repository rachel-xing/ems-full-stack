package net.rachel.service;

import java.util.List;
import net.rachel.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployeeById(Long employeeId,EmployeeDto updatedEmployeeDto);
    void deleteEmployeeById(Long employeeId);

}
