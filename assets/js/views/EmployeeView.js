// Description: Employee View. Here we create all the view employee elements
// Author: Laura Grisales
// Date: 18/11/2024
class EmployeeView {
  constructor() {
    this.employeeList = document.getElementById("employee-list");
    let todayDate = new Date();
    this.dateOfBirth = document.getElementById("dateOfBirth");
    this.dateOfBirth.setAttribute("min", this.setDateYears(todayDate, 65, 0));
    this.dateOfBirth.setAttribute("max", this.setDateYears(todayDate, 18, 0));
    this.employeeModalName = "employeeModal";
    this.employeeModal = bootstrap.Modal.getOrCreateInstance(
      `#${this.employeeModalName}`
    );
    this.setModalTitle();
    this.action = false;
    this.btnSubmit = document.getElementById("btnSubmit");
    this.form = document.getElementById("employeeForm");
    this.arrRole = new Array("Desarrollador", "Team Leader", "CTO");
    this.btnDeleteAll = document.querySelector("#btnDeleteAll");
    this.checkedRows = new Array();
    this.checkboxes = new Array();
  }

  // Description: Adds the listener to the add employee button and returns all the data from the form
  // Author: Laura Grisales
  // Date: 18/11/2024
  bindAddEmployee(callback) {
    this.btnSubmit.addEventListener("click", () => {
      const formData = getFormData(this.form);
      if (formData !== null) {
        callback(formData);
      }
    });
  }
  // Description: Adds the listener to the table when edit employee button is clicked and returns the employeeId selected
  // Author: Laura Grisales
  // Date: 18/11/2024
  bindEditEmployee(callback) {
    this.employeeList.addEventListener("click", (event) => {
      const button = event.target.closest("button.btn-edit");
      if (button) {
        const employeeId = button.getAttribute("data-id");
        callback(employeeId);
      }
    });
  }

  // Description: Adds the listener to the table when delete employee button is clicked and returns the employeeId selected
  // Author: Laura Grisales
  // Date: 18/11/2024
  async bindDeleteEmployee(callback) {
    this.employeeList.addEventListener("click", async (event) => {
      const button = event.target.closest("button.btn-delete");
      if (button) {
        const response = await showConfirmAlert(
          "¿Está seguro que desea eliminar?",
          "Esta acción no se puede deshacer",
          "warning"
        );
        if (response) {
          const employeeId = button.getAttribute("data-id");
          callback(employeeId);
        }
      }
    });
  }

  // Description: Adds the listener to the delete all employee button and returns the employeesId list from selected rows
  // Author: Laura Grisales
  // Date: 18/11/2024
  async bindDeleteEmployees(callback) {
    this.btnDeleteAll.addEventListener("click", async (event) => {
      const button = event.target.closest("button.btn-delete-all");
      if (button) {
        const response = await showConfirmAlert(
          "¿Está seguro que desea eliminar?",
          "Esta acción no se puede deshacer",
          "warning"
        );
        if (response) {
          this.initChecks();
          callback(this.checkedRows);
        }
      }
    });
  }

  // Description: Adds the listener to the table when checkboxAll or a single check is clicked. If checkboxAll is clicked, checkAllRows checks all rows and creates a list of employeesId; else, clicking on a row just creates a list of employeesId.
  // Author: Laura Grisales
  // Date: 18/11/2024
  toggleAllCheckboxes() {
    this.employeeList.addEventListener("click", (event) => {
      if (event.target.id == "checkboxAll") {
        this.checkAllRows(event.target.checked);
      } else if (event.target.type == "checkbox") {
        this.initChecks();
      }
    });
  }

