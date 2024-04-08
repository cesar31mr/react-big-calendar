export interface DateEntity {
    id: string;
    user: string;
    start: Date;
    end: Date;
    title: string;
}

export interface DateEntityCreation{
    user: string;
    start: Date;
    end: Date;
    title: string;
}