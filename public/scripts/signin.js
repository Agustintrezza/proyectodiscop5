//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById("formulario-login");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  getInputValues();
});

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
  const valoresFormulario = new FormData(formulario);
  const objectToSend = Object.fromEntries(valoresFormulario);
  return loginUser(objectToSend);
}

// CREÁ EL USUARIO
async function loginUser(objectToSend) {
  console.log(objectToSend);
  try {
    const { data } = await axios.post("/users/login", objectToSend);
    const userInfo = data.user[0];
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    swal({
      title: "¡Felicitaciones y Bienvenidx",
      text: "Iniciaste sesión correctamente! De esta manera podrás hacer uso de las funcionalidades de la aplicación.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((isConfirm) => {
      window.open("../index.html", "_self");
    });
  } catch (error) {
    swal({
      title: "No es posible iniciar sesión",
      text: "El email ingresado o el password no son válidos!",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  }
}
