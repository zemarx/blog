import {Injectable} from '@angular/core';
import {Post} from '../components/models/post';


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
