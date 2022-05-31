import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.scss'],
})
export class AddDescriptionComponent implements OnInit {

  form: FormGroup;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSave(){
    //add save code here
  }

}
