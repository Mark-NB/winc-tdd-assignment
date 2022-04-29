const gardenFunctions = {
    //getYieldForPlant also holds the enviroment variables so will be called by other functions for this
    getYieldForPlant: (plantType, environmentFactors) => {
        let totalYield = plantType.yield;
        if (environmentFactors) {
            if (environmentFactors.sun) {
                if (environmentFactors.sun === 'low') {
                    totalYield = totalYield + ((plantType.factor.sun.low * plantType.yield) / 100);
                } else if (environmentFactors.sun === 'medium') {
                    totalYield = totalYield + ((plantType.factor.sun.medium * plantType.yield) / 100);
                } else if (environmentFactors.sun === 'high') {
                    totalYield = totalYield + ((plantType.factor.sun.high * plantType.yield) / 100);
                }
            } if (environmentFactors.wind) {
                if (environmentFactors.wind === 'low') {
                    totalYield = totalYield + ((plantType.factor.wind.low * totalYield) / 100);
                } else if (environmentFactors.wind === 'medium') {
                    totalYield = totalYield + ((plantType.factor.wind.medium * totalYield) / 100);
                } else if (environmentFactors.wind === 'high') {
                    totalYield = totalYield + ((plantType.factor.wind.high * totalYield) / 100);
                }
            }
        }
        return totalYield;
    },
    getYieldForCrop: (cropsInput, environmentFactors) => {
        if (environmentFactors) {
            let cropYield = gardenFunctions.getYieldForPlant(cropsInput.crop, environmentFactors);
            return cropsInput.numCrops * cropYield;
        } else {
            return cropsInput.numCrops * cropsInput.crop.yield;
        }
    },
    getTotalYield: (crops, environmentFactors) => {
        if (environmentFactors) {
            let totalYield = 0;
            crops.crops.forEach(element => {
                let thisYield = gardenFunctions.getYieldForPlant(element.crop, environmentFactors) * element.numCrops;
                totalYield = totalYield + thisYield;
            });
            return totalYield;
        } else {
            let totalYield = 0;
            crops.crops.forEach(element => {
                let thisYield = element.crop.yield * element.numCrops;
                totalYield = totalYield + thisYield;
            });
            return totalYield;
        }
    },
    getCostsForCrop: (crop) => {
        return crop.numCrops * crop.crop.cost;
    },
    getRevenueForCrop: (crop, environmentFactors) => {
        if (environmentFactors) {
            return crop.numCrops * gardenFunctions.getYieldForPlant(crop.crop, environmentFactors) * crop.crop.price;
        } else {
            return crop.numCrops * crop.crop.yield * crop.crop.price;
        }
    },
    getProfitForCrop: (crop, environmentFactors) => {
        if (environmentFactors) {
            return crop.numCrops * gardenFunctions.getYieldForPlant(crop.crop, environmentFactors) * (crop.crop.price - crop.crop.cost);
        } else {
            return crop.numCrops * crop.crop.yield * (crop.crop.price - crop.crop.cost);
        }
    },
    getTotalProfit: (crops, environmentFactors) => {
        if (environmentFactors) {
            let totalProfit = 0;
            crops.crops.forEach(element => {
                let thisProfit = element.numCrops * gardenFunctions.getYieldForPlant(element.crop, environmentFactors) * (element.crop.price - element.crop.cost);
                totalProfit = totalProfit + thisProfit;
            })
            return totalProfit;
        } else {
            let totalProfit = 0;
            crops.crops.forEach(element => {
                let thisProfit = element.numCrops * element.crop.yield * (element.crop.price - element.crop.cost);
                totalProfit = totalProfit + thisProfit;
            })
            return totalProfit;
        }
    }
};

module.exports = gardenFunctions;