class EmployeeProxy {
  // Método para obtener empleados
  async getEmployees() {
    try {
      const response = await fetch(URL_API + URL_EMPLOYEE);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  }

  // Método para crear un nuevo empleado
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
          alert("Empleado creado");
          return response.json();
        } else {
          response.text().then((message) => {
            this.errorResponse(response, message);
          });
        }
      })
      .catch((error) => {
        this.errorResponse(error);
      });
  }

  // Método para actualizar un empleado
  async updateEmployee(employee) {
    try {
      const response = await fetch(`${URL_API}/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      return await response.json();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    }
  }

  // Método para eliminar un empleado
  async deleteEmployee(id) {
    try {
      const response = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  }

  async errorResponse(response, msg) {
    switch (response.status) {
      case 400:
        alert(`Solicitud incorrecta. Verifica los datos ingresados. ${msg}`);
        break;
      case 404:
        alert(`Recurso no encontrado. ${msg}`);
        break;
      case 409:
        alert(`Conflicto, los datos ya existen. ${msg}`);
        break;
      case 500:
        alert(`Error interno del servidor. ${msg}`);
        break;
      default:
        alert(`Algo salió mal. Error ${response.status}: `);
        break;
    }
  }
}
