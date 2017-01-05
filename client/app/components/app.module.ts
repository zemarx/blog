import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from '../services/auth.service';

import { AppComponent }         from './app.component';
import { PostListComponent } from './postList/postList.component';
import { PostSelectedComponent } from './postSelected/postSelected.component';
import { PostService } from '../services/post.service';
import { AddPostComponent } from './addPost/addPost.component';
import { AuthGuard } from '../util/auth.guard';

import { routing } from './routes/app.routing';
import {SelectedPostService} from '../services/selected-post.service';
import {EditPostComponent} from './editPost/editPost.component';
import {AddPostComment} from "./addPostComment/addPostComment.component";
import {PostCommentList} from "./postCommentList/postCommentList.component";
import {CommentService} from "../services/comment.service";
import {PostCommentWrapper} from "./postCommentList/postCommentWrapper.component";
import {Comment} from "./comment/comment.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        PostListComponent,
        PostSelectedComponent,
        AddPostComponent,
        EditPostComponent,
        AddPostComment,
        PostCommentList,
        PostCommentWrapper,
        Comment
    ],
    providers: [
        PostService,
        CommentService,
        SelectedPostService,
        AUTH_PROVIDERS,
        AuthService,
        AuthGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
