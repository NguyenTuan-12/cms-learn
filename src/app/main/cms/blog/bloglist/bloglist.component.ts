import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Observable } from "rxjs";
import {
  DataStateChangeEventArgs,
} from "@syncfusion/ej2-grids";
import {
  FilterService,
  GridComponent,
  EditSettingsModel,
  PagerModule,
} from "@syncfusion/ej2-angular-grids";
import { CoreService } from "src/app/_services/core.service";
import { Configs } from "src/app/common/configs";
import { ToolbarItem, ToolbarInterface } from 'src/app/_models';
import { Globals } from 'src/app/common/globals';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss',]
})
export class BlogListComponent implements OnInit {

  public search = {
    text: ""
  };
  // View child Grid
  @ViewChild("overviewgrid", { static: false })
  public gridInstance: GridComponent;
  public title: string;
  public status: boolean = true;
  public subscription: Subscription;
  public data: Observable<DataStateChangeEventArgs>;

  public toolbar: ToolbarInterface[];

  constructor(
    public _coreService: CoreService,
    public configs: Configs,
    public router: Router,
    private globals: Globals,
  ) {
    this.data = _coreService;

  }

  ngOnInit() {
    this.loadData();
    this.buildToolbar();

  }

  // Build Toolbar
  buildToolbar = () => {
    let toolbarList = [];
    toolbarList = [ToolbarItem.ADD];
    this.toolbar = this.globals.buildToolbar(
      "cms-app-sysusergroup",
      toolbarList
    );
  };

  loadData() {

  }
  public dataStateChange(state: DataStateChangeEventArgs): void {

  }
  searchListEnter() {

  }

  // click toolbar Chức vụ
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    switch (buttonId) {
      case ToolbarItem.ADD:
        this.router.navigate(["/cms/blog/blogcategory/new"]);
        break;
      default:
        break;
    }
  };

  formatStt = (index: string) => {
    if (this.gridInstance) {
      return (
        (this.gridInstance.pageSettings.currentPage - 1) *
        this.gridInstance.pageSettings.pageSize +
        parseInt(index, 0) +
        1
      );
    }
  };
  getListData() {

  }
  clickRecord(e, x) {

  }
}
