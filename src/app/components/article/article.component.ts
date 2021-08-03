import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';



@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
  })
export class ArticleComponent implements OnInit {
    articles: Article[];

    constructor( private articleService: ArticleService ) {
    }

    ngOnInit() {
        this.articleService.getAllArticles().subscribe( articles => {
            this.articles = articles;
        } );;

    }

}
