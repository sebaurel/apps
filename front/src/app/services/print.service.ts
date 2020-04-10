import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting: boolean;
  constructor(private router: Router) { }

  printRecette(id: number) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', id]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
