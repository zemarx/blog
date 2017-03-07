import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Post } from "../../models/post.model";
import { SelectedPostService } from "../../services/selected-post.service";
import { AuthService } from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AddPostCommentComponent} from '../add-post-comment/add-post-comment.component'
import {CommentListWrapperComponent} from "../post-comment-list/comment-list-wrapper.component";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'post-selected',
    templateUrl: 'post-selected.component.html',
    styleUrls: [ 'post-selected.component.css' ],
    providers: [
        AuthService,
        AddPostCommentComponent,
        CommentListWrapperComponent
    ]
})
export class PostSelectedComponent implements OnInit {
    private selectedPost: Post = null;

    constructor(private location: Location,
                private selectedPostService: SelectedPostService,
                private authService: AuthService,
                private postService: PostService,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        this.selectedPost = this.selectedPostService.getSelectedPost();

        // If selected post is not initialized, get it from the server by id from url parameter
        if (this.selectedPost === null || this.selectedPost === undefined || !this.selectedPost) {
            this.activatedRoute.params
                .map((params: Params) => params['_id'])
                .subscribe((id) => {
                    this.postService.getPost(id)
                        .subscribe(data => {
                            this.selectedPost = data;
                            this.selectedPostService.setSelectedPost(data);
                        });
                });
        }
    }

    goBack(): void {
        this.location.back();
    }

    deletePost(): void {
        let deletePostConfirm = confirm("Вы уверены что хотите удалить этот пост?");

        if (!deletePostConfirm) return;

        this.postService.deletePost(this.selectedPost._id)
            .subscribe(
                () => {
                    this.selectedPostService.setSelectedPost(null);
                    this.router.navigate(['/postlist']);
                }
            );
    }
}
