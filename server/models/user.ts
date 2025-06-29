// server/models/user.ts
export interface User {
    id?: number; // ? หมายถึง optional (อาจจะยังไม่มีตอนสร้าง)
    studentcode?: string; 
    username: string;
    password_hash: string; // ควรเก็บเป็น hash เสมอ
    role: 'employee' | 'manager'; // กำหนดบทบาท
    full_name: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}