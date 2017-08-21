import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "./category.model";
import {InputRejectingFunctions} from "../editable/editable.component";

@Component({
    selector: 'app-category',
    template: `
        <div class="col-12">
            <div class="row">
                <div class="col-5">{{name}}</div>
                <div class="col-3 offset-2">
                    <div class="row">
                        <div class="col-6 text-right"> Worth:</div>
                        <div class="col-6">
                            <app-editable [maxLength]="3" [(value)]="category.weight"
                                          [inputRejectingValidators]="weightInputRejectingValidators"></app-editable>
                            %
                        </div>
                    </div>
                </div>
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

    weightInputRejectingValidators = [{fn: InputRejectingFunctions.numeric, feedback: "Must be numeric."},
        {fn: InputRejectingFunctions.nonempty, feedback: "Cannot be empty."},
        {fn: InputRejectingFunctions.max(100), feedback: "Cannot exceed 100%."},
        {fn: InputRejectingFunctions.min(0), feedback: "Cannot be negative."}];

}
