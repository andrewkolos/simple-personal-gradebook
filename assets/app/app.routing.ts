import {RouterModule, Routes} from "@angular/router";
import {GradebookListComponent} from "./gradebook-list/gradebook-list.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/gradebook-list', pathMatch: 'full' },
    { path: 'gradebook-list', component: GradebookListComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);