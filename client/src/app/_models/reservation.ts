export interface Reservation {
    reservationId?:number
    flightId:number
    userId:number
    reservedSeats: number
    status: boolean
  }