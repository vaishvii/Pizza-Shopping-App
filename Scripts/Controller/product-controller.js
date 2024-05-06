// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import Product from "../Models/product.js";
import ProductOperation from "../Services/product-operation.js";




// Data Exchange B/w View and Model.  

async function loadPizzas(){
    const pizzas = await ProductOperation.loadProducts();
    console.log('Pizzas are ', pizzas);
    pizzas.forEach(pizza => {
      preparePizzaCard(pizza);
  });
}
loadPizzas();

/*
 <div class="col-4">
                  <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
*/

function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem; background-color:rgb(252, 233, 221)";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.Name;
    h5.style="font-style:italic; font-weight:bolder;"
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.Desc;
    pTag.style="font-family: 'Roboto Slab', serif;font-size:20px"
    const button = document.createElement('button');
    button.setAttribute('product-id',pizza.id);
    button.addEventListener('click', addPizzaToCart);   // event bind
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    button.style="height:50px;background-color:rgb(40, 22, 199);color:White"
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
return outputDiv;

}

function addPizzaToCart() {
  const pizzaId = this.getAttribute('product-id');
  console.log('Current Button Clicked', pizzaId);
  const pizze = ProductOperation.search(pizzaId);
  console.log('Pizza ', pizze);
  pizze.isAddedInCart = !pizze.isAddedInCart;
  if (pizze.isAddedInCart) {
      this.className = 'btn btn-outline-danger';
      // this.className = 'btn btn-primary';
      this.innerText = 'Remove from Cart';
      ProductOperation.addToCart(pizze);
      this.style="height:50px;background-color:rgb(150, 36, 36);color:white";
      this.className = 'btn btn-outline-danger';
    }
    else {
      this.className = 'btn btn-outline-danger';
      this.innerText = 'Add to Cart';
      ProductOperation.removeFromCart(pizze);
      this.style="height:50px;background-color:rgb(40, 22, 199);color:White"
    }
    // this.className = 'btn btn-outline-danger';
  printCart();
 
}


    function printCart(){

      const cartProducts = ProductOperation.getProductsInCarts();
  console.log("cart products -> " , cartProducts);
  
  const cart = document.querySelector('#basket');
  cart.innerHTML = '';
  if (cartProducts.length == 0) {
      const pirow = document.createElement('div');
      pirow.className = 'row';
      const cartz = document.createElement('p');
      cartz.innerText = 'Cart is Empty!';
      pirow.appendChild(cartz);
      cart.appendChild(pirow);
  }
  else {
      cartProducts.forEach(el => {
          const pizrow = document.createElement('div');
          pizrow.className = 'row';
          const pizname = document.createElement('li');
          pizname.className = 'col-9 text-left';
          pizname.innerText = el.Name;
          const pizprice = document.createElement('div');
          pizprice.className = 'col-3 text-right'
          pizprice.innerText = ` ${el.Price}`;
          pizrow.appendChild(pizname);
          pizrow.appendChild(pizprice);
          cart.appendChild(pizrow);
          // const li = document.createElement('li');
          // li.className = 'card';
          // li.innerText = `Pizza: ${el.name} Price:$${el.price}`;
          // cart.appendChild(li);
      });
    
    }
    const totalPizza = cartProducts.length;
    const total = document.querySelector('#total');
    total.innerHTML = '';
    total.innerText = totalPizza;

    var amount = cartProducts.reduce((total, p) => total + parseFloat(p.Price), 0);
    var totalAmount = amount + amount * (0.18);
    const pizzaAmount = document.querySelector('#amount');
    pizzaAmount.innerHTML = '';
    // pizzaAmount.innerText = `$ ${amount}`;
    pizzaAmount.innerText = `$ ${amount.toFixed(2)}`;
    const gstamount = document.querySelector('#gst');
    gstamount.innerHTML = '';
    gstamount.innerText = `$ ${(amount * 0.18).toFixed(2)}`;
    // gstamount.innerText = `$ ${amount * (0.18)}`;
    const totamount = document.querySelector('#totamount');
    totamount.innerHTML = '';
    // totamount.innerText = `$ ${totalAmount}`;
    totamount.innerText = `$ ${totalAmount.toFixed(2)}`;
  }
