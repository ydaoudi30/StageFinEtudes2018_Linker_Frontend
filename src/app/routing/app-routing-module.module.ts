import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { GuestGuardService } from '../services/guest-guard.service';
import { MasterGuardService } from '../services/master-guard.service';
import { CustomerGuardService } from '../services/customer-guard.service';
import { AppComponent } from '../app.component';
import { ProductComponent } from '../components/product/product.component';
import { EntrepriseComponent } from '../components/entreprise/entreprise.component';
import { ArticleComponent } from '../components/article/article.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { CartComponent } from '../components/cart/cart.component';
import { QuoteManagerComponent } from '../components/quote-manager/quote-manager.component';
import { QuotationListComponent } from '../components/quotation-list/quotation-list.component';
import { QuotationDetailComponent } from '../components/quotation-detail/quotation-detail.component';
import { ProductSearchresultComponent } from '../components/product-searchresult/product-searchresult.component';
import { GUARDS } from '../models/guards';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SignUpCommercialComponent } from '../components/sign-up-commercial/sign-up-commercial.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'article',
        component: ArticleComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }        
    },
    {
        path: 'entreprise',
        component: EntrepriseComponent,

    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'product-list/:refCategory',
        component: ProductListComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'product-detail',
        component: ProductDetailComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'product-searchresult/:keyword',
        component: ProductSearchresultComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard,
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'quote-manager',
        component: QuoteManagerComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'quotation-list',
        component: QuotationListComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'quotation-detail/:reference',
        component: QuotationDetailComponent,
        canActivate : [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.CustomerGuard
                ]
            }
        }
    },
    {
        path: 'sign-up/:fromCart',
        component: SignUpComponent,
        canActivate: [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard
                ]
            }
        }
    },
    {
        path: 'sign-up-commercial',
        component: SignUpCommercialComponent,
        canActivate: [MasterGuardService],
        data: {
            trigger: {
                operator: "OR",
                guards: [
                    GUARDS.GuestGuard
                ]
            }
        }
    }

];

@NgModule( {
    imports: [
        CommonModule, RouterModule.forRoot( routes )
    ],
    declarations: [],
    exports: [RouterModule],
    providers: []
} )
export class AppRoutingModuleModule { }
