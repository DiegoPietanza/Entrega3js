const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


/*
const saveLocalStorage = () => {
  localStorage.setItem("pizzas", JSON.stringify(taskList));
  
};
*/
/*traigo el dato del input */
const numPizza = document.querySelector(".numeroB");
const btnSearch = document.getElementById ("boton");
const container = document.querySelector (".card-container");
const merror = document.querySelector(".merror");


const armoHtml = (pizza) => {

    let card = document.createElement('div');
    card.classList.add('card');
    
    let cardImg = document.createElement('img');
    cardImg.classList.add('card-img');
    cardImg.src = pizza.imagen;
        
    let cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = pizza.nombre; 
    
    let cardPrecio = document.createElement('h2');
    cardPrecio.classList.add('card-precio');
    cardPrecio.innerText = pizza.precio;
    
    let cardIngredientes = document.createElement ('h4');
    cardIngredientes.classList.add ('card-ingredientes');
    cardIngredientes.innerText = buscandoIngredientes(pizza);
          
    card.appendChild(cardImg);
    card.appendChild(cardTitle);
    card.appendChild(cardIngredientes);
    card.appendChild(cardPrecio);
    
  
  return container.appendChild(card); //document.body.appendChild(card);
  
};
    


//verifico el ingreso del usuario
const isValid = () => {
  const valor = Number (numPizza.value);

  if (isNaN(valor) || valor < 1 || valor > 5) {
    console.log("Valor incorrecto, ingrese un número entre 1 y 5");
      mensajeError("Valor incorrecto, ingrese un número entre 1 y 5");
      numPizza.value = '';
    return false;
  }

  return true;
  }

 //traigo el valor ingresado por le usuario

const traerId = () => {
  if (isValid()) {
    const id = Number (numPizza.value);
    console.log("ID válido:", id);
    buscarObjeto(id);
    numPizza.value = "";
  }
  return;
};

//buscar el objeto con el id
const buscarObjeto = (id) => {
  const pizzaEncontrada = pizzas.find((pizza) => pizza.id === id);

  if (pizzaEncontrada) {
    console.log("Pizza encontrada:", pizzaEncontrada);
    armoHtml(pizzaEncontrada);
   // imagen(pizzaEncontrada.imagen);

    // Guardar el último ID visitado en localStorage
    localStorage.setItem("ultimoId", id);

    return;
  } else {
    console.log("No se encontró ninguna pizza con ese ID");
  }
};

const buscandoIngredientes = (pizza) => {
  return pizza.ingredientes
    .map((ingrediente) => ` ${ingrediente}`)
    .join("");
};

const imagen = (url) => {
  container.style.backgroundImage = `url(${url})`;
};

//mostrar error
const mensajeError = (mensaje) => {
        /*
         let cardError = document.createElement('div');
         cardError.classList.add('card-error');

         let cardErrorMensaje = document.createElement("h2");
         cardErrorMensaje.classList.add("card-Error-Mens");
         cardErrorMensaje.innerText = mensaje;

         */
         //merror.innerHTML = `<p>${mensaje}</p>`;
         //merror.appendChild (cardErrorMensaje);
         container.innerHTML = ``;
         container.style.background = "none";
         container.innerHTML = `
           <div class="card-error">
                   <div class="error-title">Error</div>
                   <div class="error-cuerpo">
                       
                       <p>${mensaje}</p>
                   </div>
                   <button id="btnError" class="btn-error">OK</button>
                </div>
                `;
          
  localStorage.removeItem("ultimoId");
  cerrar();

};

//cerrar el mensaje

const cerrar = () => {
  const btnClose = document.querySelector(".btn-error");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      container.innerHTML = "";
      //container.style.backgroundImage = "none";
    });
  }
};

//Buscamos en LS
let ultimaPizza = JSON.parse(localStorage.getItem("pizza"));

let savePizza = () => {
  localStorage.setItem("pizza", JSON.stringify(pizzas));
};

const init = () => {
  localStorage.setItem("ultimoId", "");

  btnSearch.addEventListener("click", traerId);

  const ultimoId = localStorage.getItem("ultimoId");
  if (ultimoId) {
    buscarObjeto(Number(ultimoId)); // Convertir a número antes de usarlo
  }
};

init();

