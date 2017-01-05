import {Component, Input} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'comment',
    templateUrl: 'comment.component.html',
    styleUrls: [ 'comment.component.css' ]
})
export class Comment {
    @Input() comment: Comment;

    showReply: boolean = false;

    constructor() { }

    reply(): void {
        this.showReply = !this.showReply;
    }

}