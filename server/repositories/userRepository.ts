// server/repositories/userRepository.ts
import { User } from '../models/user';
import { getConnection } from '../utils/db';

// Mock data - in a real app, this would be database queries
const users: User[] = [
  { 
    id: 1, 
    username: 'johndoe', 
    password_hash: 'hashed_password_here', 
    role: 'employee',
    full_name: 'John Doe', 
    email: 'john@example.com',
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    id: 2, 
    username: 'janesmith', 
    password_hash: 'hashed_password_here', 
    role: 'manager',
    full_name: 'Jane Smith', 
    email: 'jane@example.com',
    created_at: new Date(),
    updated_at: new Date()
  },
];

export const userRepository = {
  async findAll(): Promise<User[]> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM users ORDER BY created_at DESC');
      return rows as User[];
    } finally {
      connection.release();
    }
  },

  async create(userData: User): Promise<User> {
    const connection = await getConnection();
    try {
      // Hash password (ใน production ควรใช้ bcrypt)
      const hashedPassword = userData.password_hash; // ควร hash จริงๆ
      
      const [result] = await connection.execute(
        `INSERT INTO users (username, password_hash, full_name, email, role, studentcode, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          userData.username,
          hashedPassword,
          userData.full_name,
          userData.email,
          userData.role,
          userData.studentcode || null
        ]
      );

      const insertResult = result as any;
      const newUserId = insertResult.insertId;

      // ดึงข้อมูลที่เพิ่งสร้าง
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [newUserId]
      );

      const newUser = (rows as User[])[0];
      return newUser;
    } finally {
      connection.release();
    }
  },

  async findByUsername(username: string): Promise<User | null> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      const users = rows as User[];
      return users.length > 0 ? users[0] : null;
    } finally {
      connection.release();
    }
  },

  async findByEmail(email: string): Promise<User | null> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      const users = rows as User[];
      return users.length > 0 ? users[0] : null;
    } finally {
      connection.release();
    }
  },

  async findById(id: number): Promise<User | null> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      const users = rows as User[];
      return users.length > 0 ? users[0] : null;
    } finally {
      connection.release();
    }
  },

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    const connection = await getConnection();
    try {
      const updateFields = [];
      const updateValues = [];

      if (userData.username) {
        updateFields.push('username = ?');
        updateValues.push(userData.username);
      }
      if (userData.full_name) {
        updateValues.push(userData.full_name);
      }
      if (userData.email) {
        updateFields.push('email = ?');
        updateValues.push(userData.email);
      }
      if (userData.role) {
        updateFields.push('role = ?');
        updateValues.push(userData.role);
      }
      if (userData.studentcode !== undefined) {
        updateFields.push('studentcode = ?');
        updateValues.push(userData.studentcode);
      }

      updateFields.push('updated_at = NOW()');
      updateValues.push(id);

      await connection.execute(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );

      return this.findById(id);
    } finally {
      connection.release();
    }
  },

  async delete(id: number): Promise<boolean> {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      const deleteResult = result as any;
      return deleteResult.affectedRows > 0;
    } finally {
      connection.release();
    }
  }
};

export default userRepository;