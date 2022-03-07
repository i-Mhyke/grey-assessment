import { ICompanyDataPayload, ILoginRequest, ILoginResponse, IUserData } from "../types";
import api from './api'

class RequestServices {
    userData = localStorage.getItem('app_user');

    setUserInLocalStorage(data: IUserData) {
        localStorage.setItem('app_user', JSON.stringify(data))
    }

    get getUserFromLocalStorage(): IUserData {
        return JSON.parse(this.userData!)
    }

    login(data: ILoginRequest){
        return api.post<ILoginResponse>('/auth/login', data);
    }
    logout() {
        localStorage.removeItem('app_user');
    }

    getPaginatedCompanies1(page: number) {
        return api.get<ICompanyDataPayload>(`/company?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${this.getUserFromLocalStorage.token}`
            }
        })
    }

    getPaginatedCompanies({companyName, page}: {companyName?: string, page: number}){
        const options = {
            headers: {
                'Authorization': `Bearer ${this.getUserFromLocalStorage.token}`
            }
        }
        if(companyName){
            return api.get<ICompanyDataPayload>(`/company/${companyName}?page=${page}`, options)
        }
         return api.get<ICompanyDataPayload>(`/company?page=${page}`, options)
    }
}
export default new RequestServices();