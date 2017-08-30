import {Component, Input} from "@angular/core";
import {Gradebook} from "../../gradebook/gradebook.model";
import {GradebookService} from "../../gradebook/gradebook.service";

@Component({
    selector: 'app-gradebook-card',
    template: `

        <div class="card-body">
            <h4 class="card-title"><a [routerLink]="['/gradebook', gradebook.id]">{{gradebook.name}}</a></h4>

            <p class="card-text">Hello, I am some placeholder text.</p>
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
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Change gradebook name</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input #nameInput class="form-control" (click)="$event.target.select()"
                               [value]="gradebook.name">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"
                                (click)="updateName(nameInput.value)">Save Changes
                        </button>
                    </div>
                </div>
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
    `
})
export class GradebookCardComponent {

    @Input() gradebook: Gradebook;

    randomString: string = Math.random().toString(36).substring(8);

    constructor(private _gradebookService: GradebookService) {
    }

    updateName(name: string) {
        this.gradebook.name = name;
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
}