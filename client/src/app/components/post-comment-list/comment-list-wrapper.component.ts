import {Component, OnInit, Input} from "@angular/core";
import {CommentService} from "../../services/comment.service";
import {CommentListComponent} from './comment-list.component';
import {Post} from "../../models/post.model";
import {Comment} from "../../models/comment.model";

@Component({
    selector: 'comment-list-wrapper',
    template: '<comment-list class="comment-list-wrapper" [comments]="comments" [selectedPost]="selectedPost"></comment-list>',
    providers: [
        CommentListComponent
    ]
})
export class CommentListWrapperComponent implements OnInit {
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
