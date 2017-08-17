import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from "./assignment.model";
import { InputRejectingFunctions }from "../../editable/editable.component";


@Component({
    selector: 'app-assignment',
    template: ` 
        <app-editable class="col-xs-6" [maxLength]="20" [(value)]="assignment.name" 
                      [inputRejectingFunctions]="InputRejectingFunctions.nonempty">
        </app-editable>
        <app-editable class="col-xs-3" [maxLength]="4" [(value)]="assignment.earned" 
                      [inputRejectingFunctions]="scoreInputRejectingFunctions">
        </app-editable>
        <app-editable class="col-xs-3" [maxLength]="4" [(value)]="assignment.worth"
                      [inputRejectingFunctions]="scoreInputRejectingFunctions"></app-editable>
    `
})
export class AssignmentComponent {

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

    scoreInputRejectingFunctions = [InputRejectingFunctions.numeric, InputRejectingFunctions.nonempty];

}
