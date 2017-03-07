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

    handleEditorKeyUp (editorContent) {
        console.log(JSON.stringify(editorContent, null, 2));
    }

    onSubmit() {
        this.isFormSubmitted = true;

        this.postService.addNewPost(this.post)
            .subscribe(res => this.router.navigate(['/postlist']) );
    }

    goBack(): void {
        this.location.back();
    }
}
