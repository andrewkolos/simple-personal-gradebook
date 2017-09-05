import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CATEGORY_NAME_PATTERN} from "../general/patterns";
import {Category} from "./category/category.model";

@Component({
    selector: 'app-gradebook-footer',
    template: `
        <h4>Add a new category</h4>
        <form class="form-inline" id="addCategoryForm" [formGroup]="addCategoryForm" (ngSubmit)="onAddCategory()" novalidate>
            <div class="input-group mr-2">
                <label class="col-form-label mr-2" for="category-name">Name</label>
                <input type="text" placeholder="New category name" id="category-name" class="form-control"
                       formControlName="name">
            </div>
            
            <div class="input-group mr-2 ml-2">
                <label class="col-form-label mr-2" for="category-weight">Weight</label>
                <input class="form-control" type="text" placeholder="0" formControlName="weight">
                <span class="input-group-addon">%</span>
            </div>

            <button class="col-2 btn btn-primary" type="submit" [disabled]="!addCategoryForm.valid">Add</button>
        </form>
    `
})
export class GradebookFooterComponent implements OnInit {
    addCategoryForm: FormGroup;

    @Output() add = new EventEmitter<Category>();

    ngOnInit() {
        this.addCategoryForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.pattern(CATEGORY_NAME_PATTERN)]),
            weight: new FormControl(null, [Validators.required, Validators.pattern( "\\d+") , Validators.min(0), Validators.max(100)])
        });
        console.log(this.addCategoryForm);
    }

    onAddCategory() {
        this.add.emit(new Category(this.addCategoryForm.value.name, [], this.addCategoryForm.value.weight / 100.0));
    }
}