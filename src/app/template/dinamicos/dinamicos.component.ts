import { Component, OnInit } from '@angular/core';

 interface Persona {
   nombre: string;
   favoritos: Favorito[];
 }
 interface Favorito {
   id: number;
   nombre: string;
 }


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {
  nuevoJuego: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  persona: Persona = {
    nombre: 'Cristhian',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'DeathStranding'}
    ]
  }

  eliminar(index: number){
    this.persona.favoritos.splice(index, 1);
  }

  guardar(){
    console.log('Formulario posteado');
    
  }
  agregarJuego(){
    const nuevoFaviruto: Favorito={
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFaviruto});
    this.nuevoJuego = '';
  }
}
