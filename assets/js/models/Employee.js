// Description: Employee Class. Here we call to proxy
// Author: Laura Grisales
// Date: 18/11/2024
class Employee {
  constructor(id, identification, name, surname, dateOfBirth, email, roleId) {
    this.id = id;
    this.identification = identification;
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.roleId = roleId;
  }

  // Description: Sets a new value to id
  // Author: Laura Grisales
  // Date: 18/11/2024
  setId(employeeId) {
    this.id = employeeId;
  }

  // Description: Returns the structure required by the API
  // Author: Laura Grisales
  // Date: 18/11/2024
  toAPIFormat() {
    return {
      identification: this.identification,
      name: this.name,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      roleId: this.roleId,
    };
  }

  // Description: GET the list of all employees
  // Author: Laura Grisales
  // Date: 18/11/2024
  async fetchEmployees(proxy) {
    this.employees = await proxy.getEmployees();
    return this.employees;
  }

  // Description: GET the employee that corresponds to the employeeId
  // Author: Laura Grisales
  // Date: 18/11/2024
  async fetchEmployee(proxy, employeeId) {
    this.employee = await proxy.getEmployee(employeeId);
    return this.employee;
  }

  // Description: POST a new employee
  // Author: Laura Grisales
  // Date: 18/11/2024
  async addEmployee(proxy) {
    const employeeData = this.toAPIFormat();
    return await proxy.addEmployee(employeeData);
  }

  // Description: PUT an employee that corresponds to the employeeId
  // Author: Laura Grisales
  // Date: 18/11/2024
  async updateEmployee(proxy, employeeId) {
    const employeeData = this.toAPIFormat();
    return await proxy.updateEmployee(employeeData, employeeId);
  }

  // Description: DELETE an employee that corresponds to the employeeId
  // Author: Laura Grisales
  // Date: 18/11/2024
  async deleteEmployee(proxy, employeeId) {
    return await proxy.deleteEmployee(employeeId);
  }

  // Description: DELETE employees that corresponds to the list of employeesId
  // Author: Laura Grisales
  // Date: 18/11/2024
  async deleteEmployees(proxy, employeesId) {
    return await proxy.deleteEmployees(employeesId);
  }
}
