import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/Empresa';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-biblioteca',
  templateUrl: './home-biblioteca.component.html',
  styleUrls: ['./home-biblioteca.component.css']
})
export class HomeBibliotecaComponent implements OnInit {
  userId: number;
  username: string | null;

  allJogos: Jogo[] = []
  jogos: Jogo[] = []
  mostrarPopUp: boolean = false;
  jogoSelecionado: Jogo;

  faPencil = faPencil;
  faTrash = faTrashCan;

  quant_games: number = 0;

  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.authService.getLoggedInUser();
  }

  ngOnInit() {
    this.atualizarContador();
    setInterval(() => this.atualizarContador(), 1000);

     this.jogosService.getJogos().subscribe(data => {
       this.jogos = data;
     });

  }

  mostrarDetalhes(jogo: Jogo) {
    this.jogoSelecionado = jogo;
    this.mostrarPopUp = true;
  }

  fecharPopUp() {
    this.jogoSelecionado = null;
    this.mostrarPopUp = false;
  }

  contarDivs(className: string): number {
    const divs = document.querySelectorAll(`.${className}`);
    return divs.length;
  }

  atualizarContador() {
    this.quant_games = this.contarDivs('card');
  }

  editarJogo() {
    this.router.navigate(['/editar-jogo', this.jogoSelecionado.id]);
  }

  logout() {
    this.authService.logout();
    this.username = null;
  }
}
