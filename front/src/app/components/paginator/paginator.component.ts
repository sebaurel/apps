import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from 'src/app/util/pagination-page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() pages: Page<any>;
  @Output() pageChange = new EventEmitter<string>();
}


//https://medium.com/@JeremyLaine/server-side-pagination-and-filtering-with-angular-6-280a7909e783