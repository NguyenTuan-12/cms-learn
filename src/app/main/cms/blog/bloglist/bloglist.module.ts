import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './bloglist.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CoreService } from 'src/app/_services/core.service';


const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [BlogListComponent],
  providers: [CoreService]
})
export class BlogListModule {}
