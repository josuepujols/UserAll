//Importo los modulos necesarios 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

//Importo mis componentes
import { LoginComponent } from "./Components/login/login.component";
import { RegisterComponent } from "./Components/register/register.component";
import { HomeComponent } from "./Components/home/home.component";
import { ErrorComponent } from "./Components/error/error.component";


//Creo mis rutas

const app_routes: Routes = [
    { path: "", component: LoginComponent },
    { path:"sesion", component: LoginComponent},
    { path:"registro", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "**", component: ErrorComponent }
];

export const app_routing_providers: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(app_routes); 


