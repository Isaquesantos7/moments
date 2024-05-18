import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})

export class MomentFormComponent {
  @Input() btnText!: string;

  momentForm! : FormGroup;

  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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
      console.log(this.momentForm.value);
    }
  }

}
