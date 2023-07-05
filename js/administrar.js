//#region HTMLS
const tabla = document.getElementById("tabla");
const nombre = document.getElementById("nombre");
const foto = document.getElementById("foto");
const stock = document.getElementById("stock");
const stocknegativo = document.getElementById("stocknegativo");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const save = document.getElementById("save");
//#endregion

//#region  Variables
let vnombre = "";
let vfoto = "";
let vstock = 0;
let vprecio = 0;
let vstocknegativo = false;
let vdescripcion = "";
//#endregion

//#region Event Listeners

nombre.addEventListener("change", function (e) {
  vnombre = e.target.value;
});
foto.addEventListener("change", function (e) {
  vfoto = e.target.value;
});
stock.addEventListener("change", function (e) {
  vstock = +e.target.value;
});
stocknegativo.addEventListener("change", function (e) {
  vstocknegativo = stocknegativo.checked;
});
descripcion.addEventListener("change", function (e) {
  vdescripcion = e.target.value;
});
precio.addEventListener("change", function (e) {
  vprecio = +e.target.value;
});

save.addEventListener("click", function (e) {
  e.preventDefault();
  //verificar que todos los datos estén correctos
  if (vdescripcion === "") {
    alert("LLenar el campo de la descripción por favor");
    return;
  }
  const producto = {
    id: 4,
    descripción: vdescripcion,
    precio_unitario: vprecio,
    precio_unitario_str: vprecio.toString(),
    nombre: vnombre,
    fecha_de_creacion: Date.now(),
    stock: vstock,
    foto_url: vfoto,
    permite_stock_negativo: vstocknegativo,
  };

  const productos = localStorage.getItem(productos_key);
  const productosObjeto = JSON.parse(productos);
  productosObjeto.push(producto);
  localStorage.setItem(productos_key, JSON.stringify(productosObjeto));
});
//#endregion
const productos_key = "productos";
const productos = JSON.parse(localStorage.getItem(productos_key));

let htmlString = `<table class="table-light">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nombre</th>
    <th scope="col">Precio Unitario</th>
    <th scope="col">Stock</th>
    <th scope="col">Acciones</th>
  </tr>
</thead> <tbody>`;
productos.forEach((producto) => {
  htmlString += CreateItem(producto);
});

htmlString += "</tbody></table>";

tabla.innerHTML = htmlString;
const btnsEliminar = document.querySelectorAll("#btn-eliminar");

btnsEliminar.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const lista = localStorage.getItem(productos_key);
    const listaObjeto = JSON.parse(lista);
    const nuevaLista = listaObjeto.filter(
      (producto) => producto.id != +e.target.name
    );
    localStorage.setItem(productos_key, JSON.stringify(nuevaLista));
  });
});

//id -> JAMAS SE MUESTRA AL USUARIO
function CreateItem(producto) {
  return `
      <tr>
        <th scope="row">${producto.id}</th> 
        <td>${producto.nombre}</td>
        <td>${producto.precio_unitario_str}</td>
        <td>${producto.stock}</td>
        <td><button class="btn btn-danger" id="btn-eliminar" name=${producto.id}>Eliminar</button></td>
      </tr>`;
}
