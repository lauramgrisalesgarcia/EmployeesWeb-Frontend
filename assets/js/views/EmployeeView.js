class EmployeeView {
  constructor() {
    this.employeeList = document.getElementById("employee-list");

    // this.addEmployeeBtn = document.getElementById("addEmployeeBtn");
    // this.nameInput = document.getElementById("name");
    // this.positionInput = document.getElementById("position");

    // this.renderEmployees("lero");
  }

  renderEmployees(employees) {
    this.employeeList.innerHTML = "";
    var table = `<table id="table-employees" class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <div>
                    <input class="form-check-input" type="checkbox" id="checkbox1">
                  </div>
                  </th>
                <th scope="col">#</th>                
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <div>
                    <input class="form-check-input" type="checkbox" id="checkbox1">
                  </div>
                  </th>
                <th scope="row">1</th>                
                <td>Mark</td>
                <td>Otto</td>
                <td>23-05-1986</td>
                <td>otto.mark@moraenterpise.com</td>
                <td>CTO</td>
                <td>
                  <div class="actions-buttons">
                    <a class="btn" data-bs-toggle="collapse" href="#navbarActions1" role="button" aria-expanded="false"
                      aria-controls="navbarActions1" aria-label="Acciones"><svg xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71">
                        <path
                          d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                      </svg>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarActions1">
                      <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-0 mx-lg-1">
                          <a class="nav-link py-2 px-0 px-lg-2 rounded" href="#portfolio">
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
              </tr>
              <tr>
                <th scope="row">
                  <div>
                    <input class="form-check-input" type="checkbox" id="checkbox1">
                  </div>
                </th>
                <th scope="row">2</th>                
                <td>Jacob</td>
                <td>Thornton</td>
                <td>03-09-1991</td>
                <td>thornton.jacob@moraenterpise.com</td>
                <td>Team Leader</td>
                <td>
                  <div class="actions-buttons">
                    <a class="btn" data-bs-toggle="collapse" href="#navbarActions2" role="button" aria-expanded="false"
                      aria-controls="navbarActions2" aria-label="Acciones"><svg xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71">
                        <path
                          d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                      </svg>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarActions2">
                      <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-0 mx-lg-1">
                          <a class="nav-link py-2 px-0 px-lg-2 rounded" href="#portfolio">
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
              </tr>
              <tr>
                <th scope="row">
                  <div>
                    <input class="form-check-input" type="checkbox" id="checkbox1">
                  </div>
                </th>
                <th scope="row">3</th>                
                <td>Larry</td>
                <td>Bird</td>
                <td>16-10-1991</td>
                <td>bird.larry@moraenterpise.com</td>
                <td>Desarrollador</td>
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
                          <a class="nav-link py-2 px-0 px-lg-2 rounded" href="#portfolio">
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
              </tr>
            </tbody>
          </table>`;
    // employees.forEach((employee) => {
    //   const li = document.createElement("li");
    //   li.textContent = `${employee.name} - ${employee.position}`;
    //   this.employeeList.appendChild(li);
    // });
    this.employeeList.innerHTML = table;
    createDataTable("table-employees");
  }

  clearInputs() {
    this.nameInput.value = "";
    this.positionInput.value = "";
  }

  getEmployeeData() {
    return {
      name: this.nameInput.value,
      position: this.positionInput.value,
    };
  }

  handleAddEmployee() {
    const newEmployee = this.getEmployeeData();
    if (newEmployee.name && newEmployee.position) {
      this.onAddEmployee(newEmployee);
      this.clearInputs();
    }
  }

  // Este método será definido en el controlador
  onAddEmployee(employee) {}
}
