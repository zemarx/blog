export class Post {

    constructor(
        public _id: string,
        public authorName: string,
        public title: string,
        public content: string,
        public dateAdded: Date
    ) {}
}