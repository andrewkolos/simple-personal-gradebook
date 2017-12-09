import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from "./assignment.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {emptyOrNumericValidator} from "../../../general/custom-validators";


@Component({
    selector: 'app-assignment',
    template: `
        <form class="row" [formGroup]="assignmentForm" novalidate>
            <div class="col-5 col-md-6 col-lg-8 ">
                <input (focus)="$event.target.select()" (blur)="submitData()"
                       class="form-control" formControlName="name" id="nameInput">
            </div>
            <div class="input-group col-7 pl-0 pl-sm-3 col-md-6 col-lg-4">
                <input (focus)="$event.target.select()" (blur)="submitData()" class="form-control text-right"
                       formControlName="earned"
                       id="earnedInput">
                <span class="input-group-addon">/</span>
                <input (focus)="$event.target.select()" (blur)="submitData()" class="form-control"
                       formControlName="worth" id="worthInput">
                <button type="button" class="btn btn-danger btn-sm" (click)="remove.emit(assignment)">X</button>
            </div>
        </form>
    `
})
export class AssignmentComponent implements OnInit {

    @Input() assignment: Assignment;

    @Output() change = new EventEmitter<Assignment>();
    @Output() remove = new EventEmitter<Assignment>();

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
            earned: (this.assignment.earned !== undefined ? this.assignment.earned : ""),
            worth: (this.assignment.worth !== undefined ? this.assignment.worth : "")
        });
    }

    submitData() {

        if (this.assignmentForm.status === "VALID" && this.assignmentForm.dirty) {
            const formModel = this.assignmentForm.value;

            this.assignment.name = formModel.name;
            this.assignment.earned = formModel.earned === "" ? null : parseFloat(formModel.earned);
            this.assignment.worth = formModel.worth === "" ? null : parseFloat(formModel.worth);

            this.assignmentForm.markAsPristine();
            this.change.emit(this.assignment);
        }
    }

}
