import { User } from '@/models/user';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return Response.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user (in production, hash the password!)
    const user = await User.create({
      name,
      email,
      password, // In production, use bcrypt to hash this!
    });

    return Response.json(
      { message: 'User registered successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
