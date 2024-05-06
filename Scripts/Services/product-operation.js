// contains the logic for fetching,adding,sorting,searching,deletion,updation
/* It talk to network layer to 
bring the JSON and convert JSON into objects and vice-versa.
 */

import Product from "../Models/product.js";
import  makeNetworkCall  from "./api-client.js";

  const ProductOperation={
   
    pizzasz:[],
    carts:[],
    getProductsInCarts(){
        const prodbasket = this.carts.filter(prod => prod.isAddedInCart);
        return prodbasket;
    },
    addToCart(product){
        this.carts.push(product);
        //console.log("Cart: ")
        //console.log(this['carts']);
    },
    removeFromCart(product){
        this.carts = this.carts.filter(piz => piz.id != product.id);
        //console.log("Cart: ")
        //console.log(this['carts']);
    },
    
    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza => {
            const currentPizza = new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
            return currentPizza;
        });
        this.pizzasz = productsArray;
        //console.log("The Pizzaaahh! ",this.pizzas);
        //console.log("Product Array",productsArray);
        return productsArray;
    },

    async sortProducts(){},

    search(id){
        //console.log('Pizza info: ',this.pizzasz);
        console.log('Search Pizza: ', this.pizzasz.length, 'Id ', id);
        const searched = this.pizzasz.find(pizza => pizza['id'] == id);
        console.log("After searched: ",searched);
        return searched;
    }
}
export default ProductOperation;