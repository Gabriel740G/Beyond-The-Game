import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(private jogosService: JogosService) { }

  faPencil = faPencil;
  faTrash = faTrashCan;

  fecharPopUp() {
    this.fecharPopUpEvent.emit();
  }

  editarJogo() {
    this.editarJogoEvent.emit(this.jogoSelecionado);
  }

  excluirJogo(jogo: Jogo) {
    if (confirm('Tem certeza que deseja apagar este usuário?')) {
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
