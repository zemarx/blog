import {Component, OnInit} from "@angular/core";
import {CommentService} from "../../services/comment.service";

@Component({
    moduleId: module.id,
    selector: 'comment-list-wrapper',
    template: '<comment-list class="comment-list-wrapper" [comments]="comments"></comment-list>',
    styleUrls: ['postCommentWrapper.component.css']
})
export class PostCommentWrapper implements OnInit {
    comments: Object[];

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
        this.comments = this.commentService.getAllComments();
    }
}