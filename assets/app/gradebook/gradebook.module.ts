import {NgModule} from "@angular/core"
import {GradebookService} from "./gradebook.service";
import {AssignmentComponent} from "./category/assignment/assignment.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryFooterComponent} from "./category/category-footer.component";
import {GradebookComponent} from "./gradebook.component";
import {GradebookFooterComponent} from "./gradebook-footer.component";
import {GradebookCardComponent} from "../gradebook-list/gradebook-card/gradebook-card.component";
import {GradebookListComponent} from "../gradebook-list/gradebook-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "../app.routing";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        AssignmentComponent,
        CategoryComponent,
        CategoryFooterComponent,
        GradebookComponent,
        GradebookFooterComponent,
        GradebookCardComponent,
        GradebookListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule, ReactiveFormsModule, routing
    ],
    providers: [GradebookService]
})
export class GradebookModule {

}