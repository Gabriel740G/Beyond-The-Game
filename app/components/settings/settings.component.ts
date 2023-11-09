import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/Empresa';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userId: number
  empresa: Empresa;

  editForm!: FormGroup

  faPencil = faPencil;
  faTrash = faTrashCan;
  faCancel = faTimes;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['']
    });

    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      this.userId = tokenData.IdEmpresa; // Supondo que 'IdEmpresa' seja a propriedade correta no token
    }

    this.empresaService.getEmpresaById(this.userId).subscribe(empresa => {
      this.empresa = empresa; // Preenche o objeto do jogo com os valores atuais
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.empresaService.updateEmpresa(this.userId, this.empresa)
        .subscribe(
          (response) => {
            console.log('Perfil do usuário atualizado com sucesso', response);
          },
          (error) => {
            console.error('Erro ao atualizar perfil do usuário', error);
          }
        );
    }
  }

  logout() {
    this.authService.logout();
  }

}
