import {Component, Input, OnInit} from "@angular/core";
import {Comment} from '../../models/comment.model'
import {Post} from "../../models/post.model";

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

    constructor() { }

    ngOnInit(): void {
        // this.commentReply = new Comment('', this.selectedPost._id, this.comment._id, '', '', null, []);
    }

    toggleReply(): void {
        this.showReply = !this.showReply;

        if (this.showReply) {
            this.commentReply = new Comment('', this.selectedPost._id, this.comment._id, '', '', null, []);
        }
    }

    submitReply(): void {
        this.toggleReply();

        this.commentReply._id = '1241';
        this.commentReply.dateAdded = new Date();

        // Clone comment object so that we break the reference to the current commentReply
        let tmpCommentReply = JSON.parse(JSON.stringify(this.commentReply));
        this.comment.children.push(tmpCommentReply);

        this.commentReply = null;
    }
}
