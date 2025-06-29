// Level is mean department not level
export interface Level {
    levelid?: number; // Auto increment primary key
    levelcode: string; // varchar(50)
    levelname: string; // varchar(250)
    linetokenaccess: string; // varchar(250)
    fullqty: number; // int(11)
    comeqty: number; // int(11)
    active: number; // tinyint(4) - 0 = inactive, 1 = active
    created_at?: Date;
    updated_at?: Date;
}
