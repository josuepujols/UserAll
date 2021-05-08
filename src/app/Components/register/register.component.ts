import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [UserService]
})
export class RegisterComponent implements OnInit {

	public  nombre:string = "";
	public apellido:string = "";
	public correo:string = "";
	public password_1:string = "";
	public password_2:string = "";
	
	constructor( private peticion:UserService, private router:Router ) {

	}
	
	ngOnInit(): void {
		
	}

	//Metodo para llamar al servicio y registrar el usuario 
	register_user(form) {
		//Comprobamos que no haya nignun campo vacio 
		if (this.nombre == "" || this.apellido == "" || this.correo == "" || this.password_1 == "" ||  this.password_2 == "") {
			alert("Debe llenar todos los campos.");
		}
		else {
			if (this.password_1 == this.password_2) {
				//Creamos el objeto a enviar 
				const user_object = {
					"nombre": this.nombre,
					"apellido": this.apellido,
					"correo": this.correo,
					"password": this.password_1,
					"estado": 0
				}
				//Llamamos a nuestro servicio y enviamos la el objeto 
				this.peticion.register_user_service(user_object).subscribe(
					result => {
						if (result) {
							alert("El usuario " + this.nombre + " ha sido agregado correctamente.");
							this.router.navigate(['/sesion']);
						}
					},
					error => {
						alert("El usuario " + this.nombre + " ha sido agregado correctamente.");
						this.router.navigate(['/sesion']);
					}
				);

			}
			else {
				alert("Las contraseñas no coinciden.");
			}
		}
	}

}
