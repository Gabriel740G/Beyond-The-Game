import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  @Output() onSubmit = new EventEmitter<Empresa>();
  @Input() perfilData: Empresa | null = null;

  editForm!: FormGroup
  empresa!: Empresa

  faPencil = faPencil;
  faTrash = faTrashCan;
  faCancel = faTimes;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });

    const id = Number(this.route.snapshot.paramMap.get("id"))

    
  }

  async editHandler(perfilData: Empresa) {
    const id = this.empresa.id

    const formData = new FormData()

    formData.append('nome', perfilData.nome)
    formData.append('senha', perfilData.senha)

    await this.empresaService.updateEmpresa(this.empresa, id!).subscribe();

    this.router.navigate(['/home-biblioteca'])

  }

  get nome() {
    return this.editForm.get('nome')!;
  }

  get senha() {
    return this.editForm.get('senha')!;
  }

  submit() {
    if(this.editForm.invalid) {
      return;
    }
    console.log(this.editForm.value);
  
    this.onSubmit.emit(this.editForm.value);
  }

  logout() {
    this.authService.logout();
  }

}
