import { Directive , OnInit, Renderer, ElementRef} from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective {

    constructor(public renderer: Renderer, public elementRef: ElementRef) {}

    ngOnInit() {
        this.renderer.invokeElementMethod(
            this.elementRef.nativeElement, 'focus', []);
    }

}