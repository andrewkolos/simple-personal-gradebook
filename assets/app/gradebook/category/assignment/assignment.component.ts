import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Assignment} from "./assignment.model";

@Component({
    selector: 'app-assignment',
    template: ``
})
export class AssignmentComponent {

    @Input() _assignment: Assignment;

    @Output()
    onRemove: EventEmitter<Assignment> = new EventEmitter();

    @Output()
    onUpdate: EventEmitter<Assignment> = new EventEmitter();

    updateEarned(earned: number) {
        this._assignment.earned = earned;
        this.onUpdate.emit(this._assignment)
    }

    updateWorth(worth: number) {
        this._assignment.worth = worth;
        this.onUpdate.emit(this._assignment);
    }

}
