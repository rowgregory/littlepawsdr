export interface IAddress {
  _id?: string;
  name?: string;
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
  country?: string;
}
