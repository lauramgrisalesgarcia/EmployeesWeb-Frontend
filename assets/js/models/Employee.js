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

  setId(employeeId) {
    this.id = employeeId;
  }

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

  async fetchEmployees(proxy) {
    this.employees = await proxy.getEmployees();
    return this.employees;
  }

  async fetchEmployee(proxy, employeeId) {
    this.employee = await proxy.getEmployee(employeeId);
    return this.employee;
  }

  async addEmployee(proxy) {
    const employeeData = this.toAPIFormat();
    return await proxy.addEmployee(employeeData);
  }

  async updateEmployee(proxy, employeeId) {
    const employeeData = this.toAPIFormat();
    return await proxy.updateEmployee(employeeData, employeeId);
  }

  async deleteEmployee(proxy, employeeId) {
    return await proxy.deleteEmployee(employeeId);
  }

  async deleteEmployees(proxy, employeesId) {
    return await proxy.deleteEmployees(employeesId);
  }
}
