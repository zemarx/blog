import {Component, Input, OnInit} from "@angular/core";
import {Comment} from '../../models/comment.model'
import {Post} from "../../models/post.model";
import {CommentService} from "../../services/comment.service";

@Component({
    selector: 'comment',
    templateUrl: 'comment.component.html',
    styleUrls: [ 'comment.component.css' ]
})
export class CommentComponent implements OnInit {
    @Input() private selectedPost: Post;
    @Input() private comment: Comment;

    private commentReply: Comment = null;
    private showReply: boolean = false;

    constructor(private commentService: CommentService) { }

    ngOnInit(): void { }

    toggleReply(): void {
        this.showReply = !this.showReply;

        if (this.showReply) {
            this.commentReply = new Comment('', this.selectedPost._id, this.comment._id, '', '', null, []);
        }
    }

    submitReply(): void {
        this.toggleReply();

        this.commentService.addNewComment(this.commentReply)
            .subscribe(res => {
                let comment = res;
                this.comment.children.push(comment);
                this.commentReply = null;
            });
    }
}
