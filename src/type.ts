export interface Court {
  _id?:string,
  name: string,
  type: {
    _id:string,
    name: string,
  },
  address: string,
  workingHours: {
    startTime: string,
    endTime: string,
  }
  price: string,
  picture:string | File | null
}

export interface CourtType {
  _id: string,
  name: string,
}