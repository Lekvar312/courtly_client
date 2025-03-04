export interface Court {
  _id?:string,
  name: string,
  type: string,
  address: string,
  workingHours: {
    startTime: string,
    endTime: string,
  }
  price: number,
  picture:string
}