import UserSchema from './UserSchema';
import dbConnect from '@/lib/mongodb';

// User model with MongoDB
export const User = {
  async create(userData) {
    await dbConnect();
    
    const user = new UserSchema({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    
    await user.save();
    console.log('User created successfully in MongoDB:', user.email);
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  },

  async findByEmail(email) {
    await dbConnect();
    
    const user = await UserSchema.findOne({ email }).select('+password');
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  },

  async findById(id) {
    await dbConnect();
    
    const user = await UserSchema.findById(id);
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  },

  async validatePassword(password, hashedPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, hashedPassword);
  }
};
