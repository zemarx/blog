
export class Post {
    constructor(
        public _id: string,
        public author_name: string,
        public title: string,
        public content: string,
        public is_archived: string,
        public last_time_edited: Date,
        public date_created: Date
    ) {}
}
