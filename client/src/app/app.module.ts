import {NgModule, ApplicationRef} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {AppComponent} from './components/app.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {PostSelectedComponent} from './components/post-selected/post-selected.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {EditPostComponent} from './components/edit-post/edit-post.component';
import {AddPostCommentComponent} from './components/add-post-comment/add-post-comment.component';
import {CommentComponent} from './components/comment/comment.component';
import {CommentListComponent} from './components/post-comment-list/comment-list.component';
import {CommentListWrapperComponent} from './components/post-comment-list/comment-list-wrapper.component';

import {AuthService} from './services/auth.service';
import {PostService} from './services/post.service';
import {CommentService} from './services/comment.service';
import {SelectedPostService} from './services/selected-post.service';

import { AuthGuard } from './utils/auth.guard';
import { routing } from './routes/app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule
    ],
    declarations: [
        AppComponent,
        PostListComponent,
        PostSelectedComponent,
        AddPostComponent,
        EditPostComponent,
        AddPostCommentComponent,
        CommentComponent,
        CommentListComponent,
        CommentListWrapperComponent
    ],
    providers: [
        AuthService,
        PostService,
        CommentService,
        SelectedPostService,
        AuthGuard,
        AUTH_PROVIDERS
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}

    hmrOnInit(store: any) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store: any) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: any) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
