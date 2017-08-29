import {Component, Input, OnInit} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9" *ngFor="let category of gradebook.categories">
            <app-category [category]="category"></app-category>
            <br>
        </div>
    `,

})
export class GradebookComponent implements OnInit {
    @Input() gradebook: Gradebook;

    ngOnInit(): void {
        var id;
        this._route.params.subscribe(params => {
            id = params['id'];
        });

        this._gradebookService.getGradebookById(id)
            .subscribe(
                (gradebook: Gradebook) => {
                    this.gradebook = gradebook;
                }
            );
    }

    constructor(private _gradebookService: GradebookService, private _route: ActivatedRoute) {
    }


}
