import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MomemtsService } from '../../../services/momemts.service';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environment/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})

export class MomentComponent implements OnInit{
  public moment?: Moment;
  public baseApiUrl: string = environment.baseApiUrl;

  public faTimes = faTimes;
  public faEdit = faEdit;

  constructor(private momentService: MomemtsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data)
  }

}
