class EmployeeController {
  constructor(view, proxy) {
    this.view = view;
    this.proxy = proxy;

    this.view.onAddEmployee = this.addEmployee.bind(this);
  }

  async init() {
    // const employees = await this.proxy.getEmployees();
    this.view.renderEmployees(employees);
  }

  async addEmployee(employeeData) {
    const employee = new Employee(
      Date.now(),
      employeeData.name,
      employeeData.position
    );
    await this.proxy.addEmployee(employee);
    this.init(); // Recarga la lista de empleados
  }
}
