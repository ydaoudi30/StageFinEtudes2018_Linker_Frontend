import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuoteManagerService } from '../../services/quote-manager.service';
import { QuotationDetail } from '../../models/quotationDetail';
import { DropDown } from '../../models/dropDown';
import { DropDownService } from '../../services/drop-down.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quote-manager',
  templateUrl: './quote-manager.component.html',
  styleUrls: ['./quote-manager.component.css']
})
export class QuoteManagerComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  quoteList: QuotationDetail[];
  quotationRequest: QuotationDetail;
  commercials: DropDown[];
  selectedCommercial: DropDown;
  com: string;

  constructor(private quoteManagerService: QuoteManagerService, private dropDownService: DropDownService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) { }

  getFormKey(brand: string, model: string) {
    return brand + "_" + model;
  }

  ngOnInit() {

    let quoteManagerObservable = this.quoteManagerService.getQuotations();
    if (quoteManagerObservable) {



      quoteManagerObservable.subscribe(
        (list: QuotationDetail[]) => {
          this.quoteList = list;

          const formGroup = {};
          for (let a of this.quoteList) {
            for (let b of a.quoteElementList) {
              let key = b.product.brand + "_" + b.product.model;
              formGroup[key] = new FormGroup({
                quantity: new FormControl(1, [Validators.required,
                Validators.min(1)])
              });
            }
          }
          this.form = new FormGroup(formGroup);
          console.log(this.form);

          this.loading = false;
          console.log(this.quoteList);

          this.dropDownService.commercialsQuote().subscribe(
            (coms: DropDown[]) => {
              this.commercials = coms;

              if (this.commercials[0] != undefined) {
                this.selectedCommercial = new DropDown(this.commercials[0].label, this.commercials[0].value);
                this.com = 'test testo';
              }

              this.loading = false;
              console.log(this.commercials);
            },
          );

        },
        err => console.log(err),
        () => console.log('Request Complete'));

    }

    

  }

  quantityOf(productKey) {
    return this.form.get(productKey + '.quantity');
  }

  dropDownValue(choosen: DropDown) {
    if (choosen) {
      this.com = choosen.value;
    }

  }


  onSubmit() {
    for (let a of this.quoteList) {
      if (this.com == a.commercial) {
        for (let b of a.quoteElementList) {
          let key = this.getFormKey(b.product.brand, b.product.model);
          if (this.form.value[key].quantity > 0) {
            b.qteAsked = this.form.value[key].quantity;
            this.quotationRequest = a;
          }
          else if (this.form.value[key].quantity < 0) {
            this.quotationRequest = null;
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "La quantité ne peut étre negative" });
            break;
          }
          else if (this.form.value[key].quantity == 0 || this.form.value[key].quantity == null) {
            this.quotationRequest = null;
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "La quantité ne peut étre nulle" });
            break;
          }
          else {
            this.quotationRequest = null;
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "La quantité n'est pas valide" });
            break;
          }
        }
      }
    }

    if (this.quotationRequest) {
      this.quoteManagerService.getNewQuote(this.quotationRequest).subscribe(
        (test: number) => {
          console.log(test);
          this.quoteManagerService.getQuotations().subscribe(
            (list: QuotationDetail[]) => {
              this.quoteList = list;
              this.dropDownService.commercialsQuote().subscribe(
                (coms: DropDown[]) => {
                  this.commercials = coms;
                  this.com = '';
                  this.loading = false;
                  console.log(this.commercials);
                },
              );
            },
            err => console.log(err),
            () => console.log('Request Complete'));
          if (test == 1) {
            this.messageService.add({ severity: 'success', summary: 'Info', detail: "Votre demande de devis à bien été envoyé à l'exposant" });
          }
        },
        err => console.log(err),
        () => console.log('Request Complete'));

    }

    console.log(this.quotationRequest);
    this.router.navigate(['/quotation-list']); 

  }

  remove(model: string, brand: string, quoteRef: string, commercial: string) {
    this.quoteManagerService.removeItem(model, brand, quoteRef, commercial).subscribe(
      (list: QuotationDetail[]) => {
        this.quoteList = list;
        this.messageService.add({ severity: 'success', summary: 'Info', detail: "L'article à bien été supprimé du devis" });
        this.dropDownService.commercialsQuote().subscribe(
          (coms: DropDown[]) => {
            this.commercials = coms;
            this.com = null;
            this.loading = false;
            console.log(this.commercials);
          },
        );
      },
      err => console.log(err),
      () => console.log('Request Complete'));
  }

}