  // Description: Creates the employees table
  // Author: Laura Grisales
  // Date: 18/11/2024
  renderEmployees(employees) {
    this.employeeList.innerHTML = "";
    var tbody = "";
    if (employees !== undefined && employees.length > 0) {
      employees.forEach((employee, index) => {
        tbody += `
      <tr>
        <th scope="row">
          <div>
            <input class="form-check-input" type="checkbox" data-id="${
              employee.id
            }">
          </div>
        </th>
        <th scope="row">${index + 1} </th>                
        <td>${employee.identification} </td>                
        <td>${employee.name}</td>
        <td>${employee.surname}</td>
        <td>${employee.dateOfBirth}</td>
        <td>${employee.email}</td>
        <td>${this.arrRole[employee.roleId - 1]}
        </td>
        <td>
          <div class="btn-group btn-group-sm" role="group" aria-label="Acciones">
            <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar empleado"
            data-bs-custom-class="custom-tooltip">
              <button data-id="${
                employee.id
              }" type="button" class="btn btn-outline-primary btn-edit" data-bs-toggle="modal" data-bs-target="#employeeModal"
              data-bs-title="Editar" data-action="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e0b66">
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
            </div>
            <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar empleado"
            data-bs-custom-class="custom-tooltip">
              <button data-id="${
                employee.id
              }" type="button" class="btn btn-outline-danger btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#dc3545">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          </div>
        </td>
      </tr>`;
      });
    }
    var table = `<table id="table-employees" class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <div>
                    <input class="form-check-input" type="checkbox" id="checkboxAll">
                  </div>
                  </th>
                <th scope="col">#</th>                
                <th scope="col">Identificación</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>    
            ${tbody}        
            </tbody>
          </table>`;
    this.employeeList.innerHTML = table;
    createDataTable("table-employees");
    this.initChecks();
  }

  // Description: Sets the years min and max value for the input date
  // Author: Laura Grisales
  // Date: 18/11/2024
  setDateYears(todayDate, time, type) {
    let year = 0;
    switch (type) {
      case 0:
        year = todayDate.getFullYear() - time;
        break;
      case 1:
        year = todayDate.getFullYear() + time;
    }
    return `${year}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  }

  // Description: Sets the title of the modal depending on which button opens it and sets if you are creating or editing an employee
  // Author: Laura Grisales
  // Date: 18/11/2024
  setModalTitle() {
    const selectedModal = document.getElementById(this.employeeModalName);
    if (selectedModal) {
      selectedModal.addEventListener("show.bs.modal", (event) => {
        this.clearForm();
        const button = event.relatedTarget;
        const recipient = button.getAttribute("data-bs-title");
        const modalTitle = selectedModal.querySelector(".modal-title");
        modalTitle.textContent = `${recipient} empleado`;
        this.action = JSON.parse(button.getAttribute("data-action"));
        this.disableInputs(this.action);
      });
    }
  }

  // Description: Cleans the form
  // Author: Laura Grisales
  // Date: 18/11/2024
  clearForm() {
    this.form.reset();
  }

  // Description: Cloase the modal
  // Author: Laura Grisales
  // Date: 18/11/2024
  closeModal() {
    this.employeeModal.hide();
  }

  // Description: Finds all the tooltips and initializes them so that they are visible
  // Author: Laura Grisales
  // Date: 18/11/2024
  setTooltips() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  // Description: Disables/Enables the no editables inputs depending if youare creating or editing
  // Author: Laura Grisales
  // Date: 18/11/2024
  disableInputs(enabled) {
    const disabledInputs = this.form.querySelectorAll(".not-editable");
    disabledInputs.forEach((input) => {
      input.toggleAttribute("readonly", enabled);
    });
  }

  // Description: Find all the check in the table and add the ids of the rows that are selected to create the list of employeesId and enable or disable the deleteAll button
  // Author: Laura Grisales
  // Date: 18/11/2024
  initChecks() {
    this.checkedRows = [];
    this.checkboxes = this.employeeList.querySelectorAll(
      'input[type="checkbox"]:not(#checkboxAll)'
    );
    this.checkboxes.forEach((checkbox) => {
      let checkdId = parseInt(checkbox.getAttribute("data-id"));
      if (checkbox.checked) {
        if (this.checkedRows.indexOf(checkdId) < 0) {
          this.checkedRows.push(checkdId);
        }
      } else {
        if (this.checkedRows.indexOf(checkdId) >= 0) {
          this.checkedRows.splice(this.checkedRows.indexOf(checkdId), 1);
        }
      }
    });
    this.checkedRows.length > 0
      ? this.btnDeleteAll.removeAttribute("disabled")
      : this.btnDeleteAll.setAttribute("disabled", true);
  }

  // Description: Marks all checks as selected when the checkAll of the table header is pressed
  // Author: Laura Grisales
  // Date: 18/11/2024
  checkAllRows(selected) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.checked = selected;
    });
    this.initChecks();
  }
}
