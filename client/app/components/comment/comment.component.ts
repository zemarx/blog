import {Component, Input} from "@angular/core";
import {PostCommentList} from "../postCommentList/postCommentList.component";

@Component({
    moduleId: module.id,
    selector: 'comment',
    templateUrl: 'comment.component.html',
    styleUrls: [ 'comment.component.css' ],
    providers: [
        PostCommentList
    ]
})
export class Comment {
    @Input() comment: Comment;

    showReply: boolean = false;

    constructor() { }

    reply(): void {
        this.showReply = !this.showReply;
    }

}
