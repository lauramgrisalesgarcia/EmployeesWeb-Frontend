// Description: General function to set the spanish options to the table, search function, pages...
// Author: Laura Grisales
// Date: 18/11/2024
function createDataTable(tableId) {
  const table = new DataTable(`#${tableId}`, {
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 de 0 entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Resultados no encontrados",
      paginate: {
        first: "‹‹",
        last: "››",
      },
    },
    order: [[1, "desc"]],
    columnDefs: [{ bSortable: false, aTargets: [0, 8] }],
  });
}
