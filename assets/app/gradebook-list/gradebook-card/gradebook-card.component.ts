import {Component, Input, OnInit} from "@angular/core";
import {Gradebook} from "../../gradebook/gradebook.model";
import {GradebookService} from "../../gradebook/gradebook.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GRADEBOOK_NAME_PATTERN} from "../../general/patterns";

@Component({
    selector: 'app-gradebook-card',
    template: `

        <div class="card-body">
            <h4 class="card-title"><a [routerLink]="['/gradebook', gradebook.id]">{{gradebook.name}}</a></h4>

            <p class="card-text">
                Grade: {{getGrade()}}
                <span>{{gradebook.categories.length}} categories</span>
                <span>{{countAssignments()}} assignments</span>
            </p>
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="moreActionsDropdown"
                        data-toggle="dropdown">
                    More actions
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" data-toggle="modal"
                            [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'changeNameModal'">
                        Change name
                    </button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item text-danger" data-toggle="modal"
                            [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'deleteModal'">Delete
                    </button>
                </div>
            </div>
        </div>

        <!-- modals -->
        <div class="modal fade" [attr.id]="uniqueAndIdAttrFriendlyName(gradebook.name) + 'changeNameModal'"
             tabindex="-1" role="dialog"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form class="modal-content" [formGroup]="renameGradebookForm" (ngSubmit)="updateName()">
                    <div class="modal-header">
                        <h5 class="modal-title">Change gradebook name</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input class="form-control" (click)="$event.target.select()" formControlName="name">
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" type="button" type="submit" data-dismiss="modal"
                                [disabled]="!renameGradebookForm.valid">Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal fade" [attr.id]="uniqueAndIdAttrFriendlyName(gradebook.name) + 'deleteModal'" tabindex="-1"
             role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete gradebook</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete the <strong>{{gradebook.name}}</strong> gradebook? This cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="deleteGradebook()">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `, styles: [
        'p span {display: block}'
    ]
})
export class GradebookCardComponent implements OnInit {

    @Input() gradebook: Gradebook;

    renameGradebookForm: FormGroup;

    randomString: string = Math.random().toString(36).substring(8);

    constructor(private _gradebookService: GradebookService) {
    }

    ngOnInit() {
        this.renameGradebookForm = new FormGroup({
            name: new FormControl(this.gradebook.name, [Validators.required, Validators.pattern(GRADEBOOK_NAME_PATTERN)])
        });
    }

    updateName() {
        this.gradebook.name = this.renameGradebookForm.value.name;
        this._gradebookService.updateGradebook(this.gradebook).subscribe(result => console.log(result));
    }

    deleteGradebook() {
        this._gradebookService.deleteGradebook(this.gradebook).subscribe(result => console.log(result));
    }

    /**
     * Removes all non-alphanumeric characters from a string and additionally appends a short, (sufficiently) random
     * string to it. Returns the generated string.
     * This function is used to generate unique IDs for modals.
     * @param {string} text
     * @returns {string}
     */
    uniqueAndIdAttrFriendlyName(text: string): string {
        return text.replace(/[^0-9a-zA-Z]/gi, "")
            + "-" + this.randomString + "-";
    }

    getGrade(): string {
        if (isNaN(this.gradebook.grade))
            return "N/A"
        else
            return (this.gradebook.grade * 100).toFixed(2) + "%";
    }

    countAssignments(): number {
        let count = 0;
        this.gradebook.categories.forEach(c => count += c.assignments.length);
        return count;
    }
}