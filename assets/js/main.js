document.addEventListener("DOMContentLoaded", () => {
  const employeeProxy = new EmployeeProxy();
  const employeeView = new EmployeeView();
  const employeeController = new EmployeeController(
    employeeView,
    employeeProxy
  );

  employeeController.init();
});

// import EmployeeController from "../controllers/EmmployeeController.js";
// // import("../../controllers/EmployeeController.js").then((EmployeeController) => {
// // window.addEventListener("load", () => {
// alert("Hola");
// var employeeController = new EmployeeController();
// employeeController.init();
// // });
// // });
