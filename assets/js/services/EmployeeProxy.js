// Description: Employee Proxy. Here we connect with the API
// Author: Laura Grisales
// Date: 18/11/2024
class EmployeeProxy {
  // Description: GET all the employees for the table
  // Author: Laura Grisales
  // Date: 18/11/2024
  async getEmployees() {
    try {
      const response = await fetch(`${URL_API}${URL_EMPLOYEE}`);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: GET one employee when the edit button is pressed
  // Author: Laura Grisales
  // Date: 18/11/2024
  async getEmployee(employeeId) {
    try {
      const response = await fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`);
      if (response.ok) {
        return response.json();
      } else {
        this.errorResponse(response);
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: POST a new employee when the save button in the modal is pressed
  // Author: Laura Grisales
  // Date: 18/11/2024
  async addEmployee(employee) {
    try {
      const response = await fetch(URL_API + URL_EMPLOYEE, {
        method: ARR_ROUTES[1],
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        return response.json();
      } else {
        this.errorResponse(response);
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: PUT a new employee when the save button in the modal is pressed and we are in edit mode
  // Author: Laura Grisales
  // Date: 18/11/2024
  async updateEmployee(employee, employeeId) {
    try {
      const response = await fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`, {
        method: ARR_ROUTES[2],
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (response.status == 200) {
        return true;
      } else {
        this.errorResponse(response);
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: DELETE a new employee when the delete button is pressed
  // Author: Laura Grisales
  // Date: 18/11/2024
  async deleteEmployee(employeeId) {
    try {
      const response = await fetch(`${URL_API}${URL_EMPLOYEE}${employeeId}`, {
        method: ARR_ROUTES[3],
      });
      if (response.status == 200) {
        return true;
      } else {
        this.errorResponse(response);
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: DELETE a list of employees when the deleteAll button is pressed
  // Author: Laura Grisales
  // Date: 18/11/2024
  async deleteEmployees(employeesId) {
    try {
      const response = await fetch(`${URL_API}${URL_EMPLOYEE}list`, {
        method: ARR_ROUTES[3],
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeesId),
      });

      if (response.status == 200) {
        const message = await response.text();
        return JSON.parse(message);
      } else {
        this.errorResponse(response);
      }
    } catch (error) {
      this.errorResponse(error);
    }
  }

  // Description: Receives the response to paint the error that occurred
  // Author: Laura Grisales
  // Date: 18/11/2024
  async errorResponse(response) {
    switch (response.status) {
      case 400:
        response.text().then((message) => {
          showAlert("Solicitud incorrecta", message, "error");
        });
        break;
      case 404:
        response.text().then((message) => {
          showAlert("Recurso no encontrado", message, "error");
        });
        break;
      case 409:
        response.text().then((message) => {
          showAlert("Conflicto", message, "error");
        });
        break;
      case 500:
        showAlert("Error interno del servidor", null, "error");
        break;
      default:
        showAlert("Algo salió mal", `Error: ${response.status}`, "error");
        break;
    }
    return Promise.resolve();
  }
}
