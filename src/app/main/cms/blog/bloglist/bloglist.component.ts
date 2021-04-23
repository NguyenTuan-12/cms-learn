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
import { ModalService } from "src/app/_services/modal.service";
import { Notification } from "src/app/common/notification";
import * as _ from "lodash";


@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss',]
})
export class BlogListComponent implements OnInit {

  public search = {
    text: ""
  };
  public modelDelete: any = [];

  // View child Grid
  @ViewChild("overviewgrid", { static: false })        //html ejs-grid #overviewgrid => su dung overviewgrid nhu 1 component con
  public gridInstance: GridComponent;                  //add luoi de su dung
  public subscription: Subscription;                   //theo doi bien dong tu trang, khi destroy se unsubcribe
  public data: Observable<DataStateChangeEventArgs>;   // cap nhat data tu coreService
  public state: DataStateChangeEventArgs;             // DataStateChangeEventArgs: model chung cho du lieu
  public toolbar: ToolbarInterface[];                 //ToolbarInterface[] dinh nghia chuc nang Toolbar co san
  pageIndex = 0 ;
  public modelAdd: any;
  modelStatus: number;

  constructor(
    public _coreService: CoreService,        // method lay data
    public configs: Configs,                // tao khung cho list danh sach
    public router: Router,                  // link router
    private globals: Globals,
    private _configService: ConfigService,  // giu trang khi F5
    private modalService: ModalService,
    private notification: Notification,     
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
  searchListEnter() {};

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
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getListData() {}

  confirmDelete = (status): void => { //  xac nhan va xoa tren View
    if (status === "cancel") {
      this.modalService.close('confirm-delete-modal');
    } else {
      const selectDeletes: any = this.gridInstance.getSelectedRecords();
      // gọi API xóa ở đây
      let lstDeleteIds = _.map(selectDeletes, "_id");

      if (lstDeleteIds && lstDeleteIds.length > 0) {
        this._coreService
          .Post("remove-blog", {
            id: lstDeleteIds[0]
          })
          .subscribe((success) => {
            this.notification.deleteSuccess();
            this.modalService.close('confirm-delete-modal');
            this.gridInstance.clearSelection();
            this.gridInstance.refresh();
          }, error => {
            this.notification.deleteError();
          });
      }
      this.modalService.close("confirm-delete-modal");
    }
  };

  confirmChangStatus = (status): void => {    //  xac nhan va xoa tren Data chinh
    if (status === "cancel") {
      this.modalService.close('confirm-changestatus-modal');
    } else {
      const selectDeletes: any = this.gridInstance.getSelectedRecords();
      // gọi API xóa ở đây
      let lstChangeStatus = _.map(selectDeletes, "_id");
      let status = this.modelStatus
      if (lstChangeStatus && lstChangeStatus.length > 0) {
        this._coreService
          .Post("update-status-blog", {
            id: lstChangeStatus[0],
            status: this.modelStatus
          })
          .subscribe((success) => {
            if (this.modelStatus == 1) {
              this.notification.approveSuccess();
            } else {
              this.notification.denySuccess();
            }
            this.modalService.close('confirm-changestatus-modal');
            this.gridInstance.clearSelection();
            this.gridInstance.refresh();
          }, error => {
            this.notification.deleteError();
          });
      }
      this.modalService.close("confirm-changestatus-modal");
    }
  };

  clickRecord = (data, status) => {     // truyen param de thuc hien them sua xoa
    if (data && status === 'view') {
      console.log(data)
      this.modelAdd = data;
      const objParamAdd = { id: this.modelAdd._id, type: "view" };
      const paramAdd = window.btoa(JSON.stringify(objParamAdd));
      // window.open("/cms/blog/bloglist/" + paramAdd, "_blank");
      this.router.navigate(["/cms/blog/bloglist", paramAdd]);
    }
    if (data && status === 'edit') {
      this.modelAdd = data;
      const objParamAdd = { id: this.modelAdd._id, type: "edit" };
      const paramAdd = window.btoa(JSON.stringify(objParamAdd));
      this.router.navigate(["/cms/blog/bloglist", paramAdd]);
    }
    if (data && status === 'delete') {
      this.modelDelete = data.id;
      this.modalService.open("confirm-delete-modal");
    }
    if (data && status === 'approve') {
      this.modelStatus = 1;
      this.modalService.open("confirm-changestatus-modal");
    }
    if (data && status === 'deny') {
      this.modelStatus = 3;
      this.modalService.open("confirm-changestatus-modal");
    }
  };
}

  



  












// ---------------------------------------------------------------------------------------//



















// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
// } from "@angular/core";
// import { Subject } from "rxjs";
// import { Observable } from "rxjs";
// import { Router } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "src/app/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files

// // Globals File
// import { Globals } from "src/app/common/globals";
// import { Configs } from "src/app/common/configs";
// import { Notification } from "src/app/common/notification";
// import * as _ from "lodash";
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   GridComponent,
//   EditSettingsModel,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";

// import {
//   DataStateChangeEventArgs,
// } from "@syncfusion/ej2-grids";
// import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
// import { CoreService } from "src/app/_services/core.service";
// import { ConfigService } from "src/app/_services/config.service";
// import { ModalService } from "src/app/_services/modal.service";
// import {
//   ListBoxComponent,
//   CheckBoxSelection,
// } from "@syncfusion/ej2-angular-dropdowns";
// ListBoxComponent.Inject(CheckBoxSelection);
// setCulture("vi");

// @Component({
//   selector: "cms-app-bloglist",
//   templateUrl: "./bloglist.component.html",
//   styleUrls: ["./bloglist.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class BlogListComponent implements OnInit {
//   // Varriable Language
//   languages: any;
//   selectedLanguage: any;
//   pageIndex = 0;
//   public editSettingCustom: EditSettingsModel;

//   public data: Observable<DataStateChangeEventArgs>;
//   // View child Grid
//   @ViewChild("overviewgrid", { static: false })
//   public gridInstance: GridComponent;

//   // public editSettings: Object;
//   public state: DataStateChangeEventArgs;
//   // search

//   public selectAllText = "Chọn tất cả";
//   public unSelectAllText = "Bỏ chọn tất cả";
//   public mode = "CheckBox";
//   public search = {
//     text: ""
//   };
//   public selection = {
//     showCheckbox: true,
//     showSelectAll: true,
//   };

//   // Toolbar Item
//   public toolbar: ToolbarInterface[];

//   // List data
//   public modelAdd: any;
//   public modelDelete: any = [];
//   // Private
//   private _unsubscribeAll: Subject<any>;
//   pageSize: number;
//   node: NodeListOf<HTMLElement>;
//   indexOfRecord: any;
//   modelStatus: number;
//   /**
//    * Constructor
//    *
//    */
//   constructor(
//     private _coreService: CoreService,
//     private modalService: ModalService,
//     private notification: Notification,
//     private globals: Globals,
//     public configs: Configs,
//     public router: Router,
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     this.data = _coreService;
//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
    

//     // Set the private defaults
//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
//   }

//   /**
//    * On init
//    */
//   ngOnInit(): void {
//     // Set the selected language from default languages
//     this.selectedLanguage = _.find(this.languages, {
//       id: this._translateService.currentLang,
//     });
//     this._translateService.use(this.selectedLanguage.id);

//     // Build toolbar
//     this.buildToolbar();
//     this.editSettingCustom = {
//       allowEditing: false,
//       allowAdding: false,
//       allowDeleting: true,
//       mode: "Normal",
//       newRowPosition: "Bottom",
//     };
//     // Load List Data
//     this.getListData();
    
//   }
 
//   // double click xem ban ghi
//   viewRecord = (e) => {
//     this.modelAdd = e.rowData;
//     const objParamAdd = { id: this.modelAdd.id, type: "view" };
//     const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//     window.open("/cms/blog/bloglist/" + paramAdd, "_blank");
//   };

//   formatStt = (index: string) => {
//     if (this.gridInstance) {
//       return (
//         (this.gridInstance.pageSettings.currentPage - 1) *
//         this.gridInstance.pageSettings.pageSize +
//         parseInt(index, 0) +
//         1
//       );
//     }
//   };

//   // Build Toolbar
//   buildToolbar = () => {
//     let toolbarList = [];
//     toolbarList = [ToolbarItem.ADD];
//     this.toolbar = this.globals.buildToolbar(
//       "cms-app-bloglist",
//       toolbarList
//     );
//   };
//   // GetListData
//   getListData = (): void => {
//     const state = { take: 20, skip: 0 };
//     if (this.state && this.state.take) {
//       this.state.skip = this.state.skip;
//       this.state.take = this.state.take;
//       this.pageIndex = Math.floor(this.state.skip / this.state.take);
//     } else {
//       this.state = state;
//       this.pageIndex = 0;
//     };
//     let extraParams = [];
//     // Xét có điều kiện tìm kiếm
//     if (this.search.text) {
//       extraParams.push({
//         field: "text",
//         value: this.search.text,
//       });
//     }
//     if (this.gridInstance) {
//       this.gridInstance.goToPage(1);
//     }
//     this._coreService.execute(this.state, "get-list-blog", extraParams);
//   };
//   onTest() {
//     console.log(this.gridInstance.pageSettings)
//   };
//   public dataStateChange(state: DataStateChangeEventArgs): void {
//     this.state = state;
//     this.pageIndex = Math.floor(state.skip / state.take);
//     let extraParams = [];
//     if (this.search.text) {
//       extraParams.push({
//         field: "text",
//         value: this.search.text,
//       });
//     }
//     this._coreService.execute(state, "get-list-blog", extraParams);
//   }

//   searchListEnter = (event): void => {
//     if (event.keyCode === 13) {
//       this.getListData();
//     }
//   };

  

//   // click toolbar Chức vụ
//   clickToolbar = (itemButton: any): void => {
//     debugger
//     const buttonId = itemButton.id;
//     switch (buttonId) {
//       case ToolbarItem.ADD:
//         this.router.navigate(["/cms/blog/bloglist/new"]);
//         break;
//       default:
//         break;
//     }
//   };

//   // xóa
//   confirmDelete = (status): void => {
//     if (status === "cancel") {
//       this.modalService.close('confirm-delete-modal');
//     } else {
//       const selectDeletes: any = this.gridInstance.getSelectedRecords();
//       // gọi API xóa ở đây
//       let lstDeleteIds = _.map(selectDeletes, "_id");

//       if (lstDeleteIds && lstDeleteIds.length > 0) {
//         this._coreService
//           .Post("remove-blog", {
//             id: lstDeleteIds[0]
//           })
//           .subscribe((success) => {
//             this.notification.deleteSuccess();
//             this.modalService.close('confirm-delete-modal');
//             this.gridInstance.clearSelection();
//             this.gridInstance.refresh();
//           }, error => {
//             this.notification.deleteError();
//           });
//       }
//       this.modalService.close("confirm-delete-modal");
//     }
//   };
//   confirmChangStatus = (status): void => {
//     if (status === "cancel") {
//       this.modalService.close('confirm-changestatus-modal');
//     } else {

//       const selectDeletes: any = this.gridInstance.getSelectedRecords();
//       // gọi API xóa ở đây
//       let lstChangeStatus = _.map(selectDeletes, "_id");
//       let status = this.modelStatus
//       if (lstChangeStatus && lstChangeStatus.length > 0) {
//         this._coreService
//           .Post("update-status-blog", {
//             id: lstChangeStatus[0],
//             status: this.modelStatus
//           })
//           .subscribe((success) => {
//             if (this.modelStatus == 1) {
//               this.notification.approveSuccess();
//             } else {
//               this.notification.denySuccess();
//             }
//             this.modalService.close('confirm-changestatus-modal');
//             this.gridInstance.clearSelection();
//             this.gridInstance.refresh();
//           }, error => {
//             this.notification.deleteError();
//           });
//       }
//       this.modalService.close("confirm-changestatus-modal");
//     }
//   };

//   ngOnDestroy(): void {
//   }

//   clickRecord = (data, status) => {
//     if (data && status === 'view') {
//       this.modelAdd = data;
//       const objParamAdd = { id: this.modelAdd._id, type: "view" };
//       const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//       // window.open("/cms/blog/bloglist/" + paramAdd, "_blank");
//       this.router.navigate(["/cms/blog/bloglist", paramAdd]);
//     }
//     if (data && status === 'edit') {
//       this.modelAdd = data;
//       const objParamAdd = { id: this.modelAdd._id, type: "edit" };
//       const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//       this.router.navigate(["/cms/blog/bloglist", paramAdd]);
//     }
//     if (data && status === 'delete') {
//       this.modelDelete = data.id;
//       this.modalService.open("confirm-delete-modal");
//     }
//     if (data && status === 'approve') {
//       this.modelStatus = 1;
//       this.modalService.open("confirm-changestatus-modal");
//     }
//     if (data && status === 'deny') {
//       this.modelStatus = 3;
//       this.modalService.open("confirm-changestatus-modal");
//     }
//   };
// }
