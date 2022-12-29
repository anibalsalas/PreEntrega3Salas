const pintarProductos = () => {
    const contenedor = document.getElementById('lista-productos');
    productos.forEach( producto => {
        const div = document.createElement('div');
        div.classList.add('cardp');
        div.innerHTML += `
            <img src="${producto.img}" class="card-img-top ofertas position-relative top-0 start-50 translate-middle-x" alt="compras">
             <h6 class="text-center">${producto.marca}</h6>
             <h5 class="card-title text-center card-botom">${producto.desc}</h5>
             <div class="flex__precio">
                  <h4 class="fw-bold precio_final">${producto.precio}</h4>
             </div>
             <div class="card text-center flex" >
              <a href="pages/producto.html" class="ver__producto">Ver Producto</a>
              <a href="#" class="add__producto" id="${producto.id}"><img src="public/img/car.png" alt=""> Agregar</a>
             </div>
        `
        contenedor.appendChild(div)
    })
}

pintarProductos()