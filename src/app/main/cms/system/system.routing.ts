import { Routes } from "@angular/router";

export const SystemRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/system",
    pathMatch: "full",
  },
  {
    path: 'sysusergroup',
    loadChildren: "./usergroup/usergroup.module#SysUserGroupModule",
  },
  {
    path: 'sysuser',
    loadChildren: "./user/user.module#SysUserModule",
  }
];
