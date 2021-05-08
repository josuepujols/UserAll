import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { Router } from "@angular/router";

 
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [UserService]
})
export class LoginComponent implements OnInit {

	//Propiedad para el check 
	private checked:boolean = false;
	//Propiedades para el binding con el formulario 
	public email:string = "";
	public password:string = "";
	//Propiedad para enviar notificacion
	public notification:boolean = false;
	//Propiedad cuando el usuario no existe
	public user_alert:boolean = false;

	public user_update = {
		"id": 0,
		"nombre": "",
		"apellido": "",
		"correo": "",
		"password": "",
		"estado": 1
	}
	
	constructor( private peticion:UserService, private router:Router ) {

	}
	
	ngOnInit(): void {
		
	}

	//Meotodo para iniciar sesion 
	iniciar_sesion() {
		let user = {
			"nombre": "dwf",
			"apellido": "fgds",
			"correo": this.email,
			"password": this.password,
			"estado": 1
		}

		switch (this.validar()) {
			case 0:
				this.peticion.iniciar_sesion_service(user).subscribe(
					result => {
						if (result !== null) {
							//Creamos un objeto para enviarlo por el metodoa actualizar a nuestro backend
							this.user_update = {
								"id": result.id,
								"nombre": result.nombre,
								"apellido": result.apellido,
								"correo": result.correo,
								"password": result.password,
								"estado": 1
							}
							this.peticion.update_user_service(this.user_update, result.id).subscribe(
								result => {
									console.log(result);
									localStorage.setItem('user', JSON.stringify(this.user_update));
									window.location.pathname = '/home';
								},
								error => {
									console.log(error);
								}
							);
						}
						else {
							this.user_alert = true;
						}
					},
					error => {
						console.log(error);
					}
				);
				break;
			case 1: 
				this.notification = true;
				break;
			case 2: 
				this.notification = true;
				break;
		}
	}

	//Metodo para validar el formulario 
	validar():number {

		let control = 0;

		if (this.email == "") {
			const email_input = document.getElementById('inputEmail4');
			email_input.style.borderColor = "red";

			control = 1;
		}

		if (this.password == "") {
			const password_input = document.getElementById('inputPassword4');
			password_input.style.borderColor = "red";
			control = 2;

		}

		return control;
		

	}

	//Metodo para ir al componente de registro
	go_register() {
		this.router.navigate(['/registro']);
	}

	//Cambiar color 
	chenge_border_email() {
		this.notification = false;
		this.user_alert = false;
		document.getElementById('inputEmail4').style.borderColor = "gray";
	}

	chenge_border_password() {
		this.notification = false;
		this.user_alert = false;
		document.getElementById('inputPassword4').style.borderColor = "gray";
	}

	//Metodo para visualizar u ocultar el password 
	change_control() {
		const elemento = document.getElementById('inputPassword4');
		
		if (this.checked) {
			elemento.setAttribute('type', 'password');
			this.checked = false;
		}
		else {
			elemento.setAttribute('type', 'text');
			this.checked = true;
		}

	}

}
