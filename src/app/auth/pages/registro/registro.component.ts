import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [ this.validatorService.camposIguales('password','confirmPassword')]
  })
  // emailErrorMsg: string = '';
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'El correo es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene el formato de correo'
    }else if (errors?.emailTomado){
      return 'El correo ya existe'
    }
    return '';
  }
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService 
    ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Cristian David',
      email: 'cristiandavid@gamil.com',
      username: 'cris',
      password: '12345678',
      confirmPassword: '12345678'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched
  }



  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required
  //     && this.miFormulario.get('email')?.touched
  // }
  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern
  //     && this.miFormulario.get('email')?.touched
  // }
  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //     && this.miFormulario.get('email')?.touched
  // }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    
  }

}
