import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf, NgFor } from '@angular/common';

import { MomemtsService } from '../../../services/momemts.service';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environment/environment';
import { MessagesService } from '../../../services/messages.service';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    RouterLink,
    NgIf,
    NgFor,
  ],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})

export class MomentComponent implements OnInit{
  public moment?: Moment;
  public baseApiUrl: string = environment.baseApiUrl;

  public faTimes = faTimes;
  public faEdit = faEdit;

  constructor(
    private momentService: MomemtsService, 
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data);
  }

  public async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.add('Momento excluido com sucesso!');

    this.router.navigate(['/']);
  }

}
