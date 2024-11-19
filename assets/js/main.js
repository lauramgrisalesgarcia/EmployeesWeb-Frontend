// Description: Run when the DOM loads
// Author: Laura Grisales
// Date: 18/11/2024
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
  loadFontSize();
});

// Description: Takes input and select form elements and creates a string with json structure
// Author: Laura Grisales
// Date: 18/11/2024
function getFormData(formElement) {
  if (validateForm(formElement)) {
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

// Description: Receives the data that will be painted in the DOM. Validates if the DOM element exists (key) and assigns the corresponding value
// Author: Laura Grisales
// Date: 18/11/2024
function setDataForm(employee) {
  for (const key in employee) {
    const input = document.getElementById(key);
    if (input) {
      input.value = employee[key];
    }
  }
}

// Description: Loops through the elements of a form, validating if it is required and returns false if not
// Author: Laura Grisales
// Date: 18/11/2024
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

// Description: Validate that the email has the structure it should have
// Author: Laura Grisales
// Date: 18/11/2024
function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}

// Description: Take the font size stored in the localstorage
// Author: Laura Grisales
// Date: 18/11/2024
function loadFontSize() {
  const storedFontSize = localStorage.getItem("fontSize");
  if (storedFontSize) {
    document.body.style.fontSize = storedFontSize;
  }
}

// Description: Function to increase font size
// Author: Laura Grisales
// Date: 18/11/2024
document.getElementById("increase-font").addEventListener("click", function () {
  let currentSize = parseFloat(getComputedStyle(document.body).fontSize);
  let newSize = currentSize * 1.1 + "px";
  document.body.style.fontSize = newSize;
  localStorage.setItem("fontSize", newSize);
});

// Description: Function to decrease font size
// Author: Laura Grisales
// Date: 18/11/2024
document.getElementById("decrease-font").addEventListener("click", function () {
  let currentSize = parseFloat(getComputedStyle(document.body).fontSize);
  let newSize = currentSize / 1.1 + "px";
  document.body.style.fontSize = newSize;
  localStorage.setItem("fontSize", newSize);
});
