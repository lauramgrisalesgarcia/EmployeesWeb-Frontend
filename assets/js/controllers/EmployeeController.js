class EmployeeController {
  constructor(view, proxy, model) {
    this.view = view;
    this.proxy = proxy;
    this.model = model;
    this.view.bindAddEmployee(this.saveEmployee.bind(this));
    this.view.bindEditEmployee(this.viewEmployee.bind(this));
    this.view.bindDeleteEmployee(this.deleteEmployee.bind(this));
    this.view.bindDeleteEmployees(this.deleteEmployees.bind(this));
  }

  async init() {
    const employees = await this.model.fetchEmployees(this.proxy);
    this.view.renderEmployees(employees);
    this.view.setTooltips();
    this.view.toggleAllCheckboxes();
  }

  async saveEmployee(employeeData) {
    if (this.view.action === false) {
      try {
        const employee = new Employee(
          null,
          employeeData.identification,
          employeeData.name,
          employeeData.surname,
          employeeData.dateOfBirth,
          employeeData.email,
          employeeData.roleId
        );
        const response = await employee.addEmployee(this.proxy);
        if (response && this.isValidJson(response)) {
          alert("Empleado creado");
          this.view.closeModal();
          this.init();
        }
      } catch (error) {
        alert("Ha ocurrido un error. Intente nuevamente");
      }
    } else {
      try {
        const employee = new Employee(
          employeeData.id,
          employeeData.identification,
          employeeData.name,
          employeeData.surname,
          employeeData.dateOfBirth,
          employeeData.email,
          employeeData.roleId
        );
        const employeeId = parseInt(employeeData.id, 10);
        const response = await employee.updateEmployee(this.proxy, employeeId);
        if (response) {
          alert("Empleado actualizado");
          this.view.closeModal();
          this.init();
        }
      } catch (error) {
        alert("Ha ocurrido un error. Intente nuevamente");
      }
    }
  }

  async viewEmployee(employeeId) {
    try {
      employeeId = parseInt(employeeId, 10);
      const response = await this.model.fetchEmployee(this.proxy, employeeId);
      if (response && this.isValidJson(response)) {
        setDataForm(response);
        this.view.disableInputs(true);
      }
    } catch (error) {
      alert("Ha ocurrido un error. Intente nuevamente");
    }
  }

  async deleteEmployee(employeeId) {
    try {
      employeeId = parseInt(employeeId, 10);
      const response = await this.model.deleteEmployee(this.proxy, employeeId);
      if (response) {
        alert("Empleado eliminado");
        this.init();
      }
    } catch (error) {
      alert("Ha ocurrido un error. Intente nuevamente");
    }
  }

  async deleteEmployees(employeesId) {
    try {
      const response = await this.model.deleteEmployees(
        this.proxy,
        employeesId
      );
      if (response) {
        alert("Empleado x eliminado");
        this.init();
      }
    } catch (error) {
      alert("Ha ocurrido un error. Intente nuevamente");
    }
  }

  isValidJson(response) {
    try {
      JSON.parse(JSON.stringify(response));
      return true;
    } catch (e) {
      return false;
    }
  }
}
