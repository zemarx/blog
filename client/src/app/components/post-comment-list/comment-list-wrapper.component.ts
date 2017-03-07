import {Component, OnInit, Input} from "@angular/core";
import {CommentService} from "../../services/comment.service";
import {CommentListComponent} from './comment-list.component';
import {Post} from "../../models/post.model";
import {Comment} from "../../models/comment.model";

@Component({
    selector: 'comment-list-wrapper',
    template: `
        <div>
            <comment-list class="comment-list-wrapper" [comments]="comments" [selectedPost]="selectedPost">
            </comment-list>
            <add-comment *ngIf="selectedPost" [selectedPost]="selectedPost" [comments]="comments"></add-comment>
        </div>`,
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
        // this.comments = this.commentService.getAllComments(this.selectedPost._id);

        this.commentService.getPostComments(this.selectedPost._id)
            .subscribe(
                res => {
                    let postComments = res;
                    this.comments = postComments;
                }
            )
    }
}
