// server/models/employeeTimeRecord.ts

export interface EmployeeTimeRecord {
    student_id: number;      // int(11), PRI, NO_NULL
    studentcode: string;     // varchar(50), PRI, NO_NULL
    enrollnumber?: number;   // int(11), YES_NULL
    work_date: Date;         // datetime, PRI, NO_NULL (ควรจะเป็น Date object ใน TS)
    studentname?: string;    // varchar(250), YES_NULL (ชื่อพนักงาน)
    levelname?: string;      // varchar(250), YES_NULL (อาจเป็นชื่อแผนก, ตำแหน่ง)
    wintime?: Date | null;   // datetime, YES_NULL (เวลาเข้า)
    wouttime?: Date | null;  // datetime, YES_NULL (เวลาออก)
    time_slot?: string | null; // varchar(101), YES_NULL
    time_in?: Date | null;   // datetime, YES_NULL
    time_out?: Date | null;  // datetime, YES_NULL
    status_in?: string | null; // varchar(8), YES_NULL
    status_out?: string | null; // varchar(8), YES_NULL
    // ไม่มี created_at/updated_at ในตารางที่คุณให้มา
}