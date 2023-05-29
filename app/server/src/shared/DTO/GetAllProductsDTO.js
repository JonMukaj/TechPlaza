class GetAllProductsDTO{
    constructor(prod){
        this.id=prod.id,
        this.name=prod.name,
        this.image=prod.image,
        this.price=prod.price,
        this.categoryId=prod.categoryId,
        this.stock=prod.stock
    }
}
module.exports = GetAllProductsDTO;