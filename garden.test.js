const gardenFunctions = require("./garden");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60
            }
        }
    };

    const environmentFactorsOne = {
        sun: "low",
    };
    const environmentFactorsTwo = {
        sun: "medium",
    };
    const environmentFactorsThree = {
        sun: "high",
    };
    const environmentFactorsFour = {
        sun: "low",
        wind: "medium"
    };
    const environmentFactorsFive = {
        sun: "high",
        wind: "high"
    };

    test("Get yield for plant with no environment factors", () => {
        expect(gardenFunctions.getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for plant with environment factors - sun low", () => {
        expect(gardenFunctions.getYieldForPlant(corn, environmentFactorsOne)).toBe(15);
    });
    test("Get yield for plant with environment factors - sun medium", () => {
        expect(gardenFunctions.getYieldForPlant(corn, environmentFactorsTwo)).toBe(30);
    });
    test("Get yield for plant with environment factors - sun high", () => {
        expect(gardenFunctions.getYieldForPlant(corn, environmentFactorsThree)).toBe(45);
    });
    test("Get yield for plant with environment factors - sun low & wind medium", () => {
        expect(gardenFunctions.getYieldForPlant(corn, environmentFactorsFour)).toBe(10.5);
    });
    test("Get yield for plant with environment factors - sun high & wind high", () => {
        expect(gardenFunctions.getYieldForPlant(corn, environmentFactorsFive)).toBe(18);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getYieldForCrop(input)).toBe(30);
    });
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60
            }
        }
    };
    const input = {
        crop: corn,
        numCrops: 15,
    };
    const environmentFactors = {
        sun: "low",
        wind: "medium"
    };

    test("Get yield for crop, with enviroment", () => {
        expect(gardenFunctions.getYieldForCrop(input, environmentFactors)).toBe(157.5);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(gardenFunctions.getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(gardenFunctions.getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with multiple crops and enviroment", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -25,
                    medium: 0,
                    high: 60
                },
                wind: {
                    low: 0,
                    medium: -15,
                    high: -30
                }
            }
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(gardenFunctions.getTotalYield({ crops }, environmentFactors)).toBe(10.35);
    });

});

describe("getCostsForCrop", () => {
    test("Get costs for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getRevenueForCrop(input)).toBe(60);
    });
    test("Get revenue for crop with enviroment", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60
                }
            }
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getRevenueForCrop(input, environmentFactors)).toBe(21);
    });
});

describe("getProfitForCrop", () => {
    test("Get profit for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            cost: 1
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getProfitForCrop(input)).toBe(30);
    });
    test("Get profit for crop with enviroment", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            cost: 1,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60
                }
            }
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(gardenFunctions.getProfitForCrop(input, environmentFactors)).toBe(10.5);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            cost: 1
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            price: 3,
            cost: 1
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(gardenFunctions.getTotalProfit({ crops })).toBe(31);
    });

    test("Calculate total profit with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            cost: 1
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(gardenFunctions.getTotalProfit({ crops })).toBe(0);
    });

    test("Calculate total profit with multiple crops and enviroment", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 2,
            cost: 1,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            price: 3,
            cost: 1,
            factor: {
                sun: {
                    low: -25,
                    medium: 0,
                    high: 60
                },
                wind: {
                    low: 0,
                    medium: -15,
                    high: -30
                }
            }
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(gardenFunctions.getTotalProfit({ crops }, environmentFactors)).toBe(15.45);
    });
});