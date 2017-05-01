import {Comment} from './../../models/comment.model';
import {Component, OnInit, Input} from '@angular/core';
import {Post} from "../../models/post.model";
import {CommentService} from "../../services/comment.service";

@Component({
    selector: 'add-comment',
    templateUrl: 'add-post-comment.component.html',
    styleUrls: [ 'add-post-comment.component.css' ]
})
export class AddPostCommentComponent implements OnInit {
    @Input() private selectedPost: Post;
    @Input() comments: Array<Comment>;

    private comment: Comment;

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
        this.comment = new Comment(null, this.selectedPost._id , '','','', null, []);
    }

    onSubmit(): void {
        this.commentService.addNewComment(this.comment)
            .subscribe(res => {
                let comment = res;
                this.comments.push(comment);
                this.comment = new Comment(null, this.selectedPost._id , '','','', null, []);
            });
    }
}
