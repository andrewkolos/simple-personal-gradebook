import {FormControl} from "@angular/forms";

export function emptyOrNumericValidator(control: FormControl) {
        return (control.value === "" || !isNaN(parseFloat(control.value))) ? null : {'emptyOrNumeric': {value: control.value}};
}