import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info-jogo',
  templateUrl: './info-jogo.component.html',
  styleUrls: ['./info-jogo.component.css']
})
export class InfoJogoComponent {
  @Input() jogoSelecionado: Jogo;
  @Output() fecharPopUpEvent = new EventEmitter<void>();
  @Output() editarJogoEvent = new EventEmitter<Jogo>();
  @Output() excluirJogoEvent = new EventEmitter<Jogo>();

  constructor(
    private jogosService: JogosService,
    private router: Router
  ) { }

  faPencil = faPencil;
  faTrash = faTrashCan;

  fecharPopUp() {
    this.fecharPopUpEvent.emit();
  }

  editarJogo() {
    this.editarJogoEvent.emit();
  }

  excluirJogo(jogo: Jogo) {
    if (confirm('Tem certeza que deseja apagar este jogo?')) {
    this.jogosService.removeJogo(jogo.id).subscribe(
      response => {
        alert('Jogo excluído com sucesso');
        this.jogoSelecionado = null
      },
      error => {
        alert('Erro ao excluir o jogo');
      }
    );
    }
  }

}
