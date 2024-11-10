
export interface IEvents {
     eventId: number,
     name: string,
     description: string,
     date: string,
     price: number,
     currency: string,
     locationId: number,
     categoryId:number
}

export interface IEventsCreate {
     name: string,
     description: string,
     date: string,
     price: number,
     currency: string,
     imagenURl: string,
}