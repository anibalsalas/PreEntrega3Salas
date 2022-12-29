// let minusBtn = document.querySelector('.input__minus');
// let plusBtn = document.querySelector('.input__plus');
// let userInput = document.querySelector('.input__number');

// let userInputNumber = 0;

// plusBtn.addEventListener('click', (e) =>{
//     if(e.target.classList.contains('input__plus')){
//         userInputNumber++;
//         userInput.value = userInputNumber;
//         console.log(userInputNumber);
//     }
    
// });


// minusBtn.addEventListener('click', () =>{
//     userInputNumber--;
//     if(userInputNumber <= 0){
//         userInputNumber = 0;
//     }
//    userInput.value = userInputNumber;
//     console.log(userInputNumber);
// })



const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articuloCarrito = []



cargarEventListeners()
function cargarEventListeners(){
    listaProductos.addEventListener('click', agregarProducto);
   // carrito.addEventListener('click', deleteProducto);

}
// const cargarEventListeners = () => {
//     listaProductos.addEventListener('click', agregarProducto);
// }

//FUNCIONES
//Agrega producto al carrito
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('add__producto')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

//Elimina producto del carrito
function deleteProducto(e){
    //console.log(e.target.classList);
     if(e.target.classList.contains('borrar-producto')){
       
        const productoID = e.target.getAttribute('id');
//Elimino del array de articuloCarrito por el data-id
        articuloCarrito = articuloCarrito.filter(producto => producto.id === productoID);
        carritoHTML();//itera sobre el carrito y muestra su HTML
     }
}



//Lee 
function leerDatosProducto(producto){
  
    //console.log(producto)
    //crea un objeto con el contenido actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('h4').textContent,
        id: producto.querySelector('a').getAttribute('id'),
        cantidad: 1
    }
    //Revisa si  ya existe en el carrito
    const existe = articuloCarrito.some( producto => producto.titulo === infoProducto.titulo );
    if(existe){
        const productos = articuloCarrito.map( producto =>{
            if(producto.titulo === infoProducto.titulo){
                producto.cantidad++;
                actualizarTotalesCarrito(articuloCarrito);
                return producto; //retorna el objeto actualizado
                
            } else {
                return producto;//retorna los objetos que no son los duplicados
                
            }
        });
        articuloCarrito = [...productos];
        
    }else {
        articuloCarrito = [...articuloCarrito, infoProducto];
        actualizarTotalesCarrito(articuloCarrito);

    }
    //agrega elementos al arreglo del carrito
    console.log(articuloCarrito);
    carritoHTML();
}
//TOTAL CARRITO

const actualizarTotalesCarrito = (articuloCarrito) => {
    const totalCantidad = articuloCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = articuloCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};



//Muestra el carrito de compras en el HTML

function carritoHTML(){
    //Limpia HTML
    limpiaHTML();
    //Recorre el carrito y genera el HTML
    articuloCarrito.forEach( producto =>{
       const { imagen, titulo, precio, cantidad, id} = producto;     
        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td class ="td-carrito">
            <img src="${imagen}" width="60">
        </td>
        <td class="td-carrito texto-titulo">
            ${titulo}
         </td>
        <td class ="td-carrito">
            ${precio}
        </td>
         <td class ="td-carrito">
           <p id = cantidad${id} class="texto-cantidad"> Cantidad : ${cantidad}</p>
        </td>
        <td>
            <button href="#" class='borrar-producto' id=${id} > X </button>
         </td>

       
        `;
        console.log(producto)
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
       
    });

    //Elimina los productos del tbody
    function limpiaHTML(){
        //contenedorCarrito.innerHTML = '';

        while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }
}

const guardarCarritoStorage = (articuloCarrito) => {
    localStorage.setItem('articuloCarrito', JSON.stringify(articuloCarrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('articuloCarrito'));
    return carritoStorage;
};