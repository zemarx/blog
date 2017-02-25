import {Component, OnInit} from "@angular/core";
import {Location} from '@angular/common';
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {Router} from '@angular/router';

@Component({
    selector: 'post-add',
    templateUrl: 'add-post.component.html',
    styleUrls: [ 'add-post.component.css' ]
})
export class AddPostComponent implements OnInit {
    private isFormSubmitted = false;
    private post: Post;

    constructor(private location: Location,
                private postService: PostService,
                private router: Router) { }

    ngOnInit() {
        this.post = new Post(null, '', '', '', new Date());
    }

    onSubmit() {
        //ask if user is sure to create post with these contents

        this.isFormSubmitted = true;

        //if form is valid continue

        this.postService.addNewPost(this.post)
            .subscribe(
                res => {
                    console.log(JSON.stringify(res, null, 2));
                    this.router.navigate(['/postlist']);
                }
            );
    }

    goBack(): void {
        this.location.back();
    }
}