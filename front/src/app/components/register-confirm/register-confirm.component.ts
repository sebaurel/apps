import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {

  tokenConfirmation: string;
  regitered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) {
    this.route.params.subscribe(params => {
      this.tokenConfirmation = params['tokenConfirmation'];

    })
  }
  ngOnInit() {
    this.accountService.confirmAccount(this.tokenConfirmation).subscribe(() => {
      this.regitered = true;
    },
      err=>{
        //alert('Email ou mot de passe invalide !');
        alert(err);
      }
    )

  }

}
