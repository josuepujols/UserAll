import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    private url:string;

    constructor( private http:HttpClient ) {

    }


    //Login 
    iniciar_sesion_service(user:any):Observable<any> {
        this.url = "https://localhost:5001/api/Login";
        //Creamos las cabeceras 
        const headers = new HttpHeaders().set('Content-Type','application/json');
        //Retornamos la peticion 
        return this.http.post(this.url, user, {headers: headers});
    }

    //Traer todos los usuarios de la base de datos 
    get_user_service():Observable<any> {
        this.url = "https://localhost:5001/api/Users";
        return this.http.get(this.url);
    }

    //Metodo para actualizar el estado de cada usuario 
    update_user_service(user:any, id:number):Observable<any> {
        this.url = "https://localhost:5001/api/Users/" + id;
        //Creamos las cabeceras 
        const headers = new HttpHeaders().set('Content-Type','application/json');
        //Retornamos la peticion 
        return this.http.put(this.url, user, {headers: headers});
    }

    //Metodo para registrar un nuevo usuario 
    register_user_service(user:any):Observable<any> {
        this.url = "https://localhost:5001/api/Users";
        //Creamos las cabeceras 
        const headers = new HttpHeaders().set('Content-Type','application/json');
        //hacemos la peticion y la retornamos 
        return this.http.post(this.url, user, {headers: headers});
    }

    //Metodo para eliminar un usuario 
    delete_user_service(id:number):Observable<any> {
        this.url = "https://localhost:5001/api/Users/" + id;
        //hacemos la peticion y la retornamos 
        return this.http.delete(this.url);
    }

}



