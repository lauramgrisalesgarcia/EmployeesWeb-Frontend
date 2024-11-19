// Description: General function to show alert with confirmation
// Author: Laura Grisales
// Date: 18/11/2024
function showConfirmAlert(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showConfirmButton: true,
    confirmButtonText: "Continuar",
    toast: true,
  }).then((result) => {
    return result.isConfirmed;
  });
}

// Description: General function to show information alert
// Author: Laura Grisales
// Date: 18/11/2024
function showAlert(title, text, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
    text: text,
  });
}
