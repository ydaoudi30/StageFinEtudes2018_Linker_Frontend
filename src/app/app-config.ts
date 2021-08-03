import { environment } from '../environments/environment';

export class AppConfig {
    public urlBack: string = environment.urlBack + "/cust";
    public loginUrl: string = environment.urlBack + "/login";
    public accountUrl: string = environment.urlBack + "/account";
    public commonUrlBack: string = environment.urlBack + "/serve";
    public userRequiredProfile: string[] = ['CUSTOMER', 'GUEST'];
    public commercialUrl: string = environment.commercialUrl ;
}