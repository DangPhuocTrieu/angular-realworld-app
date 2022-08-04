import { User } from "./User";

export interface Article {
    _id: string;
    title: string;
    description: string;
    body: string;
    tagList?: string[];
    favoritesCount?: number;
    author: User;
}