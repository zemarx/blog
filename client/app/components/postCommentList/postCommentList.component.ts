import {Component, Input} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'comment-list',
    templateUrl: 'postCommentList.component.html',
    styleUrls: [ 'postCommentList.component.css' ],
    providers: [
        Comment
    ]
})
export class PostCommentList {
    @Input() comments: Object[] = [];

    showReply: boolean = false;

    constructor() { }

    reply(): void {
        this.showReply = !this.showReply;
    }

}