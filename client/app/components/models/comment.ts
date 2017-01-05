export class Comment {

    constructor(
        public _id: string,
        public postId: string,
        public parentCommentId: string,
        public authorName: string,
        public content: string,
        public dateAdded: Date
    ) {}
}