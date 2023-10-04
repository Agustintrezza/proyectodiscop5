const user = JSON.parse(localStorage.getItem('userInfo'))
document.getElementById('container-cerrar-sesion-registro').style.visibility = "hidden";
// document.getElementById('logo-p5').style.display= 'none';
document.getElementById('logo-p5-registro').style.display= 'none';



console.log(user)
if(user) {
        console.log('hay usuario')
        // document.getElementById('logo-p5').style.display= 'block';
        document.getElementById('logo-p5-registro').style.display= 'block';

        // document.getElementById('alerta-sesion').style.display = "none"

        // document.getElementById('container-cerrar-sesion').style.visibility = "visible"
        document.getElementById('container-cerrar-sesion-registro').style.visibility = "visible"

        // document.getElementById('container-sin-sesion').style.display = "none"
        document.getElementById('container-sin-sesion-registro').style.display = "none"

        document.getElementById('nombre-usuario').textContent = user.email;
    } 

function cerrarSesion() {
    console.log(user)
    localStorage.removeItem('userInfo')
    // document.getElementById('container-cerrar-sesion').style.visibility = "hidden"
    window.location.href = "../signin.html"
}


//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById('formulario-register');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    return createUser(objectToSend)
}

// CREÁ EL USUARIO
async function createUser(objectToSend) {

    console.log(objectToSend)
     try {
        await axios.post("/users/crearusuario", objectToSend);
        swal({
          title: "¡Felicitaciones!",
          text: "Tu cuenta se creó de manera exitosa!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // redireccionar a home
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}