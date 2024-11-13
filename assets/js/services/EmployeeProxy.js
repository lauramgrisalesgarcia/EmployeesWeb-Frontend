class EmployeeProxy {
  constructor() {
    this.apiUrl = "https://api.example.com/employees"; // Reemplázalo con tu API real
  }

  // Método para obtener empleados
  async getEmployees() {
    try {
      const response = await fetch(this.apiUrl);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  }

  // Método para crear un nuevo empleado
  async addEmployee(employee) {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      return await response.json();
    } catch (error) {
      console.error("Error al agregar empleado:", error);
    }
  }

  // Método para actualizar un empleado
  async updateEmployee(employee) {
    try {
      const response = await fetch(`${this.apiUrl}/${employee.id}`, {
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
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  }
}
