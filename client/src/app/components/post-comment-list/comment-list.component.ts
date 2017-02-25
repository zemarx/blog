import {Component, Input} from "@angular/core";
import {CommentComponent} from '../comment/comment.component';
import {Post} from "../../models/post.model";

@Component({
    selector: 'comment-list',
    template: '<comment *ngFor="let comment of comments" [comment]="comment" [selectedPost]="selectedPost" class="comment-list-item"></comment>',
    providers: [
        CommentComponent
    ]
})
export class CommentListComponent {
    @Input() private selectedPost: Post;
    @Input() private comments: Object[] = [];
}
