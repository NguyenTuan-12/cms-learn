import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Observable } from "rxjs";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-grids";
import {
  FilterService,
  GridComponent,
  EditSettingsModel,
  PagerModule,
} from "@syncfusion/ej2-angular-grids";
import { CoreService } from "src/app/_services/core.service";
import { ConfigService } from "src/app/_services/config.service";
import { Configs } from "src/app/common/configs";  // tao khung cho list danh sach
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
  @ViewChild("overviewgrid", { static: false })        //html ejs-grid #overviewgrid => su dung overviewgrid nhu 1 component con
  public gridInstance: GridComponent;                  //add luoi de su dung
  public subscription: Subscription;                   //theo doi bien dong tu trang, khi destroy se unsubcribe
  public data: Observable<DataStateChangeEventArgs>;   // cap nhat data tu coreService
  public state: DataStateChangeEventArgs;             // DataStateChangeEventArgs: model chung cho du lieu
  public toolbar: ToolbarInterface[];                 //ToolbarInterface[] dinh nghia chuc nang Toolbar co san
  pageIndex = 0 ;

  constructor(
    public _coreService: CoreService,        // method lay data
    public configs: Configs,                // tao khung cho list danh sach
    public router: Router,                  // link router
    private globals: Globals,
    private _configService: ConfigService,  // giu trang khi F5
  ) { 
      this.data = _coreService; 
      this._configService._configSubject.next("true");
    }

  ngOnInit() {
    this.loadData();
    this.buildToolbar();
    
  }
  
  onTest() {
    console.log(1)
  }
  // Build Toolbar (them moi)
  buildToolbar = () => {
    let toolbarList = [];
    toolbarList = [ToolbarItem.ADD];
    this.toolbar = this.globals.buildToolbar(
      "cms-app-sysusergroup",
      toolbarList
    );
  };

  loadData() {              //get Data
    const state = { take: 20, skip: 0 };
    if (this.state && this.state.take) {
      this.state.skip = this.state.skip;
      this.state.take = this.state.take;
      this.pageIndex = Math.floor(this.state.skip / this.state.take);
    } else {
      this.state = state;
      this.pageIndex = 0;
    };
    let extraParams = [];
    this._coreService.execute(this.state, "get-list-blogcategory", extraParams);
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {  // cap nhat Data khi chuyen Page(1,2,...)
    this.state = state;
    console.log(this.state)
    this.pageIndex = Math.floor(state.skip / state.take);
    let extraParams = [];
    if (this.search.text) {
      extraParams.push({
        field: "text",
        value: this.search.text,
      });
    }
    this._coreService.execute(state, "get-list-blogcategory", extraParams);
  }

  // click toolbar Chức vụ (them moi dan den o nhap thong tin)
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    switch (buttonId) {
      case ToolbarItem.ADD:
        this.router.navigate(["/cms/blog/bloglist/new"]);
        break;
      default:
        break;
    }
  };

  formatStt = (index: string) => {      // Phan so thu tu list Data
    if (this.gridInstance) {
      return (
        (this.gridInstance.pageSettings.currentPage - 1) *
        this.gridInstance.pageSettings.pageSize +
        parseInt(index, 0) +
        1
      );
    }
  };
  getListData() {}
  clickRecord(e, x) {}
  searchListEnter() {}


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}