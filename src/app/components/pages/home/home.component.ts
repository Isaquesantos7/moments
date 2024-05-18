import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';

import { environment } from '../../../../environment/environment';
import { MomemtsService } from '../../../services/momemts.service';
import { Moment } from '../../../Moment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    DatePipe,
    FontAwesomeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public faSearch = faSearch;
  public search__: string = '';

  public allMoments: Moment[] = [];
  public moments: Moment[] = [];

  public baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomemtsService) {}

  ngOnInit() {
    this.momentService.getMoments().subscribe((itens) => {

      const data = itens.data;

      data.map((item) => {
        item.create_at = new Date(item.create_at!).toLocaleDateString('pt-BR');
      });

      this.allMoments = data;
      this.moments = data;

    });
  }

  public search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter(item => item.title.toLowerCase().includes(value));
  }
}
