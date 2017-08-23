import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from "./assignment.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {emptyOrNumericValidator} from "../../../general/custom-validators";


@Component({
    selector: 'app-assignment',
    template: `
        <form class="col-12 row" [formGroup]="assignmentForm" novalidate>
            <input (focus)="$event.target.select()" class="col-sm-5 col-md-6 col-lg-9 form-control" formControlName="name" id="nameInput">
            <div class="input-group col-sm-7 col-md-6 col-lg-3">
                <input (focus)="$event.target.select()" class="form-control text-right" formControlName="earned"
                       id="earnedInput">
                <span class="input-group-addon">/</span>
            <input (focus)="$event.target.select()" (blur)="submitData()" class="form-control" formControlName="worth" id="worthInput">
            </div>
        </form>
    `
})
export class AssignmentComponent implements OnInit {

    @Input() assignment: Assignment;

    assignmentForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.assignmentForm = this.fb.group({
            name: ['', [Validators.required]],
            earned: ['', [emptyOrNumericValidator, Validators.maxLength(5)]],
            worth: ['', [emptyOrNumericValidator, Validators.maxLength(5)]]
        });
    }

    // Load values into form.
    ngOnInit(): void {
        this.assignmentForm.setValue({
            name: this.assignment.name,
            earned: this.assignment.earned,
            worth: this.assignment.worth
        });
    }

    submitData() {
        if (this.assignmentForm.status === "VALID") {
            const formModel = this.assignmentForm.value;

            let saveAssignment: Assignment = new Assignment(this.assignment.id, formModel.name);

            if (formModel.earned !== "")
                saveAssignment.earned = parseFloat(formModel.earned);

            if (formModel.worth !== "")
                saveAssignment.worth = parseFloat(formModel.worth);

            // make update call to service here
        }
    }

}
