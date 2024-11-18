class EmployeeProxy {
  async getEmployees() {
    return fetch(`${URL_API}${URL_EMPLOYEE}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async getEmployee(employeeId) {
    return fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.errorResponse(response);
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async addEmployee(employee) {
    return fetch(URL_API + URL_EMPLOYEE, {
      method: ARR_ROUTES[1],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.errorResponse(response);
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async updateEmployee(employee, employeeId) {
    return fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`, {
      method: ARR_ROUTES[2],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          this.errorResponse(response);
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async deleteEmployee(employeeId) {
    return fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`, {
      method: ARR_ROUTES[3],
    })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          this.errorResponse(response);
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async deleteEmployees(employeesId) {
    if (!employeesId || employeesId.length === 0) {
      alert("No hay empleados seleccionados para eliminar.");
      return;
    }

    return fetch(`${URL_API}${URL_EMPLOYEE}list`, {
      method: ARR_ROUTES[3],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeesId),
    })
      .then((response) => {
        if (response.ok) {
          //REvisar retorno del eliminar masivo. Añadir SweetAlert y añadir comentarios
          const result = response.json();
          alert(result.message);
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  async errorResponse(response) {
    switch (response.status) {
      case 400:
        response.text().then((message) => {
          alert(
            `Solicitud incorrecta. Verifica los datos ingresados. ${message}`
          );
        });
        break;
      case 404:
        response.text().then((message) => {
          alert(`Recurso no encontrado. ${message}`);
        });
        break;
      case 409:
        response.text().then((message) => {
          alert(`Conflicto. ${message}`);
        });
        break;
      case 500:
        alert(`Error interno del servidor.`);
        break;
      default:
        alert(`Algo salió mal. Error : ${response.status}`);
        break;
    }
    return Promise.resolve();
  }
}
