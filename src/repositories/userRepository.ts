import { Model, Types } from 'mongoose';
import  { UserDocument } from '../models/userModel';

export class UserRepository {
  private userModel: Model<UserDocument>;

  constructor(userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }

  // Implement repository methods for CRUD operations
  public async getUsers(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  public async getUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  public async createUser(userData: Partial<UserDocument>): Promise<UserDocument> {
    return await this.userModel.create(userData);
  }

  public async updateUserById(id: string, userData: Partial<UserDocument>): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  public async deleteUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
