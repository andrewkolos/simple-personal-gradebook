import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Assignment} from "./assignment/assignment.model";
import {Category} from "./category.model";

@Component({
    selector: 'app-category',
    template: `
        <div class="row" *ngFor="let assignment of category.assignments">
            <div class="col-xs-6">{{name}}</div>
            <div class="col-xs-3 offset-xs-2">Worth: </div>
            <div class="col-xs-2"></div>
            <br />
            <app-assignment [assignment]="assignment"></app-assignment>
        </div>
    `
})
export class CategoryComponent {

    @Input() category: Category;

}
