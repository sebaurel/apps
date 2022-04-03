import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilisateurService } from 'src/app/modules/shared-components/services/utilisateur.service';
import { FormValidator } from 'src/app/util/form.util';
import { CanComponentDeactivate } from 'src/app/modules/shared-components/gards/confirmation.guard';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';
import { Photo } from 'src/app/modules/shared-components/models/photo.model';

@Component({
  selector: 'app-profil-form',
  templateUrl: './profil-form.component.html',
  styleUrls: ['./profil-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilFormComponent implements OnInit, CanComponentDeactivate {

  utilisateur: Utilisateur = this.userService.getCurrentUserLogged();
  photoThumbPath: String;
  progress: { percentage: number } = { percentage: 0 };

  formProfile: FormGroup = this.formBuilder.group({
    pseudo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', Validators.required],
  });

  validationMessage = {
    'pseudo' : {
      'required': 'Le pseudo est obligatoire',
      'minlength': 'le pseudo doit comporter plus de 2 caractères',
      'maxlength': 'le pseudo doit comporter moins de 20 caractères'
    },
    'email':{
      'required': 'L\'email est obligatoire'
    }
  };

  formErrors = {
    'pseudo': '',
    'email': '',
  };
  
  confirmExit: boolean = false;

  constructor(
    private userService: UtilisateurService,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {
  }

  ngOnInit() {
    if (this.utilisateur.photo) {
      this.photoThumbPath = environment.PATH_UPLOAD + this.utilisateur.photo.id+"-thumb.png";
    }
    else {
      this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
    }

    this.formProfile.controls['email'].setValue(this.utilisateur.email);
    this.formProfile.controls['pseudo'].setValue(this.utilisateur.pseudo);

    this.formProfile.valueChanges.subscribe( () => {
      FormValidator(this.formProfile, this.formErrors, this.validationMessage);
      this.confirmExit = true;
    });

    
  }

  photoChange(photo: Photo){
    this.utilisateur.photo = photo;
    this.confirmExit = true;
  }

  onSubmit(formProfile) {
    this.utilisateur.pseudo = formProfile.get('pseudo').value;
    this.userService.saveUser(this.utilisateur)
    .subscribe(utilisateur =>{ 
      localStorage.setItem('currentUser', JSON.stringify(utilisateur));
      this.confirmExit = false;
    });
    this.progress.percentage = 0;
  }

  delete(){
    if (confirm("Attention, vous allez supprimer votre compte, cette action est irréversible !!\nVos recettes seront toujours visibles mais sans votre pseudo")) {
      this.userService.deleteUser(this.utilisateur).subscribe(result => {
        if (result) alert("Votre profil à bien été supprimé")
        else alert("Impossible de supprimer votre profil. Merci de contacter un administrateur");
      });
      this.authService.logOut();
    }
  }

  confirmExitPage(){
    if (this.confirmExit) {
      return confirm("Attention, vous quittez cette page sans avoir enregistré votre recette !!");
    }else {
      return true;
    }
  }

}
