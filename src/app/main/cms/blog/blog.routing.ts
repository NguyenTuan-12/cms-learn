import { Routes } from "@angular/router";

export const BlogRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/blog",
    pathMatch: "full",
  },
  {
    path: 'bloglist',
    loadChildren: "./bloglist/bloglist.module#BlogListModule",
  }
];
