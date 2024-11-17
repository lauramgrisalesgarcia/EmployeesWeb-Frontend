class EmployeeView {
  constructor() {
    this.employeeList = document.getElementById("employee-list");
    let todayDate = new Date();
    this.dateOfBirth = document.getElementById("dateOfBirth");
    this.dateOfBirth.setAttribute("min", this.setDateYears(todayDate, 65, 0));
    this.dateOfBirth.setAttribute("max", this.setDateYears(todayDate, 18, 0));
    this.setModalTitle("employeeModal");
    this.action = false;
    this.btnSubmit = document.querySelector("#btnSubmit");
    this.form = document.querySelector("#employeeForm");
    this.arrRole = new Array("Desarrollador", "Team Leader", "CTO");

    // this.addEmployeeBtn = document.getElementById("addEmployeeBtn");
    // this.nameInput = document.getElementById("name");
    // this.positionInput = document.getElementById("position");
  }

  bindAddEmployee(callback) {
    this.btnSubmit.addEventListener("click", () => {
      const formData = this.getFormData(this.form);
      if (formData !== null) {
        callback(formData);
      }
    });
  }

  validateForm(formElement) {
    for (let i = 0; i < formElement.length; i++) {
      if (formElement[i].type == "select-one") {
        if (formElement[i].selectedIndex == 0) {
          formElement[i].focus();
          return false;
        }
      } else {
        if (formElement[i].required == true) {
          if (formElement[i].value.length == 0 && formElement[i].value == "") {
            formElement[i].focus();
            return false;
          }
        }
      }
    }
    return true;
  }

  getFormData(formElement) {
    if (this.validateForm(formElement)) {
      //Recolects all the form's inputs type for create an object string
      let inputList = formElement.querySelectorAll("input");
      let selectList = formElement.querySelectorAll("select");
      let jsonData = "{";
      inputList.forEach((input) => {
        jsonData += `"${input.id}":"${input.value}",`;
      });
      selectList.forEach((select) => {
        jsonData += `"${select.id}":"${
          select.options[select.selectedIndex].value
        }",`;
      });
      jsonData = jsonData.substring(0, jsonData.length - 1);
      jsonData += "}";
      return JSON.parse(jsonData);
    } else {
      alert("Diligencia todos los campos");
    }
    return null;
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
            <input class="form-check-input" type="checkbox" id="checkbox1">
          </div>
        </th>
        <th scope="row">${index + 1} </th>                
        <td scope="row">${employee.identification} </td>                
        <td>${employee.name}</td>
        <td>${employee.surname}</td>
        <td>${employee.dateofBirth}</td>
        <td>${employee.email}</td>
        <td>${this.arrRole[employee.roleId - 1]}
        </td>
        <td>
          <div class="actions-buttons">
            <a class="btn" data-bs-toggle="collapse" href="#navbarActions3" role="button" aria-expanded="false"
              aria-controls="navbarActions3" aria-label="Acciones"><svg xmlns="http://www.w3.org/2000/svg"
                height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71">
                <path
                  d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </svg>
            </a>
            <div class="collapse navbar-collapse" id="navbarActions3">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item mx-0 mx-lg-1">
                  <a class="nav-link py-2 px-0 px-lg-2 rounded" data-bs-toggle="modal" data-bs-target="#employeeModal"
            data-bs-title="Editar" data-action="true">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                      fill="#FFFFFF">
                      <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    <small>&nbsp;Editar</small>
                  </a>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                  <a class="nav-link py-2 px-0 px-lg-2 rounded" href="#about">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                      fill="#EA3323">
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                    <small>&nbsp;Eliminar</small>
                  </a>
                </li>
              </ul>
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
                    <input class="form-check-input" type="checkbox" id="checkbox1">
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

  clearForm() {
    this.form.reset();
  }

  getEmployeeData() {
    return {
      name: this.nameInput.value,
      position: this.positionInput.value,
    };
  }

  addEmployee() {
    const newEmployee = this.getEmployeeData();
    if (newEmployee.name && newEmployee.position) {
      this.onAddEmployee(newEmployee);
      this.clearInputs();
    }
  }

  // Este método será definido en el controlador
  onAddEmployee(employee) {}

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

  setModalTitle(modalName) {
    const selectedModal = document.getElementById(modalName);
    if (selectedModal) {
      selectedModal.addEventListener("show.bs.modal", (event) => {
        this.clearForm();
        const button = event.relatedTarget;
        const recipient = button.getAttribute("data-bs-title");
        const modalTitle = selectedModal.querySelector(".modal-title");
        modalTitle.textContent = `${recipient} empleado`;
        this.action = JSON.parse(button.getAttribute("data-action"));
      });
    }
  }
}
