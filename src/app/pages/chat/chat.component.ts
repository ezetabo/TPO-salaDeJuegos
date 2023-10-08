import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

import { Chats } from 'src/app/interfaces/chats.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatDBService } from 'src/app/services/chatDB.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('contenedorMensajes')
  private contenedorMensajes: ElementRef | undefined;

  items: Chats[] = [];
  nuevoMensaje: string = '';
  usuario: string = '';

  constructor(private aS: AuthService, private cS: ChatDBService) { }

  ngOnInit(): void {
    this.aS.getUserEmail().subscribe(user => this.usuario = user!);
    this.cS.getData().subscribe((nuevosMensajes) => {
      this.items = [...this.items, ...nuevosMensajes];
      this.desplazarAlFinal();
    });
  }

  async enviarMensaje() {
    if (this.nuevoMensaje != '') {
      const newChat: Chats = {
        emisor: this.usuario,
        fecha: new Date().toISOString(),
        mensaje: this.nuevoMensaje
      };
      await this.cS.addData(newChat);
      this.nuevoMensaje = '';
    }
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
