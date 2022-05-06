export interface IDoctorsData {
  id: string,
  fullname: string
}

export interface IOrdersData {
  id: string,
  patient: string,
  ordersdate: string,
  doctorId: string,
  complaints: string,
  doctor: {
    fullname: string
  }
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