import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from "./assignment.model";
import { InputRejectingFunctions } from "../../editable/editable.component";


@Component({
    selector: 'app-assignment',
    template: ` 
        
        <app-editable class="col-6" [maxLength]="20" [(value)]="assignment.name" 
                      [inputRejectingValidators]="nameInputRejectingValidators">
        </app-editable>
        <app-editable class="col-3" [maxLength]="4" [(value)]="assignment.earned" 
                      [inputRejectingValidators]="scoreInputRejectingValidators">
        </app-editable>
        <app-editable class="col-3" [maxLength]="4" [(value)]="assignment.worth"
                      [inputRejectingValidators]="scoreInputRejectingValidators"></app-editable>
        
    `
})
export class AssignmentComponent{

    @Input() assignment: Assignment;

    @Output()
    onRemove: EventEmitter<Assignment> = new EventEmitter();

    @Output()
    onUpdate: EventEmitter<Assignment> = new EventEmitter();


    updateEarned(earned: number) {
        this.assignment.earned = earned;
        this.onUpdate.emit(this.assignment)
    }

    updateWorth(worth: number) {
        this.assignment.worth = worth;
        this.onUpdate.emit(this.assignment);
    }

    nameInputRejectingValidators = [{fn: InputRejectingFunctions.nonempty, feedback: "Assignment must have a name."}];
    scoreInputRejectingValidators = [{fn: InputRejectingFunctions.numeric, feedback: "Must be numeric."},
        {fn: InputRejectingFunctions.nonempty, feedback: "Cannot be empty."}];

}
