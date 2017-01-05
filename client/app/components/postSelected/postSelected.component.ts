import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Post } from "../models/post";
import { SelectedPostService } from "../../services/selected-post.service";
import { AuthService } from "../../services/auth.service";

import 'rxjs/add/operator/map';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import { AddPostComment } from '../addPostComment/addPostComment.component'
import {PostCommentWrapper} from "../postCommentList/postCommentWrapper.component";

@Component({
    moduleId: module.id,
    selector: 'post-selected',
    templateUrl: 'postSelected.component.html',
    styleUrls: [ 'postSelected.component.css' ],
    providers: [
        AuthService,
        AddPostComment,
        PostCommentWrapper
    ]
})
export class PostSelectedComponent implements OnInit {

    selectedPost: Post;

    constructor(private location: Location,
                private selectedPostService: SelectedPostService,
                private authService: AuthService,
                private postService: PostService,
                private router: Router) { }

    ngOnInit(): void {
        this.selectedPost = this.selectedPostService.getSelectedPost();
    }

    goBack(): void {
        this.location.back();
    }

    deletePost(): void {
        let deletePostConfirm = confirm("Вы уверены что хотите удалить этот пост?");

        if (!deletePostConfirm) {
            return;
        }

        this.postService.deletePost(this.selectedPost._id)
            .subscribe(
                () => {
                    //console.log(JSON.stringify(res, null, 2));
                    this.selectedPostService.setSelectedPost(null);
                    this.router.navigate(['/postlist']);
                }
            );
    }


}