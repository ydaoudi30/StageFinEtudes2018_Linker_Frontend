import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

  category: Category[];
  catalogPart1: Category[];
  catalogPart2: Category[];
  loading: boolean;


  constructor(private categoryService: CategoryService , private router: Router) {

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (cat: Category[]) => {
        this.category = cat;
        this.loading = false;
        this.catalogPart1 = [];
        this.catalogPart2 = [];

        if (this.category.length % 2 == 1) {
          for (let i = 0; i < Math.floor(this.category.length / 2)+1; i++) {
            this.catalogPart1.push(this.category[i]);
          }

          for (let i = Math.floor(this.category.length / 2) + 1; i < this.category.length; i++) {
            this.catalogPart2.push(this.category[i]);
          }

        }

        else {
          for (let i = 0; i < Math.floor(this.category.length / 2); i++) {
            this.catalogPart1.push(this.category[i]);
          }

          for (let i = Math.floor(this.category.length / 2); i < this.category.length; i++) {
            this.catalogPart2.push(this.category[i]);
          }
        }

        console.log(this.catalogPart1);
        console.log(this.catalogPart2);

      },


      err => console.log(err),
      () => console.log(this.category));

  }

  detail(){
    this.categoryService.getCategories().subscribe(
      response => {
        if(response){
          this.router.navigate(['/product-list'], { queryParams: filter, skipLocationChange: true});
        }
      },
      err => console.log(err),
      () => console.log('Request Complete'));
  }

}

