const user = JSON.parse(localStorage.getItem('userInfo'))
document.getElementById('container-cerrar-sesion-login').style.visibility = "hidden";
// document.getElementById('logo-p5').style.display= 'none';
document.getElementById('logo-p5-login').style.display= 'none';



console.log(user)
if(user) {
        console.log('hay usuario')
        // document.getElementById('logo-p5').style.display= 'block';
        document.getElementById('logo-p5-login').style.display= 'block';

        // document.getElementById('alerta-sesion').style.display = "none"

        // document.getElementById('container-cerrar-sesion').style.visibility = "visible"
        document.getElementById('container-cerrar-sesion-login').style.visibility = "visible"

        // document.getElementById('container-sin-sesion').style.display = "none"
        document.getElementById('container-sin-sesion-login').style.display = "none"

        document.getElementById('nombre-usuario').textContent = user.email;
    } 

function cerrarSesion() {
    console.log(user)
    localStorage.removeItem('userInfo')
    // document.getElementById('container-cerrar-sesion').style.visibility = "hidden"
    window.location.href = "../signin.html"
}


//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById('formulario-login');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    return loginUser(objectToSend)
}

// CREÁ EL USUARIO
async function loginUser(objectToSend) {

    console.log(objectToSend)
     try {
      const { data } = await axios.post("/users/login", objectToSend);    
        const userInfo = data.user[0]
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // document.getElementById('nombre-usuario').textContent= userInfo.nombre
        swal({
          title: "¡Felicitaciones!",
          text: "Iniciaste sesión correctamente!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((isConfirm) => {
            window.open("../index.html", "_self"); 
       })  
        // redireccionar a home
      } catch (error) {
        swal({
            title: "No es posible iniciar sesión",
            text: "El email ingresado o el password no son válidos!",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        // alerta en caso de error
      }
}