import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { Moment } from '../../../Moment';
import { MomemtsService } from '../../../services/momemts.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessagesService } from '../../../services/messages.service';

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
    private messageService: MessagesService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data)
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    console.log(id)
    
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messageService.add('Momento atualizado com sucesso!');

    this.router.navigate(['/']);
  }
}
