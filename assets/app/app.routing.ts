import {RouterModule, Routes} from "@angular/router";
import {GradebookListComponent} from "./gradebook/gradebook-list/gradebook-list.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {GradebookComponent} from "./gradebook/gradebook.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'gradebook-list', component: GradebookListComponent },
    { path: 'gradebooks/:id', component: GradebookComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);