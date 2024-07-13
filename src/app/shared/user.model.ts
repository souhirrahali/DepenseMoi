export interface User {
    userId: number;
    firstname:string;
    lastname:string;
    email: string;
    role: 'USER' | 'ADMIN';
}