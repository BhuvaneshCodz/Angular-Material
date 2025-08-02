import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-dtl-view',
  templateUrl: './user-dtl-view.component.html',
  styleUrl: './user-dtl-view.component.scss'
})
export class UserDtlViewComponent {

  userData: any
  action: any
  editForm: any

  constructor(public dialogRef: MatDialogRef<UserDtlViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.userData = this.data.userData
    this.action = this.data.action

    if (this.action == 'add' || this.action == 'edit') {
      this.prepareform()
    }

  }
  prepareform() {
    this.editForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: [''],
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      companyName: [''],
      catchPhrase: [''],
      bs: ['']
    });

    this.editForm.patchValue({
      name: this.userData?.name,
      username: this.userData?.username,
      email: this.userData?.email,
      phone: this.userData?.phone,
      website: this.userData?.website,
      street: this.userData?.address?.street,
      suite: this.userData?.address?.suite,
      city: this.userData?.address?.city,
      zipcode: this.userData?.address?.zipcode,
      companyName: this.userData?.company?.name,
      catchPhrase: this.userData?.company?.catchPhrase,
      bs: this.userData?.company?.bs
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      const updatedUser = {
        id: this.userData?.id,
        name: formValue.name,
        username: formValue.username,
        email: formValue.email,
        phone: formValue.phone,
        website: formValue.website,
        address: {
          street: formValue.street,
          suite: formValue.suite,
          city: formValue.city,
          zipcode: formValue.zipcode,
          geo: {
            lat: this.userData?.address?.geo?.lat,
            lng: this.userData?.address?.geo?.lng
          }
        },
        company: {
          name: formValue.companyName,
          catchPhrase: formValue.catchPhrase,
          bs: formValue.bs
        }
      };
      var result: any = {
        action: this.action,
        userData: updatedUser
      }
      this.dialogRef.close(result);
    }
  }

  onDelete() {
    var result: any = {
      action: this.action,
      userData: this.userData
    }
    this.dialogRef.close(result);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
