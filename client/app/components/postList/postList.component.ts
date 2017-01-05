import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Post} from "../models/post";
import {PostService} from "../../services/post.service";
import {SelectedPostService} from "../../services/selected-post.service";

@Component({
    moduleId: module.id,
    selector: 'post-list',
    templateUrl: 'postList.component.html',
    styleUrls: [ 'postList.component.css' ]
})
export class PostListComponent implements OnInit {
    posts: Post[] = [];

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
                resData => this.posts = resData.posts
            );
    }
}

