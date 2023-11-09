import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-jogo',
  templateUrl: './edit-jogo.component.html',
  styleUrls: ['./edit-jogo.component.css']
})
export class EditJogoComponent implements OnInit {
  jogo: Jogo
  btnText: string = 'Editar';
  gameId: number;
  jogoSelecionado: string = '';

  editForm: FormGroup;

  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.gameId = +this.route.snapshot.paramMap.get('id'); // Obtém o ID do jogo da rota
    this.jogosService.getJogo(this.gameId).subscribe(jogo => {
      this.jogo = jogo; // Preenche o objeto do jogo com os valores atuais
    });
}

salvarEdicao() {
  this.jogosService.updateJogo(this.jogo.id, this.jogo).subscribe(
    (jogoAtualizado) => {
      console.log('Jogo atualizado com sucesso', jogoAtualizado);
      alert('Jogo atualizado com sucesso!');
    },
    (error) => {
      console.error('Erro ao atualizar o jogo', error);
      alert('Erro ao atualizar o jogo!');
    }
  );
}
}


