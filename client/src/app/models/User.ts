import { Article } from "./Article";

export interface User {
    _id: string;
    username: string;
    email: string;
    bio?: string;
    avatar?: string;
    isAdmin: boolean;
    accessToken?: string;
    articles: Article[]
}