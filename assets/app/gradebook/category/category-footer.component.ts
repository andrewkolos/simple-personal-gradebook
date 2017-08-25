import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Assignment} from "./assignment/assignment.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {emptyOrNumericValidator} from "../../general/custom-validators";


@Component({
    selector: 'app-category-footer',
    template: `
        <form class="row" [formGroup]="assignmentForm" novalidate>
            <input #nameInput (focus)="inputSelected($event)" (blur)="inputBlurred()"
                   class="col-sm-5 col-md-6 col-lg-9 form-control" formControlName="name" id="nameInput">
            <div class="input-group col-sm-7 col-md-6 col-lg-3">
                <input (focus)="inputSelected($event)" (blur)="inputBlurred()" class="form-control text-right"
                       formControlName="earned"
                       id="earnedInput">
                <span class="input-group-addon">/</span>
                <input (focus)="inputSelected($event)" (keydown.tab)="$event.target.blur(); $event.preventDefault();" (blur)="inputBlurred($event, nameInput)" class="form-control"
                       formControlName="worth" id="worthInput">
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

    inputBlurred($event?, refocusTarget?) {
        setTimeout(_ => {this.handleBlur(refocusTarget)}, 0);
    }

    handleBlur(refocusTarget?) {
        this.elementsFocused -= 1;

        if (this.assignmentForm.status === "VALID" && this.elementsFocused == 0) { // create assignment

            const formModel = this.assignmentForm.value;

            let assignment = new Assignment(formModel.name);

            if (formModel.earned !== "")
                assignment.earned = parseFloat(formModel.earned);

            if (formModel.worth !== "")
                assignment.worth = parseFloat(formModel.worth);

            this.assignmentCreated.emit(assignment);

            this.assignmentForm.reset();

            if (refocusTarget)
                refocusTarget.focus();
        }
    }

}
