import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {

  tokenConfirmation: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.route.params.subscribe(params => {
      this.tokenConfirmation = params['tokenConfirmation'];

    })
  }
  ngOnInit() {
    this.accountService.confirmAccount(this.tokenConfirmation).subscribe(() => {
      this.router.navigate(['/login']);
    },
      err=>{
        //alert('Email ou mot de passe invalide !');
        alert(err);
      }
    )

  }

}
