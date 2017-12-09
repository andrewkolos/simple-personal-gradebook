import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CATEGORY_NAME_PATTERN} from "../general/patterns";
import {Category} from "./category/category.model";
import {numericValidator} from "../general/custom-validators";

@Component({
    selector: 'app-gradebook-footer',
    template: `
        <h4 class="mb-3">Add a new category</h4>
        <form class="form-inline row" id="addCategoryForm" [formGroup]="addCategoryForm" (ngSubmit)="onAddCategory()"
              novalidate>
            <div class="col-5 input-group">
                <label class="col-form-label d-none d-sm-block mr-2" for="category-name">Name</label>
                <input #nameInput type="text" placeholder="New category name" id="category-name" class="form-control"
                       formControlName="name">
            </div>

            <div class="col-4 col-md-5 px-0 px-sm-3 input-group ">
                <label class="col-form-label d-none d-sm-block mr-2" for="category-weight">Weight</label>
                <input class="form-control" type="text" placeholder="0" formControlName="weight">
                <span class="input-group-addon">%</span>
            </div>

            <div class="col-3 col-md-2 pl-0 pl-sm-3">
                <button class="btn btn-primary float-right" style="width: 100%" type="submit" [disabled]="!addCategoryForm.valid"
                (keyup.enter)="focusTarget(nameInput)">Add</button>
            </div>
        </form>
    `
})
export class GradebookFooterComponent implements OnInit {
    addCategoryForm: FormGroup;

    @Output() add = new EventEmitter<Category>();

    ngOnInit() {
        this.addCategoryForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.pattern(CATEGORY_NAME_PATTERN)]),
            weight: new FormControl(null, [Validators.required, numericValidator, Validators.min(0), Validators.max(100)])
        });
        console.log(this.addCategoryForm);
    }

    onAddCategory() {
        this.add.emit(new Category(this.addCategoryForm.value.name, [], this.addCategoryForm.value.weight / 100.0));
        this.addCategoryForm.reset();
    }

    focusTarget(refocusTarget) {
        if (refocusTarget) {
            setTimeout(_ => {
                refocusTarget.focus();
            }, 0);
        }
    }
}