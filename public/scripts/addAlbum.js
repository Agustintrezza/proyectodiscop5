// TRAE LA INFO DE LOS ALBUMES
async function obtenerAlbumes(req, res) {
    try {
        const data = await axios.get("/albums/vertodoslosalbumes");
        return data.data
        // console.log(data.data[0].titulo)
        // titulo = document.createElement("h1")
        // titulo.innerHTML = 'Pipo'

        console.log(data)
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
                    <p class="text-white">(${lanzamiento2})</p>
                    <img class="w-full" src="${portada}"/>
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
        // redireccionar a home
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}
