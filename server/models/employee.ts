// server/models/employee.ts

// Student is mean employee not student

export interface Student {
    id?: number;                    // int(11), PRI, NO_NULL
    studentcode: string;            // varchar(50), NO_NULL
    studentname: string;            // varchar(250), NO_NULL
    studentnamee: string;           // varchar(250), NO_NULL
    schoolcode: string;             // varchar(50), NO_NULL
    levelcode: string;              // varchar(50), NO_NULL
    enrollnumber: number;           // bigint(20), NO_NULL
    mobilerecvmsg: string;          // varchar(250), NO_NULL
    cardno: string;                 // varchar(50), NO_NULL
    studentdate: string;            // varchar(50), NO_NULL
    birthdate: string;              // varchar(50), NO_NULL
    address1: string;               // varchar(250), NO_NULL
    address2: string;               // varchar(250), NO_NULL
    province: string;               // varchar(150), NO_NULL
    salary: number;                 // decimal(12,2), NO_NULL
    mobile: string;                 // varchar(100), NO_NULL
    idcard: string;                 // varchar(100), NO_NULL
    issueby: string;                // varchar(100), NO_NULL
    passport: string;               // varchar(100), NO_NULL
    carlicence: string;             // varchar(100), NO_NULL
    motorlicence: string;           // varchar(100), NO_NULL
    shiftflg: number;               // int(11), NO_NULL
    shiftcode: string;              // varchar(50), NO_NULL
    branchcode: string;             // varchar(50), NO_NULL
    webusercode: string;            // varchar(250), NO_NULL
    active: number;                 // tinyint(4), NO_NULL
    retiredate: string;             // varchar(50), NO_NULL
    pic: string;                    // longtext, NO_NULL
    levelcode2: string;             // varchar(50), NO_NULL
    levelcode3: string;             // varchar(50), NO_NULL
    created_at?: Date;              // Optional timestamp for tracking
    updated_at?: Date;              // Optional timestamp for tracking
}