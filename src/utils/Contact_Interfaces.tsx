export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  emails: string[];
}

// export interface IContactResponse {
//   contacts: IContact[];
//   page: number;
//   itemsPerPage: number;
//   totalItems: number;
// }

export interface IContactInfo {
  contacts: IContact[];
  page: number;
  itemsPerPage: number;
  totalItems: number;
}
