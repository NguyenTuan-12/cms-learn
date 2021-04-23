import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './bloglist.component';
import { BlogListEditComponent } from './edit/bloglist-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CoreService } from 'src/app/_services/core.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { ImgurApiService } from 'src/app/_services/imgur.service';
// toolbar + imgur (2 import tren se hien list-edit-component)
// dong thoi khai bao trong provider: 

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: ':id',
    component: BlogListEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [BlogListComponent,BlogListEditComponent],
  providers: [CoreService,ToolbarService, LinkService, ImageService, HtmlEditorService,ImgurApiService]
})
export class BlogListModule {}
