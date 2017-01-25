import {Component, Input} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'comment-list',
    template: '<comment *ngFor="let comment of comments" [comment]="comment" class="comment-list-item"></comment>',
    providers: [Comment]
})
export class PostCommentList {
    @Input() comments: Object[] = [];
}
