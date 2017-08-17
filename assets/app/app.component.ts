import { Component } from '@angular/core';
import {GradebookService} from "./gradebook/gradebook.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [GradebookService]
})
export class AppComponent {
    
}