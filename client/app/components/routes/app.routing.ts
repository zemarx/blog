import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSelectedComponent } from '../postSelected/postSelected.component';
import { PostListComponent } from "../postList/postList.component";
import { AddPostComponent } from "../addPost/addPost.component";
import { EditPostComponent } from "../editPost/editPost.component";
import { AuthGuard } from "../../util/auth.guard";

const appRoutes: Routes = [
    {
        path: 'post/:_id',
        component: PostSelectedComponent
    },
    {
        path: 'postlist',
        component: PostListComponent
    },
    {
        path: 'addpost',
        component: AddPostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'editpost/:_id',
        component: EditPostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/postlist',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
