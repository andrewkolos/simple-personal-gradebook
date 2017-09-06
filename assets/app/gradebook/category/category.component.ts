import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Category} from "./category.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./assignment/assignment.model";

@Component({
    selector: 'app-category',
    template: `
        <form class="row" [formGroup]="categoryForm">
            <div class="col-5 col-md-6 input-group">
                <label class="col-form-label d-none d-sm-block text-right mr-2" for="nameInput">Name</label>
                <input (focus)="$event.target.select()" class="form-control" (blur)="submitData()"
                       formControlName="name" id="nameInput">
            </div>
            <div class="col-7 col-md-6 mr-md-auto pl-0 pl-sm-3 input-group">
                <label for="worthInput" class="d-none d-sm-block col-form-label text-right mr-2">Weight</label>
                <input (focus)="$event.target.select()" (blur)="submitData()" class="form-control"
                       formControlName="weight" id="weightInput">
                <span class="input-group-addon">%</span>
                <button class="btn btn-danger btn-sm float-right" type="button" (click)="remove.emit(category)">X
                </button>
            </div>

      
        </form>

        <br>

        <div *ngFor="let assignment of category.assignments">
            <app-assignment [assignment]="assignment" (change)="change.emit(category)"
                            (remove)="removeAssignment($event)"></app-assignment>
        </div>

        <app-category-footer
                (assignmentCreated)="category.assignments.push($event); change.emit(category)"></app-category-footer>
    `
})
export class CategoryComponent implements OnInit {

    @Input() category: Category;

    @Output() change = new EventEmitter<Category>();
    @Output() remove = new EventEmitter<Category>();

    categoryForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        weight: new FormControl('', [Validators.max(100), Validators.min(0)]),
    });

    ngOnInit(): void {
        this.categoryForm.setValue({
            name: this.category.name,
            weight: this.category.weight * 100
        })
    }

    submitData() {
        if (this.categoryForm.status === "VALID" && this.categoryForm.dirty) {
            const formModel = this.categoryForm.value;

            this.category.name = formModel.name;
            this.category.weight = parseFloat(formModel.weight) / 100;

            this.categoryForm.markAsPristine();
            this.change.emit(this.category);
        }
    }

    removeAssignment(assignment: Assignment) {
        this.category.assignments.splice(this.category.assignments.indexOf(assignment), 1);
        this.change.emit(this.category);
    }
}
