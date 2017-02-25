import {Injectable} from '@angular/core';
import {Post} from '../models/post.model';


@Injectable()
export class SelectedPostService {
    post: Post;

    public setSelectedPost(post: Post): void {
        this.post = post;
    }

    public getSelectedPost(): Post {
        return this.post;
    }
}
