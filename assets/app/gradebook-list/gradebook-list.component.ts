import {Component, OnInit} from "@angular/core";
import {Gradebook} from "../gradebook/gradebook.model";
import {GradebookService} from "../gradebook/gradebook.service";

@Component({
    selector: 'app-gradebook-list',
    template: `
        <div class="card-deck">
            <!-- May need to add card class and remove it from gradebook card component -->
            <app-gradebook-card *ngFor="let gradebook of gradebooks" [gradebook]="gradebook"></app-gradebook-card>
        </div>
    `
})
export class GradebookListComponent implements OnInit {

    constructor(private gradebookService: GradebookService) {
    }

    ngOnInit() {
        this.gradebookService.getGradebooks().subscribe(
            (gradebooks: Gradebook[]) => {
                console.log(gradebooks);
                this.gradebooks = gradebooks;
            }
        );
    }

    gradebooks: Gradebook[];
}