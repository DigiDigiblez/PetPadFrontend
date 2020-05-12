export interface IPostData {
    id: number;
    mood: string;
    content: string;
    creation_datetime: Date;
    date_last_modified: Date;
    is_open: boolean;
}

export interface IPostList {
    posts: IPostData[];
    total_posts: number;
}
