import {Component, OnInit, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';


export enum EditMode {
    plainText = 1,
    input
}

@Component({
    selector: 'app-editable',
    template: `
        <span *ngIf="currentMode === EditModeType.plainText"
              (click)="tempValue = value; currentMode = EditModeType.input">{{ value }}</span>

        <input appAutofocus *ngIf="currentMode === EditModeType.input" type="text" [value]="value"
               (blur)="saveValue($event.target.value); ignoreChanges = false"
               (keyup.escape)="ignoreChanges = true; currentMode = EditModeType.plainText"/>
    `
})
export class EditableComponent {

    EditModeType: any = EditMode;

    currentMode: EditMode;
    @Input() value: string; // the current value of this editable
    ignoreChanges: boolean;
    @Output() onValueChanged = new EventEmitter<string>();

    // sets default mode and default value if not defined by input
    constructor() {
        this.currentMode = EditMode.plainText;

        if (this.value === "" || this.value === undefined)
            this.value = "--";

        this.ignoreChanges = false;
    }

    saveValue(text: string) {
        this.value = text;
        this.currentMode = EditMode.plainText;
        this.onValueChanged.emit(text);
    }

}
