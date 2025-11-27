import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { FinalData } from '../models/FinalData.model.js';
import { appLogger } from '../config/logger.js';
import { oeeService } from '../services/oee.service.js';

const getOeeData = asyncHandler(async (req, res) => {
  const { deviceId, startDate, endDate } = req.query;

  if (!deviceId) {
    throw new ApiError(400, "Device ID is required");
  }

  const query = { deviceId };
  if (startDate && endDate) {
    query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const oeeData = await oeeService.getOeeData(query);

  if (!oeeData || oeeData.length === 0) {
    throw new ApiError(404, "No OEE data found for this device ID");
  }

  return res.status(200).json(new ApiResponse(200, oeeData, "OEE data fetched successfully"));
});

const getOeeSummary = asyncHandler(async (req, res) => {
  const { deviceId, startDate, endDate } = req.query;

  if (!deviceId) {
    throw new ApiError(400, "Device ID is required");
  }

  const query = { deviceId };
  if (startDate && endDate) {
    query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const oeeSummary = await oeeService.getOeeSummary(query);

  return res.status(200).json(new ApiResponse(200, oeeSummary, "OEE summary fetched successfully"));
});

const createOeeData = asyncHandler(async (req, res) => {
  const { deviceId, oee, availability, performance, quality } = req.body;

  if (!deviceId || [oee, availability, performance, quality].some(field => field === undefined || field === null)) {
    throw new ApiError(400, "All OEE data fields are required");
  }

  const newOeeData = await oeeService.createOeeData({
    deviceId,
    oee,
    availability,
    performance,
    quality,
  });

  return res.status(201).json(new ApiResponse(201, newOeeData, "OEE data created successfully"));
});

export {
  getOeeData,
  getOeeSummary,
  createOeeData,
};
