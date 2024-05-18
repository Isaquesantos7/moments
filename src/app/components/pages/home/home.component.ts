import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environment/environment';
import { MomemtsService } from '../../../services/momemts.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from '../../../Moment';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public allMoments: Moment[] = [];
  public moments: Moment[] = []
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
}
