import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf, NgFor } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';

import { MomemtsService } from '../../../services/momemts.service';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environment/environment';
import { MessagesService } from '../../../services/messages.service';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Comment } from '../../../Comment';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    RouterLink,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})

export class MomentComponent implements OnInit{
  public moment?: Moment;
  public baseApiUrl: string = environment.baseApiUrl;

  public faTimes = faTimes;
  public faEdit = faEdit;

  public commentForm!: FormGroup;

  constructor(
    private momentService: MomemtsService, 
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
    private commentService: CommentsService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => this.moment = item.data);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  get text() {
    return this.commentForm.get('text');
  }

  get username() {
    return this.commentForm.get('username');
  }

  public async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.add('Momento excluido com sucesso!');

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {

    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((item) => {
      this.moment?.comments!.push(item.data)
    });

    this.messageService.add('Comentário adicionado com sucesso!')


    // Reset form
    this.commentForm.reset();

    formDirective.resetForm();
  }
}
