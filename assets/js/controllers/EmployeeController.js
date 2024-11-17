class EmployeeController {
  constructor(view, proxy, model) {
    this.view = view;
    this.proxy = proxy;
    this.model = model;
    this.view.bindAddEmployee(this.addEmployee.bind(this));
  }

  async init() {
    const employees = await this.model.fetchEmployees(this.proxy);
    this.view.renderEmployees(employees);
  }

  async addEmployee(employeeData) {
    const employee = new Employee(
      null,
      employeeData.identification,
      employeeData.name,
      employeeData.surname,
      employeeData.dateOfBirth,
      employeeData.email,
      employeeData.roleId
    );
    await employee.addEmployee(this.proxy);
    this.init();
  }
}
