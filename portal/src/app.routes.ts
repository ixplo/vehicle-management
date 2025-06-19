import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { HomeComponent } from './app/pages/home/home.component';
import { AddVehicleComponent } from './app/components/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './app/components/edit-vehicle/edit-vehicle.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
            { path: 'add-vehicle', component: AddVehicleComponent },
            { path: 'edit-vehicle/:id', component: EditVehicleComponent },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
