import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Category} from "./category.model";
import {InputRejectingFunctions} from "../editable/editable.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-category',
    template: `
        <form class="row" [formGroup]="categoryForm">
            <div class="col-sm-5 col-md-5 pl-0">
                <input (focus)="$event.target.select()" class="form-control" (blur)="submitData()"
                       formControlName="name" id="nameInput">
            </div>
            <div class="col-sm-7 offset-md-2 col-md-5 pr-0">
                <div class="row input-group">
                    <label for="worthInput" class="col-6 col-form-label text-right">Weight:</label>
                    <input (focus)="$event.target.select()" (blur)="submitData()" class="form-control"
                           formControlName="weight" id="weightInput">
                    <span class="input-group-addon">%</span>
                </div>
            </div>
        </form>

        <br>
        
        <div  *ngFor="let assignment of category.assignments">
            <app-assignment 
                            [assignment]="assignment"></app-assignment>
        </div>
        
        <app-category-footer (assignmentCreated)="category.assignments.push($event)"></app-category-footer>
    `
})
export class CategoryComponent implements OnInit {


    @Input() category: Category;

    @Output() change = new EventEmitter<Category>();

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

    }
}
