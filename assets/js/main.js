document.addEventListener("DOMContentLoaded", () => {
  const employeeProxy = new EmployeeProxy();
  const employeeView = new EmployeeView();
  const employeeModel = new Employee();
  const employeeController = new EmployeeController(
    employeeView,
    employeeProxy,
    employeeModel
  );

  employeeController.init();
});

function getFormData(formElement) {
  if (validateForm(formElement)) {
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
    showAlert(
      "Diligencia todos los campos",
      "Confirma que tenga la estructura correcta",
      "error"
    );
  }
  return null;
}

function setDataForm(employee) {
  for (const key in employee) {
    const input = document.getElementById(key);
    if (input) {
      input.value = employee[key];
    }
  }
}

function validateForm(formElement) {
  for (let i = 0; i < formElement.length; i++) {
    if (formElement[i].type == "select-one") {
      if (formElement[i].selectedIndex == 0) {
        formElement[i].focus();
        return false;
      }
    } else if (formElement[i].type == "email") {
      if (!validateEmail(formElement[i].value)) {
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

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}
