import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import { ActivatedRoute } from '@angular/router';
import { SearchProductsService } from '../../services/search-products.service';
import { ProductCard } from '../../models/productcard';
import { SearchResult } from '../../models/searchresult';
import { ProductFilters } from '../../models/productfilters';
import { FilterRange } from '../../models/filterrange';
import { FilterDropDown } from '../../models/filterdropdown';
import { MinMax } from '../../models/minmax';
import { DropDown } from '../../models/dropDown';
import { UnitMinMax } from '../../models/unitMinMax';
import { ObjectRangeToSend } from '../../models/objectRangeToSend';
import { LabelDropDown } from '../../models/labelDropDown';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  refCat: string;
  searchResult: SearchResult;
  rangeFilters: FilterRange[];
	dropdownFilters: FilterDropDown[];
	displayeDropDown: DropDown[] = [];
	selectedFilter: DropDown;
  oldSelectedDropDown: string;
  options: LabelDropDown[] = [];
  
  /*Variables filtres*/

	rangeValues: number[][] = [];
	sliderObject: UnitMinMax[] = [];
	rangetoSend: FilterRange;
	dropdownToSend: string;

  constructor(private router: Router, private route: ActivatedRoute, private productsbyrefservice: SearchProductsService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.refCat = params.get('refCategory')
    });

    console.log(this.refCat);

    this.productsbyrefservice.getProductsByCategory(this.refCat).subscribe(
      (a : SearchResult) =>{
        this.searchResult = a;
        this.rangeFilters = this.searchResult.filterlist.rangevalues;
			  this.dropdownFilters = this.searchResult.filterlist.dropdownvalues;
        console.log(this.searchResult);

        for (let i of this.dropdownFilters) {
          for (let j of i.textOnlyList) {
            this.displayeDropDown.push(new DropDown(j, j));
            
          }
          this.options.push(new LabelDropDown(i.label,this.displayeDropDown));
          this.displayeDropDown = [];
        }

        for (let i of this.rangeFilters) {
          for (let j of i.value) {
            this.sliderObject.push(new UnitMinMax(j.unit, [+j.min, +j.max], +j.min, +j.max))
          }
        }
        console.log(this.sliderObject);
      }
    )
  }

  DropDownValue(selected: DropDown) {
		if (selected) {
			this.selectedFilter = new DropDown(selected.label, selected.value);
		}

	}

	sendRange(label: string, min: number, max: number, unit: string) {
		let minmax = [new MinMax(unit, String(min), String(max))];
		this.rangetoSend = new FilterRange(label, minmax);

		this.route.paramMap.subscribe(params => {
			this.refCat = params.get('refCategory');
			this.productsbyrefservice.getProductsByRangeFilterCat(this.refCat,label, min, max, unit).subscribe(
				(a: SearchResult) => {
					this.searchResult = a;
					this.rangeFilters = this.searchResult.filterlist.rangevalues;
					this.dropdownFilters = this.searchResult.filterlist.dropdownvalues;
					console.log(this.searchResult);
					this.displayeDropDown = [];

					
					this.displayeDropDown = [];
					for (let i of this.dropdownFilters) {
						for (let j of i.textOnlyList) {
							this.displayeDropDown.push(new DropDown(j, j));
						}
					}
					this.sliderObject = [];
					for (let i of this.rangeFilters) {
						for (let j of i.value) {
							if(+j.min != +j.max){
							this.sliderObject.push(new UnitMinMax(j.unit, [+j.min, +j.max], +j.min, +j.max))
							}
						}
					}
					console.log(this.sliderObject);


				}
			);
		});



		console.log('Product list received');
	}

	sendDropDown(label: string) {
		if (this.selectedFilter) {
				this.dropdownToSend = this.selectedFilter.value;
				console.log(this.dropdownToSend);

				this.route.paramMap.subscribe(params => {
					this.refCat = params.get('refCategory');
					this.productsbyrefservice.getProductByDropDownFilterCat(this.refCat, label, this.dropdownToSend).subscribe(
						(a: SearchResult) => {
							this.searchResult = a;
							this.rangeFilters = this.searchResult.filterlist.rangevalues;
							this.dropdownFilters = this.searchResult.filterlist.dropdownvalues;
							console.log(this.searchResult);
							this.displayeDropDown = [];
							for (let i of this.dropdownFilters) {
								for (let j of i.textOnlyList) {
									this.displayeDropDown.push(new DropDown(j, j));
								}
							}
							this.sliderObject = [];
							for (let i of this.rangeFilters) {
								for (let j of i.value) {
									this.sliderObject.push(new UnitMinMax(j.unit, [+j.min, +j.max], +j.min, +j.max))
								}
							}
							console.log(this.sliderObject);


						}
					);
				});
			}
		}

}
