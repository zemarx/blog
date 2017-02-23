import {Component, OnInit} from "@angular/core";
import {Location} from '@angular/common';
import {Post} from "../models/post";
import {SelectedPostService} from "../../services/selected-post.service";
import {PostService} from "../../services/post.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'post-edit',
    templateUrl: 'editPost.component.html',
    styleUrls: [ 'editPost.component.css' ]
})
export class EditPostComponent implements OnInit {
    private selectedPost: Post = null;

    constructor(private location: Location,
                private selectedPostService: SelectedPostService,
                private postService: PostService,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.selectedPost = this.selectedPostService.getSelectedPost();

        // If selected post is not initialized, get it from the server by id from url parameter
        if (this.selectedPost === null || !this.selectedPost) {
            this.activatedRoute.params
                .map((params: Params) => params['_id'])
                .subscribe((id) => {
                    this.postService
                        .getPost(id)
                        .subscribe(data => {
                            this.selectedPost = data.post;
                            this.selectedPostService.setSelectedPost(data.post);
                        });
                });
        }
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