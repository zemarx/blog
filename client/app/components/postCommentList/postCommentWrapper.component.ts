import {Component, OnInit, Input} from "@angular/core";
import {CommentService} from "../../services/comment.service";
import {PostCommentListComponent} from './postCommentList.component';
import {Post} from "../models/post";
import {Comment} from "../models/comment";

@Component({
    moduleId: module.id,
    selector: 'comment-list-wrapper',
    template: '<comment-list class="comment-list-wrapper" [comments]="comments" [selectedPost]="selectedPost"></comment-list>',
    providers: [
        PostCommentListComponent
    ]
})
export class PostCommentWrapperComponent implements OnInit {
    @Input() private selectedPost: Post;

    private comments: Array<Comment> = [];

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
        this.getAllComments();
    }

    getAllComments(): void {
        this.comments = this.commentService.getAllComments(this.selectedPost._id);
    }
}
