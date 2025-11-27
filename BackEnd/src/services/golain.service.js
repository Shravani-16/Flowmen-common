import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';
import { appLogger } from '../config/logger.js';
import { env } from '../config/env.js';

const { GOLAIN_API_BASE_URL } = env;

const fetchDeviceData = async (deviceId) => {
  try {
    const response = await axios.get(`${GOLAIN_API_BASE_URL}/devices/${deviceId}/data`, {
      headers: {
        "Authorization": `APIKEY ${env.GOLAIN_API_KEY}`,
        "org-id": env.GOLAIN_ORG_ID,
      },
    });
    return response.data;
  } catch (error) {
    appLogger.error(`Error fetching data from Golain for device ${deviceId}: ${error.message}`);
    throw new ApiError(error.response?.status || 500, "Failed to fetch data from Golain");
  }
};

// Add more functions as needed for other Golain API interactions
const sendCommandToDevice = async (deviceId, command) => {
  try {
    const response = await axios.post(`${GOLAIN_API_BASE_URL}/devices/${deviceId}/command`, command, {
      headers: {
        "Authorization": `APIKEY ${env.GOLAIN_API_KEY}`,
        "org-id": env.GOLAIN_ORG_ID,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    appLogger.error(`Error sending command to Golain for device ${deviceId}: ${error.message}`);
    throw new ApiError(error.response?.status || 500, "Failed to send command to Golain");
  }
};

export const golainService = {
  fetchDeviceData,
  sendCommandToDevice,
};
