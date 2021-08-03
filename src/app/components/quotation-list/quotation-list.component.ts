import { Component, OnInit, OnChanges, SimpleChange, Input, ViewChild } from '@angular/core';
import { QuotationService } from '../../services/quotation.service';
import { Quotation } from '../../models/quotation';
import { Router } from '@angular/router';
import { DropDown } from '../../models/dropDown';
import { DropDownService } from '../../services/drop-down.service';
import { Table } from 'primeng/components/table/table';
import {TranslateService} from '@ngx-translate/core';

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { filter } from 'rxjs/operator/filter';


@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent implements OnInit {

  loading: boolean;
  quotations : Quotation[];

  cols: any[];
	statusList: any[];
	delays : DropDown[];
  status : DropDown[] = [];
  
  @ViewChild('dt')
	private tableRef: Table;

	rangeValues: number[] = [0,10000];

  constructor(private quotationService: QuotationService, private dropDownService: DropDownService, private translate: TranslateService,  private router: Router) { }

  ngOnInit() {

    let quotationListObservable = this.quotationService.getQuotations();

    if(quotationListObservable){

   

    this.cols = [
			{ field: 'reference', header: 'REF_KEY' },
			{ field: 'customer', header: 'CUSTOM_NAME' },
			{ field: 'nbArticle', header: 'NB_ARTICLE' },
			{ field: 'qteTotal', header: 'QTE' },
			{ field: 'dateRequest', header: 'DATE_REQUEST' },
			{ field: 'discount', header: 'DISCOUNT' },
			{ field: 'tttc', header: 'TTTC' },
			{ field: 'delay', header: 'DELAY' },
			{ field: 'status', header: 'STATUS' },
    ];
    

    quotationListObservable.subscribe(
      (quotes : Quotation[]) => {
        this.quotations = quotes;
        this.loading = false;
        console.log(this.quotations);
      },
      err => console.log(err),
      () => console.log('Request Complete'));


      this.dropDownService.status().subscribe(
        (del : DropDown[])  => {
          del.forEach(element => {
            let labelOfKey : string = this.translate.instant(element.label);
            this.status.push({label : labelOfKey, value : element.label });
          });
          
          this.loading = false;
          console.log(this.status);
        },
      );

    }

  }

  addCustomFilter(){
		this.tableRef.filterConstraints['between'] = (value, filter: any): boolean => {
			if (filter === undefined || filter === null) {
				return true;
			}
			if (value === undefined || value === null) {
				return false;
			}
			return value < filter[1] && value > filter[0];
		};
  }
  
  onYearChange(event, dt) {
		this.addCustomFilter();
		dt.filter(event.values, 'tttc', 'between');
  }
  
  detail() {
		this.quotationService.getQuotations().subscribe(
			response => {
				if (response) {
					this.router.navigate(['/quotation-detail'], { queryParams: filter, skipLocationChange: true });
				}
			},
			err => console.log(err),
			() => console.log('Request Complete'));
	}

}
