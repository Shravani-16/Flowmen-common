import { SoilData } from '../models/SoilData.model.js';
import { ApiError } from '../utils/ApiError.js';
import { appLogger } from '../config/logger.js';

const getSoilDataByDeviceId = async (deviceId) => {
  try {
    const soilData = await SoilData.find({ deviceId }).sort({ timestamp: -1 });
    return soilData;
  } catch (error) {
    appLogger.error(`Error fetching soil data for device ${deviceId}: ${error.message}`);
    throw new ApiError(500, "Failed to fetch soil data");
  }
};

const createSoilData = async (data) => {
  try {
    const newSoilData = await SoilData.create(data);
    return newSoilData;
  } catch (error) {
    appLogger.error(`Error creating soil data: ${error.message}`);
    throw new ApiError(500, "Failed to create soil data");
  }
};

export const soilService = {
  getSoilDataByDeviceId,
  createSoilData,
};
