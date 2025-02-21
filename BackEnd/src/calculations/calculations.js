// function for machine availability
// export const macAvail = async (request, response) => {
//     try {
//         const data = request.body;
//         const cal = data.operationTime / data.plannedOperation; 
//         response.json({ result: cal }); 
//     } catch (error) {
//         console.log("Error:", error);
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// }


// import fetch from "node-fetch";
// async function getdata(){
//     const myData = await fetch("");
//     const data = await myData.json();
//     console.log(data)
// }

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const macAvail = async (request, response) => {
    try {
        const { operationTime, plannedOperation, deviceId, sessionId } = request.body;
        
        // Check if required fields are present
        if (!operationTime || !plannedOperation || !deviceId || !sessionId) {
            throw new Error("operationTime, plannedOperation, deviceId, and sessionId are required.");
        }

        const cal = operationTime / plannedOperation;
        response.json({ result: cal, deviceId, sessionId }); 
    } catch (error) {
        console.log("Error:", error);
        response.status(400).json({ error: error.message });
    }
}



// function for machine performance
export const macPerf = async (request, response) => {
    try {
        const { idealCycleTime, actualCycleTime, deviceId, sessionId } = request.body;

        // Input Validation
        if (!idealCycleTime || !actualCycleTime || !deviceId || !sessionId) {
            throw new Error("Invalid request body. Required fields: idealCycleTime, actualCycleTime, deviceId, sessionId");
        }

        // Parse date strings into Date objects
        const idealCycleTimeObj = new Date(idealCycleTime);
        const actualCycleTimeObj = new Date(actualCycleTime);

        // Validate date objects
        if (isNaN(idealCycleTimeObj.getTime()) || isNaN(actualCycleTimeObj.getTime())) {
            throw new Error("Invalid date format");
        }
        
        // Calculate the time difference in milliseconds
        const idealTimeInMilliseconds = idealCycleTimeObj.getTime();
        const actualTimeInMilliseconds = actualCycleTimeObj.getTime();

        // Check if actual time is zero to avoid division by zero error
        if (actualTimeInMilliseconds === 0) {
            throw new Error("Actual cycle time cannot be zero");
        }
        // Calculate machine performance
        const machinePerformance = idealTimeInMilliseconds / actualTimeInMilliseconds;
        // Send the result in the response along with deviceId and sessionId
        response.json({ result: machinePerformance, deviceId, sessionId });
    } catch (error) {
        console.error("Error:", error);
        response.status(400).json({ error: error.message }); // Return error message in response
    }
}


// function for production quality

export const proQual = async (request, response) => {
    try {
        const data = request.body;
        const cal = data.goodParts / data.totalPartsProduce; 
        response.json({ result: cal }); 
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}


export const macOEE = async (request, response) => {
    try {
        const {machineAvailability, machinePerformance, productionQuality, deviceId, sessionId} = request.body;
        const cal = ((data.machineAvailability*data.machinePerformance)*data.productionQuality); 
        response.json({ result: cal }); 
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const cycleTime = async (request, response) => {
try {
        const data = request.body;
        const cal = data.operatingTime / data.noOfCycle; 
        response.json({ result: cal }); 
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const downTime = async (request, response) => {
    try {
        const data = request.body;
        const cal = data.plannedoperatingTime - data.machineOperatingTime; 
        response.json({ result: cal }); 
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const totalProductionReport = async (request, response) => {
    try {
        const data = request.body;
        // const cal = data.plannedoperatingTime; 
        response.json({ result: data }); 
    } catch (error) {
        console.log("Error:", error);   
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
// {
//     "ExpectedProduction":97602,
//     "ActualProduction":92557,
//     "GoodProduction":88675,
//     "RejectedProduction":3882
// }