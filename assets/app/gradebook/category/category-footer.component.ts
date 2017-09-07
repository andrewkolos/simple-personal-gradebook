import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Assignment} from "./assignment/assignment.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {emptyOrNumericValidator} from "../../general/custom-validators";


@Component({
    selector: 'app-category-footer',
    template: `
        <form class="row" [formGroup]="assignmentForm" novalidate>
            <div class="col-5 col-md-6 col-lg-9">
                <input #nameInput (focus)="inputSelected($event)" (blur)="inputBlurred()"
                       class="form-control" formControlName="name" id="nameInput"
                       placeholder="New assignment">
            </div>
            <div class="input-group col-7 col-md-6 col-lg-3 pl-0 pl-sm-3">
                <input (focus)="inputSelected($event)" (blur)="inputBlurred()" class="form-control text-right"
                       formControlName="earned"
                       id="earnedInput">
                <span class="input-group-addon">/</span>
                <input (focus)="inputSelected($event)" (keydown.tab)="inputBlurred(nameInput); $event.preventDefault();"
                       (blur)="inputBlurred()" class="form-control"
                       formControlName="worth" id="worthInput">
                <button type="button" class="d-block d-md-none btn btn-primary btn-sm"
                        [disabled]="!assignmentForm.valid" (click)="submitData()">&#10004;</button>
            </div>
        </form>
    `
})
export class CategoryFooterComponent {


    @Output() assignmentCreated = new EventEmitter<Assignment>();

    assignmentForm: FormGroup;

    elementsFocused: number = 0;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    inputSelected($event) {
        this.elementsFocused += 1;
        $event.target.select();
    }

    createForm() {
        this.assignmentForm = this.fb.group({
            name: ['', [Validators.required]],
            earned: ['', [emptyOrNumericValidator, Validators.maxLength(5)]],
            worth: ['', [emptyOrNumericValidator, Validators.maxLength(5)]]
        });
    }

    inputBlurred(refocusTarget?) {
        setTimeout(_ => {
            this.handleBlur(refocusTarget)
        }, 0);
    }

    handleBlur(refocusTarget?) {
        this.elementsFocused -= 1;
        console.log(this.assignmentForm.status + " " + this.elementsFocused);

        if (this.elementsFocused == 0) { // create assignment
            this.submitData();
            if (refocusTarget)
                refocusTarget.focus();
        }
    }

    submitData() {
        if (this.assignmentForm.valid) {
            const formModel = this.assignmentForm.value;

            let assignment = new Assignment(formModel.name);

            if (formModel.earned !== "")
                assignment.earned = parseFloat(formModel.earned);

            if (formModel.worth !== "")
                assignment.worth = parseFloat(formModel.worth);

            this.assignmentCreated.emit(assignment);

            // Reset form. reset() isn't used as it causes the custom validator to not be called for some reason.
            this.assignmentForm.markAsPristine();
            this.assignmentForm.markAsUntouched();
            for (let name in this.assignmentForm.controls)
                this.assignmentForm.controls[name].setValue('');

            this.assignmentForm.updateValueAndValidity();
        }
    }

}
