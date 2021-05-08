import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { Router } from "@angular/router"

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [UserService]
})
export class HomeComponent implements OnInit {

	public objeto:any = JSON.parse(localStorage.getItem('user'));

	private execute:boolean = true;


	//Array para almacenar todos usuarios que vienen del backend
	public users:any[];
	
	constructor( private peticion:UserService ) {
		this.users = [];
	}

	@HostListener('window:beforeunload') 
	onUnload() {
		/*
		if (this.execute) {
			this.change_state(0);
			return false;
		}
		*/

		
	}

	

	ngOnInit(): void {
		/*
		if (window.performance.navigation.type == 1) {
			this.change_state(1);
		}
		*/
		this.get_users();
	}

	//Metdo para trar los usuarios 
	get_users() {
		this.peticion.get_user_service().subscribe(
			result => {
				//Almacenamos los objetos en el array
				for (let i = 0; i < result.length; i++) {
					this.users.push(result[i]);
				}
				
			},
			error => {
				console.log(error);
			}
		);
		
	}
	

	//Metodo para cambiar el estado del usuario 
	change_state(estado:number) {
		const user_send = {
			"id": this.objeto.id,
			"nombre": this.objeto.nombre,
			"apellido": this.objeto.apellido,
			"correo": this.objeto.correo,
			"password": this.objeto.password,
			"estado": estado
		}

		this.peticion.update_user_service(user_send, this.objeto.id).subscribe(
			result => {
				console.log("Did it");
			},
			error => {

			}
		);
	}

	//Metodo para cerrar sesion 
	cerrar_sesion() {
		this.execute = false;
		this.change_state(0);
		window.location.pathname = '/sesion';
	}

	//Metodo para eliminar un usuario 
	delete_user() {
		this.execute = false;
		const id = this.objeto.id;
		this.peticion.delete_user_service(id).subscribe(
			result => {
				console.log(result);
				window.location.pathname = "/sesion";
			},
			error => {
				console.log(error);
			}
		);	

	}

}
