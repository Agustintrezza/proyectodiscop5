// function onLoad() {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if(userInfo === null) {
//         console.log('No hay token')
//         // window.location.href = 'http://www.google.com'
//         window.open("../signin.html", "_self"); 
//     } else {
//         console.log('Hay token')
//     }
// }
// import {cerrarSesion} from '../scripts/utils/utils'

// const cerrarSesion = () => {
// }

// import {isAuth} from './scripts/utils/utils.js'

// console.log(isAuth)

// TRAE LA INFO DE LOS ALBUMES
async function obtenerAlbumes(req, res) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo.token
    console.log(token);

    try {
        const data = await axios.get("/albums/vertodoslosalbumes", 
        {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
         );
         console.log(data.data.albums)
        return data.data.albums        
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}
obtenerAlbumes();

//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUNES.
const display = document.querySelector("#display-data");
const mostrarData = async () => {
    const payload = await obtenerAlbumes();

    let displayData = payload.map((object) => {
        const {titulo, descripcion, portada, lanzamiento} = object;

        let lanzamiento2 = new Date(lanzamiento).getFullYear();
        console.log(lanzamiento2)

        return `
            <div class="flex p-4 m-auto">

                <div class="flex flex-col p-2">
                    <p class="text-white text-4xl">${titulo}</p>
                    <p class="text-white">${descripcion}</p>
                    <p class="text-white mb-4">(${lanzamiento2})</p>
                    <img class="w-full w-70 h-70" src="${portada}"/>
                </div>
                
            </div>
        `
    }).join("");

    display.innerHTML = displayData;
}   
mostrarData();

//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    return addAlbum(objectToSend)
}

// CREÁ EL ÁLBUM
async function addAlbum(objectToSend) {

    console.log(objectToSend)
     try {
        await axios.post("/albums/crearalbum", objectToSend);
        swal({
          title: "Success!",
          text: "Album added to the collection!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        location.reload()
        // redireccionar a home
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}


// function cerrarSesion() {
//     console.log('Se cierra la sesion')
// }


// module.exports = {cerrarSesion}