import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent {

  form!: FormGroup;
  submitted: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    }) 
  }

  submit() {

    if(this.form.invalid) {
      return;
    }

    const product = {
      type: this.form.get('type')?.value,
      title: this.form.get('title')?.value,
      photo: this.form.get('photo')?.value,
      info: this.form.get('info')?.value,
      price: this.form.get('price')?.value,
    };
    console.log(this.form);
    this.submitted = true;
  }
}
