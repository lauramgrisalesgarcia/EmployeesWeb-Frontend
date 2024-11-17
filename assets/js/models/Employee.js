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

  // Agregar un nuevo empleado
  async addEmployee(proxy) {
    const employeeData = this.toAPIFormat();
    return await proxy.addEmployee(employeeData);
  }

  // Actualizar un empleado
  async updateEmployee(employee) {
    const updatedEmployee = await proxy.updateEmployee(employee);
    const index = this.employees.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    return updatedEmployee;
  }

  // Eliminar un empleado
  async deleteEmployee(id) {
    await proxy.deleteEmployee(id);
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }
}
