import {Component, OnInit, Input} from '@angular/core';
import {Comment} from '../models/comment'
import {PlatformLocation} from "@angular/common";
import {CommentService} from "../../services/comment.service";
import {Post} from "../models/post";

@Component({
    moduleId: module.id,
    selector: 'add-comment',
    templateUrl: 'addPostComment.component.html',
    styleUrls: [ 'addPostComment.component.css' ]
})
export class AddPostComment implements OnInit {
    @Input() private selectedPost: Post;

    private comment: Comment;

    constructor(private commentService: CommentService,
                private platformLocation: PlatformLocation) { }

    ngOnInit(): void {
        this.comment = new Comment('', this.selectedPost._id , '','','', null, []);
        console.log(window.location.origin);
    }

    onSubmit(): void {
        this.commentService.addNewComment(this.comment)
            .subscribe(
                res => {
                    console.log(JSON.stringify(res, null, 2));
                    //this.router.navigate(['/postlist']);
                }
            );
    }
}