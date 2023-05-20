export default interface User {
    username: string;
    email: string;
    isAdmin: boolean;
    verified: boolean;
    level: number;
    date: Date;
}