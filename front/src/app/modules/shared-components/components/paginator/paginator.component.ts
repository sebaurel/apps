import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from 'src/app/modules/shared-components/util/page';
import { faAngleDoubleLeft, faAngleDoubleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  faAngleDoubleLeft: IconDefinition = faAngleDoubleLeft;
  faAngleDoubleRight: IconDefinition = faAngleDoubleRight;

  @Input() pages: Page<any>;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() PageSizeChange: EventEmitter<number> = new EventEmitter<number>();
}


//https://medium.com/@JeremyLaine/server-side-pagination-and-filtering-with-angular-6-280a7909e783