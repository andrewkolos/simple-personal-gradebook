import {Component, Input} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9" *ngFor="let category of gradebook.categories">
            <app-category [category]="category"></app-category>
            <br>
        </div>
    `,

})
export class GradebookComponent {

    constructor(private _gradebookService: GradebookService) {
    }

    @Input() gradebook: Gradebook = this._gradebookService.getGradebooks()[0];

}
