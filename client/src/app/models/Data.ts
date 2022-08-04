import { Article } from './Article';
import { User } from './User'

export interface Data {
    success: boolean;
    message: string;
    data: User | Article[] | Article
}