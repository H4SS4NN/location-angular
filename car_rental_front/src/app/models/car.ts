export class Car {
    id?: number;
    brand : string;
    model : string;
    year : number   ;
    photo? : File | null;
    likes : number;
    price : number;
    description : string;
    available : boolean;
    reservedFrom : Date;
    reservedTo : Date;


    constructor(
        brand:string = '',
        model:string = '',
        year : number = 0,
        photo : File ,
        price : number =0 ,
        description : string = '',
        available : boolean = true,
        reservedFrom : Date = new Date(),
        reservedTo : Date =  new Date(),
        likes : number = 0
        )
        {
            this.brand = brand;
            this.model = model;
            this.year = year;
            this.photo = photo; 
            this.price = price;
            this.description = description;
            this.available = available;
            this.reservedFrom = reservedFrom;
            this.reservedTo = reservedTo;
            this.likes = likes;
    }
}