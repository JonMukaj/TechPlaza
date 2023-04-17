class ProductDTO{
    constructor(prod){
        this.id=prod.id,
        this.name=prod.name,
        this.price=prod.price
        this.categoryId=prod.categoryId
    }
}
module.exports = ProductDTO;