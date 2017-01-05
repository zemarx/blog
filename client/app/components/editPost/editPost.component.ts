import {Component, OnInit} from "@angular/core";
import {Location} from '@angular/common';
import {Post} from "../models/post";
import {SelectedPostService} from "../../services/selected-post.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'post-edit',
    templateUrl: 'editPost.component.html',
    styleUrls: [ 'editPost.component.css' ]
})
export class EditPostComponent implements OnInit {

    private selectedPost: Post;

    constructor(private location: Location,
                private selectedPostService: SelectedPostService,
                private postService: PostService,
                private router: Router) { }

    ngOnInit() {
        this.selectedPost = this.selectedPostService.getSelectedPost();
    }

    onSubmit() {
        this.updatePost(this.selectedPost);
    }

    updatePost(updatedPost: Post): void {
        let updatePostConfirm = confirm("Вы уверены что хотите обновить этот пост?");

        if (!updatePostConfirm) {
            return;
        }

        this.postService.updatePost(updatedPost._id, updatedPost)
            .subscribe(
                () => {
                    this.selectedPostService.setSelectedPost(null);
                    this.router.navigate(['/postlist']);
                }
            );
    }

    goBack(): void {
        let updatePostCancel = confirm("Вы уверены что хотите отменить редактирование?");

        if (!updatePostCancel) {
            return;
        }

        this.location.back();
    }
}