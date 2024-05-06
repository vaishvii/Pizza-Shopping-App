// contains the structure of a pizza object
// pizza object - Id,Name,Desc,Price,Rating,Image
class Product {
    constructor(id, Name, Desc, Price, url) {
        // this--> contains current calling object
        this.id = id;
        this.Name = Name;
        this.Desc = Desc;
        this.Price = Price;
        this.url = url;
        this.isAddedInCart = false;

    }
}
export default Product;
