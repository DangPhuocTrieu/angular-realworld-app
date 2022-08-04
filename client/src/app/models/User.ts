export interface User {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    bio?: string;
    avatar?: string;
    accessToken?: string;
}