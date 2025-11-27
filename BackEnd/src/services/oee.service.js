import { FinalData } from '../models/FinalData.model.js';
import { ApiError } from '../utils/ApiError.js';
import { appLogger } from '../config/logger.js';
import { golainService } from './golain.service.js';

const getOeeData = async (query) => {
  try {
    // In a real application, you might fetch data from Golain API first
    // and then store it or directly query your DB if already synced.
    // For this refactor, we assume data is in FinalData model.
    const oeeData = await FinalData.find(query).sort({ timestamp: -1 });
    return oeeData;
  } catch (error) {
    appLogger.error(`Error fetching OEE data: ${error.message}`);
    throw new ApiError(500, "Failed to fetch OEE data");
  }
};

const getOeeSummary = async (query) => {
  try {
    // This is a simplified summary. In a real scenario, this would involve
    // complex aggregation queries or calculations based on raw OEE data.
    const oeeData = await FinalData.find(query);

    if (oeeData.length === 0) {
      return { averageOee: 0, totalRecords: 0 };
    }

    const totalOee = oeeData.reduce((sum, data) => sum + (data.oee || 0), 0);
    const averageOee = totalOee / oeeData.length;

    return {
      averageOee: parseFloat(averageOee.toFixed(2)),
      totalRecords: oeeData.length,
    };
  } catch (error) {
    appLogger.error(`Error fetching OEE summary: ${error.message}`);
    throw new ApiError(500, "Failed to fetch OEE summary");
  }
};

const createOeeData = async (data) => {
  try {
    const newOeeData = await FinalData.create(data);
    return newOeeData;
  } catch (error) {
    appLogger.error(`Error creating OEE data: ${error.message}`);
    throw new ApiError(500, "Failed to create OEE data");
  }
};

// Example function to fetch data from Golain (to be implemented in golain.service.js)
const fetchOeeDataFromGolain = async (deviceId) => {
  // This function would call golainService
  appLogger.info(`Fetching OEE data for device ${deviceId} from Golain (placeholder)`);
  const golainData = await golainService.fetchDeviceData(deviceId);
  // Process golainData and return
  return golainData; // Placeholder
};

export const oeeService = {
  getOeeData,
  getOeeSummary,
  createOeeData,
  fetchOeeDataFromGolain,
};
