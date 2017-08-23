import {AbstractControl, ValidatorFn} from "@angular/forms";

export function emptyOrNumericValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        return (control.value === "" || !isNaN(parseFloat(control.value))) ? null : {'emptyOrNumeric': {value: control.value}};
    }
}