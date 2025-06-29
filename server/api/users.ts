// server/api/users.ts
import userRepository from '../repositories/userRepository';

export default defineEventHandler(async (event) => {
  try {
    // ตัวอย่าง: ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await userRepository.findAll();

    return {
      status: 'success',
      data: users,
    };
  } catch (error: any) {
    console.error('API Error:', error);
    // กำหนด statusCode เพื่อให้ Frontend ทราบว่าเกิด error
    event.node.res.statusCode = 500;
    return {
      status: 'error',
      message: 'Failed to fetch users.',
      error: error.message,
    };
  }
});