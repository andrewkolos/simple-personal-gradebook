import {RouterModule, Routes} from "@angular/router";
import {GradebookListComponent} from "./gradebook-list/gradebook-list.component";
import {AuthenticationComponent} from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/gradebookList', pathMatch: 'full' },
    { path: 'gradebookList', component: GradebookListComponent },
    { path: 'auth', component: AuthenticationComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);