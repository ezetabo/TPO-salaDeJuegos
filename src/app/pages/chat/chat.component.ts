import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

import { Chats } from 'src/app/interfaces/chats.interface';
import { AuthService } from 'src/app/services/auth.service';
import { generarMensajes } from 'src/app/utils/helper-functions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('contenedorMensajes') private contenedorMensajes: ElementRef | undefined;


  items: Chats[] = [];
  nuevoMensaje: string = '';
  usuario: string = 'Usuario 1';

  constructor(private aS: AuthService) { }

  ngOnInit(): void {
    this.aS.getUserEmail().subscribe(user => this.usuario = user!);
    this.items = generarMensajes(3);
    this.desplazarAlFinal();
  }

  enviarMensaje() {
    const newChat: Chats = {
      emisor: this.usuario,
      fecha: new Date().toISOString(),
      mensaje: this.nuevoMensaje
    };
    this.items.push(newChat);
    this.nuevoMensaje = '';

  }



  ngAfterViewChecked() {
    this.desplazarAlFinal();
  }

  private desplazarAlFinal() {
    if (this.contenedorMensajes) {
      const contenedor = this.contenedorMensajes.nativeElement;
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }

}
