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
    this.btnSubmit = document.querySelector("#btnSubmit");
    this.form = document.querySelector("#employeeForm");
    this.arrRole = new Array("Desarrollador", "Team Leader", "CTO");
    this.btnDeleteAll = document.querySelector("#btnDeleteAll");
    this.checkedRows = new Array();
  }

  bindAddEmployee(callback) {
    this.btnSubmit.addEventListener("click", () => {
      const formData = getFormData(this.form);
      if (formData !== null) {
        callback(formData);
      }
    });
  }

  bindEditEmployee(callback) {
    this.employeeList.addEventListener("click", (event) => {
      const button = event.target.closest("button.btn-edit");
      if (button) {
        const employeeId = button.getAttribute("data-id");
        callback(employeeId);
      }
    });
  }

  bindDeleteEmployee(callback) {
    this.employeeList.addEventListener("click", (event) => {
      const button = event.target.closest("button.btn-delete");
      if (button) {
        const employeeId = button.getAttribute("data-id");
        callback(employeeId);
      }
    });
  }

  bindDeleteEmployees(callback) {
    this.btnDeleteAll.addEventListener("click", (event) => {
      const button = event.target.closest("button.btn-delete-all");
      if (button) {
        const checkboxes = this.employeeList.querySelectorAll(
          'input[type="checkbox"]'
        );
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            this.checkedRows.push(parseInt(checkbox.getAttribute("data-id")));
          }
        });
        callback(this.checkedRows);
      }
    });
  }

  toggleAllCheckboxes() {
    this.employeeList.addEventListener("click", (event) => {
      if (event.target.id == "checkboxAll") {
        this.checkAllRows(event.target.checked);
      }
    });
  }

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
  }

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

  clearForm() {
    this.form.reset();
  }

  closeModal() {
    this.employeeModal.hide();
  }

  setTooltips() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  disableInputs(enabled) {
    const disabledInputs = this.form.querySelectorAll(".not-editable");
    disabledInputs.forEach((input) => {
      input.toggleAttribute("readonly", enabled);
    });
  }

  checkAllRows(selected) {
    const checkboxes = this.employeeList.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selected;
    });
  }
}
