import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSelectedComponent } from '../components/post-selected/post-selected.component';
import { PostListComponent } from "../components/post-list/post-list.component";
import { AddPostComponent } from "../components/add-post/add-post.component";
import { EditPostComponent } from "../components/edit-post/edit-post.component";
import { AuthGuard } from "../utils/auth.guard";

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
