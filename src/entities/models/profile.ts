export class Profile {   
    email: string
    username: string
    password: string
    cnpj: string
    name: string
    trading_name: string
    type: string
    uf: string
    city: string
    phone: string | null
    image_url: string | null

    constructor( email: string, password: string, username: string, name: string, cnpj: string, trading_name: string, type: string, image_url: string, uf: string, city: string, phone: string| null) {
        this.email = email
        this.password = password
        this.username = username
        this.name = name
        this.cnpj = cnpj
        this.trading_name = trading_name
        this.type = type
        this.image_url = image_url
        this.uf = uf
        this.city = city
        this.phone = phone
    }
}