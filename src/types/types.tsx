export interface IDoctorsData {
  id: number,
  fullname: string
}

export interface IOrdersData {
  id: number,
  fullname: string,
  ordersdate: string,
  doctorid: number,
  complaints: string
}