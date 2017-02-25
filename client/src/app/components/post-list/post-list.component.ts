import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {SelectedPostService} from "../../services/selected-post.service";

@Component({
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: [ 'post-list.component.css' ]
})
export class PostListComponent implements OnInit {
    private posts: Array<Post> = [];

    constructor(private postService: PostService,
                private selectedPostService: SelectedPostService) { }

    ngOnInit(): void {
        this.getAllPosts();
    }

    setSelectedPost(post: Post): void {
        this.selectedPostService.setSelectedPost(post);
    }

    getAllPosts(): any {
        this.postService.getAllPosts()
            .subscribe(
                data => this.posts = data.posts
            );
    }
}
