import {RouterModule, Routes} from "@angular/router";
import {GradebookListComponent} from "./gradebook-list/gradebook-list.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/gradebookList', pathMatch: 'full' },
    { path: 'gradebookList', component: GradebookListComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);