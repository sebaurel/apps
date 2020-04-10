import { FormGroup } from "@angular/forms";

export function FormValidator(group: FormGroup, formErrors: any, validationMessage: any ): void{
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      formErrors[key] = '';
      if (control && !control.valid){
        const message = validationMessage[key];
        for (const errorKey in control.errors){
          if (errorKey){
            formErrors[key] += message[errorKey] + ' ';
          }
        }
      }
    })
  }