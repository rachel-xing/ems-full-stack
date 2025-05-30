package net.rachel.service.imlp;

import java.util.List;
import java.util.stream.Collectors;
import net.rachel.dto.EmployeeDto;
import net.rachel.entity.Employee;
import net.rachel.exception.ResourceNotFoundException;
import net.rachel.mapper.TrainerMapper;
import net.rachel.repository.EmployeeRepository;
import net.rachel.service.EmployeeService;
import org.springframework.stereotype.Service;

@Service
//@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = TrainerMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return TrainerMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(()-> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId));
        return TrainerMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map( employee -> TrainerMapper.mapToEmployeeDto(employee))
            .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployeeById(Long employeeId, EmployeeDto updatedEmployeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(()-> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId));

        employee.setFirstName(updatedEmployeeDto.getFirstName());
        employee.setLastName(updatedEmployeeDto.getLastName());
        employee.setEmail(updatedEmployeeDto.getEmail());

        Employee updatedEmployee =  employeeRepository.save(employee);
        return TrainerMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId));
        employeeRepository.deleteById(employeeId);
    }


}
