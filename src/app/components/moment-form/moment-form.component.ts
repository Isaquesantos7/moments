import { NgIf } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { Moment } from '../../Moment';


@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})

export class MomentFormComponent {
  @Input() btnText!: string;
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() momentData: Moment | null = null;
  momentForm! : FormGroup;

  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl('')
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  get image() {
    return this.momentForm.get('image');
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({image : file});
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    } else {
      this.onSubmit.emit(this.momentForm.value);
    }
  }

}
