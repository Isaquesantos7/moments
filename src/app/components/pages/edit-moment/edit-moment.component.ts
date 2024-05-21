import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { Moment } from '../../../Moment';
import { MomemtsService } from '../../../services/momemts.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentFormComponent } from '../../moment-form/moment-form.component';

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [
    NgIf, 
    MomentFormComponent
  ],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})

export class EditMomentComponent  implements OnInit{
  public moment!: Moment;
  public btnText: string = 'Editar';

  public momentData = null;

  constructor(
    private momentService: MomemtsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data)
  }
}
