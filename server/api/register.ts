import userRepository from '../repositories/userRepository';
import { User } from '../models/user';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    event.node.res.statusCode = 405;
    return {
      status: 'error',
      message: 'Method not allowed. Use POST.',
    };
  }

  try {
    const body = await readBody(event);
    
    // Validate required fields
    const requiredFields = ['username', 'password', 'full_name', 'email', 'role'];
    for (const field of requiredFields) {
      if (!body[field]) {
        event.node.res.statusCode = 400;
        return {
          status: 'error',
          message: `Missing required field: ${field}`,
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      event.node.res.statusCode = 400;
      return {
        status: 'error',
        message: 'Invalid email format',
      };
    }

    // Validate password length
    if (body.password.length < 6) {
      event.node.res.statusCode = 400;
      return {
        status: 'error',
        message: 'Password must be at least 6 characters long',
      };
    }

    // Validate role
    if (!['employee', 'manager'].includes(body.role)) {
      event.node.res.statusCode = 400;
      return {
        status: 'error',
        message: 'Invalid role. Must be either "employee" or "manager"',
      };
    }

    // Check if username already exists
    const existingUser = await userRepository.findByUsername(body.username);
    if (existingUser) {
      event.node.res.statusCode = 409;
      return {
        status: 'error',
        message: 'Username already exists',
      };
    }

    // Check if email already exists
    const existingEmail = await userRepository.findByEmail(body.email);
    if (existingEmail) {
      event.node.res.statusCode = 409;
      return {
        status: 'error',
        message: 'Email already exists',
      };
    }

    // Create user data
    const userData: User = {
      username: body.username,
      password_hash: body.password, // In production, this should be hashed
      full_name: body.full_name,
      email: body.email,
      role: body.role,
      studentcode: body.studentcode || undefined,
    };

    // Add user to database
    const newUser = await userRepository.create(userData);

    return {
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        username: newUser.username,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    };

  } catch (error: any) {
    console.error('Registration API Error:', error);
    event.node.res.statusCode = 500;
    return {
      status: 'error',
      message: 'Failed to register user.',
      error: error.message,
    };
  }
}); 