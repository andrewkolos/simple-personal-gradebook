import {RouterModule, Routes} from "@angular/router";
import {GradebookListComponent} from "./gradebook-list/gradebook-list.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {GradebookComponent} from "./gradebook/gradebook.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'gradebook-list', component: GradebookListComponent },
    { path: 'gradebook/:id', component: GradebookComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);