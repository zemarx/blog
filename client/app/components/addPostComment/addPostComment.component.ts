import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comment'
import {SelectedPostService} from "../../services/selected-post.service";
import {PlatformLocation} from "@angular/common";
import {CommentService} from "../../services/comment.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'add-comment',
    templateUrl: 'addPostComment.component.html',
    styleUrls: [ 'addPostComment.component.css' ]
})
export class AddPostComment implements OnInit {

    comment: Comment;

    constructor(private selectedPostService: SelectedPostService,
                private commentService: CommentService,
                private platformLocation: PlatformLocation) { }

    ngOnInit(): void {
        this.comment = new Comment(null, this.selectedPostService.getSelectedPost()._id , null,'','', null);
        console.log(window.location.origin);
    }

    onSubmit(): void {
        this.commentService.addNewComment(this.selectedPostService.getSelectedPost()._id, this.comment)
            .subscribe(
                res => {
                    console.log(JSON.stringify(res, null, 2));
                    //this.router.navigate(['/postlist']);
                }
            );
    }
}