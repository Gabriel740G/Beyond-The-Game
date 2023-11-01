import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-jogo',
  templateUrl: './edit-jogo.component.html',
  styleUrls: ['./edit-jogo.component.css']
})
export class EditJogoComponent implements OnInit {
  jogo: Jogo
  btnText: string = 'Editar';

  editForm: FormGroup;

  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const jogoId = params['id'];

    // Use o serviço de jogo para buscar os detalhes do jogo pelo ID
    this.jogosService.getJogoPorId(jogoId).subscribe(jogo => {
      // Preencha o formulário com os detalhes do jogo
      this.editForm.patchValue(jogo);
    });
  });
}

salvarEdicao() {
  this.jogosService.updateJogo(this.jogo, this.jogo.id).subscribe(
    (jogoAtualizado) => {
      console.log('Jogo atualizado com sucesso', jogoAtualizado);
      alert('Jogo atualizado com sucesso!')
    },
    (error) => {
      console.error('Erro ao atualizar o jogo', error);
      alert('Erro ao atualizar o jogo!')
    }
  );
}

}


