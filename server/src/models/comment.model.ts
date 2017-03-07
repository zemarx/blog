
export class Comment {
    constructor(
        public _id: string,
        public postId: string,
        public parentId: string,
        public authorName: string,
        public content: string,
        public dateAdded: Date,
        public children: Array<Comment>
    ) {}
}
