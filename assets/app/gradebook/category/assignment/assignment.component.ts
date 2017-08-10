import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Assignment} from "./assignment.model";

@Component({
    selector: 'app-assignment',
    template: ``
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

}
