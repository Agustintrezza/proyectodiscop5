//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById("formulario-register");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  getInputValues();
  console.log("Entraaaa");
});

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
  const valoresFormulario = new FormData(formulario);
  const objectToSend = Object.fromEntries(valoresFormulario);
  return createUser(objectToSend);
}

// CREÁ EL USUARIO
async function createUser(objectToSend) {
  console.log(objectToSend);
  try {
    await axios.post("/users/crearusuario", objectToSend);
    swal({
      title: "¡Felicitaciones, gracias por registrarte!",
      text: "Tu cuenta se creó de manera exitosa!",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((isConfirm) => {
      window.open("../signin.html", "_self");
    });
  } catch (error) {
    console.log("entra en el error");
  }
}
