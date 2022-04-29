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

export interface ISortMethods {
  id: string,
  sortMethod: string
}

export interface ISortValues {
  sortMethod: string,
  sortType: string,
  dateWith: string,
  dateFor: string
}