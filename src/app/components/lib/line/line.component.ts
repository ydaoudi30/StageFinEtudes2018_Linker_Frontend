import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-line',
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

	@Input()
	uiWidth:number = 12;
		
	constructor() { }

	ngOnInit() {
	}

}
