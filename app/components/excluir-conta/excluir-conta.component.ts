import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AuthService } from 'src/app/services/auth.service';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/Empresa';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.component.html',
  styleUrls: ['./excluir-conta.component.css']
})
export class ExcluirContaComponent implements OnInit {
  userId: number;

  faPencil = faPencil;
  faTrash = faTrashCan;
  faCancel = faTimes;
  
  caixa: boolean = true;

  aviso: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private authService: AuthService,
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      this.userId = tokenData.IdEmpresa; // Supondo que 'IdUsuario' seja a propriedade correta no token
    }
  }

  ngOnInit(): void {}

  deleteAccount() {}

  voltarInicio() {
    this.router.navigate(['/settings']);
  }

  abrirAviso(): void {
    this.caixa = false;
    this.aviso = true;
  }

  fecharAviso(): void {
    this.caixa = true;
    this.aviso = false;
  }

  logout() {
    this.authService.logout();
  }

}
