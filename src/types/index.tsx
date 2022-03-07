export interface ILoginResponse {
  token: string;
}
export interface ILoginRequest {
  email: string;
}
export interface IUserData extends ILoginRequest, ILoginResponse {}
export interface ICompanyDataPayload {
  payload: {
    page: number;
    pages: number;
    companies: ICompanyData[];
  };
}
export interface ICompanyData {
  address: string;
  company_name: string;
  country: string;
  createdAt: string;
  email: string;
  net_worth: number;
  number_of_staff: number;
  worth_currency: string;
  _id: string;
}
