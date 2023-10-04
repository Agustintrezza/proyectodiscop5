
// let nombreUsuario = prompt('¡Bienvenidx, ingresá tu nombre y adquirí tus tickets!');

// let carteBienvenida = document.getElementById('cartel-usuario');
// carteBienvenida.style.visibility = 'hidden';


// // VALIDACION NOMBRE (NO DEBE ESTAR VACÍO, DEBE TENER AL MENOS 3 CARACTERES)

// if(nombreUsuario === null || nombreUsuario.length <= 0) {
//     alert('!Es necesario indicar al menos un nombre válido!')
//     location.reload();
// } else if (nombreUsuario.length <= 2) {
//     alert('!El nombre debe contener al menos 3 caracteres!')
//     nombreUsuario = '';
//     location.reload();
// } else {

//     // VALIDACION EDAD (NO DEBE ESTAR VACÍA, DEBE SER MAYOR A 18 AÑOS)

//     var inputEdad = prompt(`¡Bienvenidx ${nombreUsuario}! por último ingresá tu edad y adquirí tus tickets!`);
//     var edadUsuario = parseInt(inputEdad);
//     console.log(isNaN(edadUsuario));

//     if(isNaN(edadUsuario) === true) {
//         alert('!Es necesario indicar al menos una edad válida!')
//         location.reload();
//     } else if(edadUsuario && edadUsuario >= 18) {
//         nombreUsuarioTag = document.getElementById('nombreUsuario');
//         nombreUsuarioTag.textContent = '¡Hola ' + nombreUsuario.toUpperCase() + '! ';

//         edadUsuarioTag = document.getElementById('edadUsuario');
//         edadUsuarioTag.textContent = ' (' + edadUsuario + ')';

//         nombreUsuario2Tag = document.getElementById('nombreUsuario2'); 
//         nombreUsuario2Tag.textContent = nombreUsuario.toUpperCase();

//         document.getElementById("imagen-usuario").src="../imagenes/icono-user-sidenav.jpg";

//         carteBienvenida.style.visibility= 'visible'

//         nombreUsuario2 = document.querySelector('.nombreUsuarioClass');
//         nombreUsuario2.textContent = '¡Bienvenidx ' + nombreUsuario.toUpperCase() + '! ';
//     } else {

//         //ALERTA MENOR DE EDAD DESHABLITA BOTONES Y AGREGA CLASES Y MODIFICA EL TEXTO DE LOS BOTONES
//         swal({
//             icon: "warning",
//             title: `¡LO SENTIMOS "${nombreUsuario.toUpperCase()}", ERES MENOR DE EDAD!`,
//             text: `¡Tienes que ser mayor de 18 años para comprar tickets!`,
//         })   

//             let botones = document.querySelectorAll('.boton-comprar-tickets');

//             for(let i=0; i <= botones.length -1 ; i++) {
//                 botones[i].disabled = true; 
//                 botones[i].classList.add('bg-red-400', 'text-violet-900', 'font-bold')
//                 botones[i].textContent = '¡Eres menor de edad! :-('
//                 // botones.classList.add('bg-red-500')    
//             }
//             setTimeout(() => {
//                 location.reload();
//             }, 4000);
//     }
// }


// // FUNCION GETTICKETS
//     let cantidadConcierto = 5;
    

//     const getTickets = (cantidad, lugar) => {
//     if(cantidad > 0) {
//         swal({
//             title: `Confirmas la compra para el concierto en "${lugar}" ?`,
//             text: "Confirmando se realizará la compra de los tickets",
//             icon: "warning",
//             confirm: "Confirm",
//             // confirmButtonText: "Confirmo la compra",
//             cancelButtonText: 'Mejor no',
//             buttons: true,
//             dangerMode: true,
//          }).then((isConfirm) => {
//             if(isConfirm) {
//                 swal({
//                     icon: "success",
//                     title: `¡FELICITACIONES ${nombreUsuario}!`,
//                     text: `¡Compraste existosamente tu entrada para el show en el estadio "${lugar}"!`,
//                 })  
//             } 
//          }  
//     )} else {
//         swal({
//             icon: "warning",
//             title: `¡LO SENTIMOS!`,
//             text: `¡Ya no quedan más lugares para el concierto en "${lugar}"! Te recomendamos seleccionar otra opción!`,
//         }) 
//     }
// }

