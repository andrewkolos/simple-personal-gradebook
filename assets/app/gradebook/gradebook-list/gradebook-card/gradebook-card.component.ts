import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Gradebook} from "../../gradebook.model";
import {GradebookService} from "../../gradebook.service";
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";
import {GRADEBOOK_NAME_PATTERN} from "../../../general/patterns";
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-gradebook-card',
    template: `

        <div class="card-body">
            <h4 class="card-title"><a [routerLink]="['/gradebooks', gradebook.id]">{{gradebook.name}}</a></h4>

            <p class="card-text">
                Grade: {{getGrade()}}
                <span>{{gradebook.categories.length}} categories</span>
                <span>{{countAssignments()}} assignments</span>
            </p>
            <div class="d-none d-lg-block">
                <button class="btn btn-outline-primary" data-toggle="modal"
                        [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'changeNameModal'">
                    Change name
                </button>
                <button class="btn btn-outline-info" (click)="makeClone()">
                    Make copy
                </button>
                <button class="btn btn-outline-danger" data-toggle="modal"
                        [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'deleteModal'">Delete
                </button>
            </div>
            <div class="d-lg-none">
                <button class="btn-sm btn-outline-primary" data-toggle="modal"
                        [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'changeNameModal'">
                    Change name
                </button>
                <button class="btn-sm btn-outline-info" (click)="makeClone()">
                    Make copy
                </button>
                <button class="btn-sm btn-outline-danger" data-toggle="modal"
                        [attr.data-target]="'#'+ uniqueAndIdAttrFriendlyName(gradebook.name) + 'deleteModal'">Delete
                </button>
            </div>
        </div>

        <!-- modals -->
        <div class="modal fade" [attr.id]="uniqueAndIdAttrFriendlyName(gradebook.name) + 'changeNameModal'"
             tabindex="-1" role="dialog"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form novalidate class="modal-content" [formGroup]="renameGradebookForm">
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
                        <button class="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" type="submit" data-dismiss="modal"
                                [disabled]="!renameGradebookForm.valid" (click)="updateName()">Save Changes
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
                        <p>Are you sure you want to delete the <strong>{{gradebook.name}}</strong> gradebook? This
                            cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="deleteGradebook()">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `, styles: [
        'p span {display: block}',
    ]
})
export class GradebookCardComponent implements OnInit {

    @Input() gradebook: Gradebook;

    @Output() change = new EventEmitter<Gradebook>();
    @Output() remove = new EventEmitter<Gradebook>();
    @Output() clone = new EventEmitter<Gradebook>();

    renameGradebookForm: FormGroup;

    randomString: string = Math.random().toString(36).substring(8);

    ngOnInit() {
        this.renameGradebookForm = new FormGroup({
            name: new FormControl(this.gradebook.name, [Validators.required, Validators.pattern(GRADEBOOK_NAME_PATTERN)])
        });
    }

    updateName() {
        if (this.renameGradebookForm.valid) {
            this.gradebook.name = this.renameGradebookForm.value.name;
            this.change.emit(this.gradebook);
        }
    }

    deleteGradebook() {
        this.remove.emit(this.gradebook);
    }

    /**
     * Removes all non-alphanumeric characters from a string and additionally appends a short, (sufficiently) random
     * string to it. Returns the generated string.
     * This function is used to generate unique IDs for modals.
     * @param {string} text
     * @returns {string}
     */
    uniqueAndIdAttrFriendlyName(text: string): string {
        return text.replace(/[^0-9a-zA-Z]/gi, "").substr(0, 10)
            + "-" + this.randomString + "-";
    }

    getGrade(): string {
        if (isNaN(this.gradebook.grade))
            return "N/A";
        else
            return (this.gradebook.grade * 100).toFixed(2) + "%";
    }

    countAssignments(): number {
        let count = 0;
        this.gradebook.categories.forEach(c => count += c.assignments.length);
        return count;
    }

    makeClone() {
        this.clone.emit(this.gradebook);
    }
}