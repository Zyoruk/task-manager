import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUser } from '../../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { FeatureFlag } from '../schemas/feature-flag.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(FeatureFlag.name) private taskModel: Model<FeatureFlag>,
    @Inject('NOTIFICATIONS_SERVICE')
    public notificationsServiceClient: ClientProxy
  ) {}
  async getSetting(id: string, userContext: IUser) {
    Logger.log('Attempting to get setting:', {
      setting: id,
      userContext,
    });
    const setting = await this.taskModel.findOne({
      key: id,
      enabledForUsers: { $in: [userContext._id] },
    });
    this.notificationsServiceClient.emit('setting', {
      action: 'search',
      payload: setting,
      userContext,
    });
    return setting;
  }

  async setSetting(id: string, userContext: IUser) {
    Logger.log('Attempting to set setting:', {
      setting: id,
      userContext,
    });

    try {
      // 1. Find the setting by key
      let setting = await this.taskModel.findOne({ key: id });

      // 2. If not found, create a new one
      if (!setting) {
        setting = new this.taskModel({
          key: id,
          enabledForUsers: [userContext._id],
        });
        await setting.save();

        this.notificationsServiceClient.emit('setting', {
          action: 'create',
          payload: setting,
          userContext,
        });

        return setting;
      }

      // 3. If found, update the enabledForUsers array
      setting.enabledForUsers.push(userContext._id);
      await setting.save();

      this.notificationsServiceClient.emit('setting', {
        action: 'update',
        payload: setting,
        userContext,
      });

      return setting;
    } catch (error) {
      Logger.error('Error setting setting:', error);
      throw error; // Re-throw or handle the error appropriately
    }
  }

  async deleteSetting(id: string, userContext: IUser) {
    Logger.log('Attempting to delete setting:', {
      setting: id,
      userContext,
    });
    const setting = this.taskModel.findOneAndUpdate(
      {
        key: id,
        enabledForUsers: { $in: [userContext._id] },
      },
      { $pull: { enabledForUsers: userContext._id } },
      { new: true }
    );
    this.notificationsServiceClient.emit('setting', {
      action: 'delete',
      payload: setting,
      userContext,
    });
    return setting;
  }

  async getRawSetting(id: string) {
    Logger.log('Attempting to get setting:', {
      setting: id,
    });
    const setting = await this.taskModel.findOne({
      key: id,
    });
    this.notificationsServiceClient.emit('setting', {
      action: 'search',
      payload: setting,
    });
    return setting;
  }
}
