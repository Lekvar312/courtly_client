export interface Court {
  _id?:string,
  name: string,
  type: CourtType
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