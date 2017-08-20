import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Assignment} from "./assignment/assignment.model";
import {Category} from "./category.model";

@Component({
    selector: 'app-category',
    template: `
        <div class="col-12">
            <div class="row">
                <div class="col-5">{{name}}</div>
                <div class="col-3 offset-2">Worth:</div>
                <div class="col-2"></div>
            </div>
        </div>
        <br/>
        <div class="col-12" *ngFor="let assignment of category.assignments">
            <app-assignment class="row"
                            [assignment]="assignment"></app-assignment>
        </div>
    `
})
export class CategoryComponent {

    @Input() category: Category;

}
