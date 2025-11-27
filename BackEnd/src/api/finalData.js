const fetch = require("node-fetch"); // Ensure you have node-fetch installed for server-side requests
const asyncHandler = require("../utils/asyncHandler.js");

const URL = "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getBig_data/data/Big_data/";

const finalData = asyncHandler(async () => {
    try {
        const response = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const responseData = await response.json();
        const data = responseData?.data?.[0] || {}; // Fallback to an empty object if undefined

        const comData = {
            APF: data.APF || 0,
            Acurrent: data.Acurrent || 0,
            Cust_id: data.Cust_id || '',
            CycleT: data.CycleT || 0,
            DIN1: data.DIN1 || 0,
            DIN2: data.DIN2 || 0,
            DIN3: data.DIN3 || 0,
            Device_id: data.Device_id || '',
            Freq: data.Freq || 0,
            I1: data.I1 || 0,
            I2: data.I2 || 0,
            I3: data.I3 || 0,
            MDownS: data.MDownS || 0,
            MDownT: data.MDownT || 0,
            Mac_id: data.Mac_id || '',
            PF1: data.PF1 || 0,
            PF2: data.PF2 || 0,
            PF3: data.PF3 || 0,
            Pcount: data.Pcount || 0,
            Shift_C: data.Shift_C || 0,
            Shift_S: data.Shift_S || 0,
            Sub_id: data.Sub_id || '',
            TBD: data.TBD || 0,
            TBD_S: data.TBD_S || 0,
            TKVA: data.TKVA || 0,
            TKVR: data.TKVR || 0,
            TKW: data.TKW || 0,
            V12: data.V12 || 0,
            V1N: data.V1N || 0,
            V23: data.V23 || 0,
            V2N: data.V2N || 0,
            V31: data.V31 || 0,
            V3N: data.V3N || 0,
            actualProduction: data.actualProduction || 0,
            availability: data.availability || 0,
            avgVLL: data.avgVLL || 0,
            avgVLN: data.avgVLN || 0,
            downtime: data.downtime || 0,
            expectedProduction: data.expectedProduction || 0,
            goodProduction: data.goodProduction || 0,
            kvA1: data.kvA1 || 0,
            kvA2: data.kvA2 || 0,
            kvA3: data.kvA3 || 0,
            kvAR1: data.kvAR1 || 0,
            kvAR2: data.kvAR2 || 0,
            kvAR3: data.kvAR3 || 0,
            kw1: data.kw1 || 0,
            kw2: data.kw2 || 0,
            kw3: data.kw3 || 0,
            kwh: data.kwh || 0,
            machineIssues: data.machineIssues || 0,
            machineProduction: data.machineProduction || 0,
            materialUnavailable: data.materialUnavailable || 0,
            oee: data.oee || 0,
            operatorBreak: data.operatorBreak || 0,
            operatorUnavailable: data.operatorUnavailable || 0,
            performance: data.performance || 0,
            productionVolume: data.productionVolume || 0,
            quality: data.quality || 0,
            rejectedProduction: data.rejectedProduction || 0,
            weight: data.weight || 0,
            testRun_S: data.testRun_S || 0,
            testRun_T: data.testRun_T || 0,
            waitingOnInspection: data.waitingOnInspection || 0
        };

        return comData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
});

module.exports = finalData;
