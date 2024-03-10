import request from 'supertest';
import bcrypt from 'bcryptjs'; // Import bcrypt for mocking password hashing
import app from '../socket/socket'; // Replace '../your/app' with the correct path to your Express app file

// Mock bcrypt hash function
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(() => 'mocked-salt'),
  hash: jest.fn(() => 'mocked-hash'),
}));

describe('POST /signup', () => {
  it('should create a new user', async () => {
    const newUser = {
      fullName: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      confirmPassword: 'password123',
      gender: 'male',
    };


    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe(newUser.fullName);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.profilePic).toBeDefined();
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10); // Ensure bcrypt.genSalt is called
    expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 'mocked-salt'); // Ensure bcrypt.hash is called
  });

  // Add more test cases for edge cases and error scenarios
});
