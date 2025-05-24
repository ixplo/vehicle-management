import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './vehicle/user-list/user-list.component';
import { UserFormComponent } from './vehicle/user-form/user-form.component';
import {NavbarComponent} from './vehicle/nav-bar/navbar.component';

const routes: Routes = [
    { path: 'vehicles', component: VehicleListComponent },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/edit/:id', component: VehicleFormComponent },

    { path: 'users', component: UserListComponent },
    { path: 'users/new', component: UserFormComponent },
    { path: 'users/edit/:id', component: UserFormComponent },
    
    { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        AppComponent,
        VehicleListComponent,
        VehicleFormComponent,
        UserListComponent,
        UserFormComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}