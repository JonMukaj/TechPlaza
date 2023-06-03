class ShippingAddressDTO{
    constructor(ship)
    {
        this.id=ship.id,
        this.firstName=ship.firstName,
        this.lastName=ship.lastName,
        this.email=ship.email,
        this.phoneNumber=ship.phoneNumber,
        this.address=ship.address,
        this.zipcode=ship.zipcode
    }
}
module.exports=ShippingAddressDTO