import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FormsModule} from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';



import { AppComponent } from './app.component';
import {ArticleService} from './services/article.service';
import {CategoryService} from './services/category.service';
import { QuotationService } from './services/quotation.service';

import { ArticleComponent } from './components/article/article.component';
import { ProductComponent } from './components/product/product.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModuleModule } from './routing/app-routing-module.module';
import { AuthModule } from './authenticationJwt/auth.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { MenuModule } from 'primeng/menu';


import { TableModule } from 'primeng/table';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {CardModule} from 'primeng/card';
import {MenuItem} from 'primeng/api';                 //api
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import { DataGridModule } from 'primeng/datagrid';
import {PanelModule} from 'primeng/panel';
import {CarouselModule} from 'primeng/carousel';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LoginComponent } from './components/login/login.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeNouveauprodComponent } from './components/home-nouveauprod/home-nouveauprod.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import {ListboxModule} from 'primeng/listbox';

import {FieldsetModule} from 'primeng/fieldset';
import {GrowlModule} from 'primeng/growl';
import {DialogModule} from 'primeng/dialog';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';


import {InputTextModule} from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import { LoginService } from './services/login.service';
import { GuestService } from './services/guest.service';
import { QuotationDetailService } from './services/quotation-detail.service';
import { ProductSearchresultComponent } from './components/product-searchresult/product-searchresult.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SearchProductsService } from './services/search-products.service';
import { QuoteManagerService } from './services/quote-manager.service';
import { CartService } from './services/cart.service';
import { DropDownService } from './services/drop-down.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './redux/reducers';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

//required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "assets/i18n/", "-lang.json");
}

/*import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';*/
import { LineComponent } from './components/lib/line/line.component';
import { QuoteManagerComponent } from './components/quote-manager/quote-manager.component';
import { FormInputComponent } from './components/lib/form-input/form-input.component';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';
import { QuotationDetailComponent } from './components/quotation-detail/quotation-detail.component';
import { GalleriaModule } from 'primeng/galleria';
import { ShortProfilComponent } from './components/short-profil/short-profil.component';
import { CustomerGuardService } from './services/customer-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { MasterGuardService } from './services/master-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {PasswordModule} from 'primeng/password';
import { AccountService } from './services/account.service';
import { SignUpCommercialComponent } from './components/sign-up-commercial/sign-up-commercial.component';
import { MergeDialogComponent } from './components/merge-dialog/merge-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ProductComponent,
    EntrepriseComponent,
    LoginComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeCategoriesComponent,
    HomeNouveauprodComponent,
    HomeSliderComponent,
    HomeComponent,
    ProductCardComponent,
    SearchBarComponent,
    ProductListComponent,
    ProductSearchresultComponent,
    ProductPageComponent,
    ProductDetailComponent,
    CartComponent,
    ProductSearchresultComponent,
    LineComponent,
    QuoteManagerComponent,
    FormInputComponent,
    QuotationListComponent,
    QuotationDetailComponent,
    ShortProfilComponent,
    SignUpComponent,
    SignUpCommercialComponent,
    MergeDialogComponent
  ],
  imports: [
    ListboxModule,
    TableModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    FieldsetModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    DialogModule,
    HttpModule,
    CheckboxModule,
    RouterModule,
    AppRoutingModuleModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
    AuthModule,
    GrowlModule,
    InputTextModule,
    MenuModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    SliderModule,
    DataGridModule,
    ConfirmDialogModule,
    ButtonModule,
    CarouselModule,
    SliderModule,
    GalleriaModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    /*NgxDynamicTemplateModule.forRoot(),*/
    PasswordModule
  ],
  providers: [ArticleService,
    CategoryService, 
    LoginService,
    SearchProductsService,
    QuoteManagerService,
    CustomerGuardService,
    GuestGuardService,
    MasterGuardService,
    CartService,
    DropDownService,
    MessageService,
    ConfirmationService,
    QuotationService,
    QuotationDetailService,
    GuestService,
    AccountService,
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { 
    
}

