import {Component, Input} from "@angular/core";
import {Gradebook} from "../../gradebook/gradebook.model";

@Component({
    selector: 'app-gradebook-card',
    template: `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"><a>{{gradebook.name}}</a></h4>

                <p class="card-text">Hello, I am some placeholder text.</p>
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="moreActionsDropdown"
                            data-toggle="dropdown">
                        More actions
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Change name</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="#">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class GradebookCardComponent {
    @Input() gradebook: Gradebook;
}