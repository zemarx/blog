import {Component, OnInit, Input} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {Post} from "../../models/post.model";
import {CommentService} from "../../services/comment.service";

@Component({
    selector: 'add-comment',
    templateUrl: 'add-post-comment.component.html',
    styleUrls: [ 'add-post-comment.component.css' ]
})
export class AddPostCommentComponent implements OnInit {
    @Input() private selectedPost: Post;

    private comment: Comment;

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
        this.comment = new Comment(null, this.selectedPost._id , '','','', null, []);
    }

    onSubmit(): void {
        this.commentService.addNewComment(this.comment)
            .subscribe(
                res => {
                    // TODO: maybe a notification????
                    console.log(JSON.stringify(res, null, 2));
                }
            );
    }
}
