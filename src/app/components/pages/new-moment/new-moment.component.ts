import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { Moment } from '../../../Moment';
import { MomemtsService } from '../../../services/momemts.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [MomentFormComponent],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})

export class NewMomentComponent {
  public btnText: string = 'Compartilhar!';

  constructor(
    private momentService: MomemtsService, 
    private messageService: MessagesService,
    private router: Router,
  ) {}

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) {
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messageService.add('Momento adicionado com sucesso!');

    this.router.navigate(['/']);
  }
}
