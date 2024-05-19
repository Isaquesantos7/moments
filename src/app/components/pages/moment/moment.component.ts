import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MomemtsService } from '../../../services/momemts.service';
import { Moment } from '../../../Moment';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})

export class MomentComponent implements OnInit{
  public moment?: Moment;

  constructor(private momentService: MomemtsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data)
  }

}
