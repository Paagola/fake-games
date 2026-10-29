import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './models/game';
import { GameService } from './services/game';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('fakes-games');

  private gameService = inject(GameService);

  games: Game[] = [];
  foundGame: Game | null = null;
  searchError = '';


  ngOnInit(): void {
    this.gameService.getGame().subscribe({
      next: (data) => (this.games = data),
      error: (err) => console.error('Error al obtener los videojuegos', err),
    });
  }

  searchGame(value: number): void {
    this.foundGame = null;
    const id = Number(value);
    

    if (value == null) {
       this.searchError = 'Introduce un ID numérico válido.';
        return;
    }

    this.gameService.getGameById(id).subscribe ({
      next: (game) => (this.foundGame = game),
      error: () => (this.searchError = `No se encontró ningún videojuego con ID ${id}.`)
    })
  }





}
