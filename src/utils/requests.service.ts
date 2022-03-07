import { ICompanyDataPayload, ILoginRequest, ILoginResponse, IUserData } from "../types";
import api from './api'

class RequestServices {
    user:IUserData = JSON.parse(localStorage.getItem('app_user')!);

    setUserInLocalStorage(data: IUserData) {
        localStorage.setItem('app_user', JSON.stringify(data))
        this.user = data;
    }

    login(data: ILoginRequest){
        return api.post<ILoginResponse>('/auth/login', data);
    }
    logout() {
        localStorage.removeItem('app_user');
    }

    getPaginatedCompanies({companyName, page}: {companyName?: string, page: number}){
        const options = {
            headers: {
                'Authorization': `Bearer ${this.user.token}`
            }
        }
        if(companyName){
            return api.get<ICompanyDataPayload>(`/company/${companyName}?page=${page}`, options)
        }
         return api.get<ICompanyDataPayload>(`/company?page=${page}`, options)
    }
}
export default new RequestServices();