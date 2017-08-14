import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ViewEncapsulation} from "@angular/core"

export enum EditMode {
    plainText = 1,
    input
}

@Component({
    selector: 'app-editable',
    template: `
        <div style="display: inline-block">
        <span *ngIf="currentMode === EditModeType.plainText"
              (focus)="tempValue = value; currentMode = EditModeType.input"
              (click)="currentMode = EditModeType.input"
              [ngClass]="plainTextClass"
              [ngStyle]="styleStringToObject(plainTextStyle)">{{ value }}</span>

            <input appAutofocus *ngIf="currentMode === EditModeType.input"
                   [value]="value"
                   [ngClass]="editClass"
                   style="width: 100%"
                   [ngStyle]="styleStringToObject(editStyle)"
                   maxLength="{{maxLength}}"
                   (keydown.enter)="_ignoreChanges = false; handleInput($event.target.value)"
                   (keydown.tab)="_ignoreChanges= false; handleInput($event.target.value)"
                   (keydown.escape)="_ignoreChanges = true;"
                   (blur)="handleInput($event.target.value)"/>
        </div>
    `
})
export class EditableComponent {

    /** Used to control which of the two spans are visible. */
    EditModeType: any = EditMode;
    currentMode: EditMode;

    /** The current value of this editable. */
    @Input() value: string;

    /** Inputs that do not satisfy any of these functions will be preemptively rejected, and the component will retain
     *  it's current value. */
    @Input() inputRejectingFunctions: { fn: ((_: string) => boolean), feedback: any }[] = [];

    /** The maximum number of characters the input will allow. */
    @Input() maxLength: number;

    // Used to style the component.
    @Input() plainTextClass: string;
    @Input() plainTextStyle: string;
    @Input() editClass: string;
    @Input() editStyle: string;

    /** While set, this flag will prevent new values from being saved.
     *  This is used as blur occurs *after* keypress, so pressing the escape key will
     *  still cause the value to be saved. This behavior is not desired. */
    private _ignoreChanges: boolean = false;

    @Output() valueChanged = new EventEmitter<string>();
    @Output() onInputRejected = new EventEmitter<any[]>(); // See inputRejectingFunctions.

    /** Sets default mode and default value if not defined by input. */
    constructor() {
        this.currentMode = EditMode.plainText;

        if (this.value === "" || this.value === undefined)
            this.value = "--";

        this._ignoreChanges = false;
    }

    /**
     * Sets the value of the control to the new value if the new value satisfies all input-rejecting validation functions.
     * @param {string} newValue
     */
    handleInput(newValue: string) {
        var arr: any[] = []; // Will store all validation errors.

        // Call all input-rejecting validation functions against the value.
        if (this.inputRejectingFunctions !== undefined) {
            for (let validator of this.inputRejectingFunctions) {
                if (!validator.fn(newValue)) {
                    arr.push(validator.feedback);
                }
            }
        }

        if (arr.length == 0) { // No validation failures, accept the input.
            this.value = newValue;
            this.currentMode = EditMode.plainText;
            this.valueChanged.emit(newValue);
        } else if (arr.length > 0) { // There were validation failures, reject the input.
            this.onInputRejected.emit(arr);
        }
    }

    /**
     * Converts a normal CSS style string to an object, where each key is the name of the CSS property, and each value is
     * the value for that property.
     * @param {string} str  A CSS string (e.g. 'border: 1px solid red').
     * @returns {{}}        An object representing the CSS properties (e.g. {border: "1px solid red")).
     */
    styleStringToObject(str: string) {
        var regex = /([\w-]*)\s*:\s*([^;]*)/g;
        var match, properties = {};
        while (match = regex.exec(str))
            properties[match[1]] = match[2].trim();

        return properties;
    }
}

module InputRejectingFunctions {
    export function min(min: number) {
        return (input: string) => {
            if (input === undefined) return false;

            const value = parseFloat(input);
            return !isNaN(value) && value < min;
        }
    }

    export function max(max: number) {
        return (input: string) => {
            if (input === undefined) return false;

            const value = parseFloat(input);
            return !isNaN(value) && value > max;
        }
    }

    export function required(input: string) {
        return input !== undefined && input !== "";
    }

    export function numeric(input: string) {
        return input !== undefined && !isNaN(parseFloat(input));
    }

}