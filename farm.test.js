const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");
//======================================================================================
//neem omgevingsfactoren mee in het berekenen van de opbrengst (in kilo's) van een plant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});
//======================================================================================
//bereken de opbrengst in kilo's van een crop
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
    expect(getYieldForCrop(input)).toBe(30);
  });
});
//======================================================================================
//bereken de totale opbrengst van meerdere crops
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
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];

    expect(getTotalYield({ crops })).toBe(0);
  });
});
//======================================================================================
//bereken de kosten voor een crop
describe("getCostsForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("Calculate costs for crop", () => {
    expect(getCostsForCrop(input)).toBe(10);
  });
});
//======================================================================================
//bereken inkomsten voor een crop (zonder omgevingsfactoren):
describe("getRevenueForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salesPrice: 2,
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("getRevenueForCrop", () => {
    expect(getRevenueForCrop(input)).toBe(60);
  });
});

describe("getProfitForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salesPrice: 2,
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("getProfitForCrop Corn", () => {
    expect(getProfitForCrop(input)).toBe(50);
  });
});
//======================================================================================
//bereken de winst voor een crop (zonder omgevingsfactoren):
describe("getTotalProfit of crops", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salesPrice: 2,
  };

  const potato = {
    name: "potato",
    yield: 4,
    costs: 3,
    salesPrice: 5,
  };

  const apple = {
    name: "apple",
    yield: 5,
    costs: 2,
    salesPrice: 3,
  };

  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: potato, numCrops: 2 },
    { crop: apple, numCrops: 10 },
  ];

  test("getTotalProfit of corn, potato and apple", () => {
    expect(getTotalProfit({ crops })).toBe(189);
  });
});
//======================================================================================
// berekening met omgevingsfactoren
// berekening met meerdere omgevingsfactoren
// alleen relevante omgevingsfactoren

describe("getYieldForPlant with environmental factors", () => {
  const potato = {
    name: "potato",
    yield: 4,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },

      wind: {
        low: 10,
        medium: -20,
        high: -30,
      },

      soil: {
        sandy: 0,
        clay: 0,
        silt: 40,
      },
    },
  };

  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },

      wind: {
        low: 0,
        medium: 0,
        high: 0,
      },

      soil: {
        sandy: -20,
        clay: 0,
        silt: 40,
      },
    },
  };

  const environmentalFactors = {
    sun: "low",
    wind: "high",
    soil: "silt",
  };

  test("getYieldForPotatoo with environmental factors", () => {
    expect(getYieldForPlant(potato, environmentalFactors)).toBe(
      1.9599999999999997
    );
  });

  test("getYieldForCorn with environmental factors", () => {
    expect(getYieldForPlant(corn, environmentalFactors)).toBe(21);
  });
});
//======================================================================================
// bereken de opbrengst in kilo's van een crop
describe("getYieldForCrop", () => {
  test("Get yield for corn with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          low: 0,
          medium: 0,
          high: 0,
        },

        soil: {
          sandy: -20,
          clay: 0,
          silt: 40,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    const environmentalFactors = {
      sun: "high",
      wind: "high",
      soil: "sandy",
    };

    expect(getYieldForCrop(input, environmentalFactors)).toBe(36);
  });
});
//======================================================================================
// bereken de winst van een crop
describe("getProfitForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salesPrice: 2,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },

      wind: {
        low: 0,
        medium: 0,
        high: 0,
      },

      soil: {
        sandy: -20,
        clay: 0,
        silt: 40,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  const environmentalFactors = {
    sun: "high",
    wind: "medium",
    soil: "silt",
  };

  test("getProfitFor Corn with environmental factors", () => {
    expect(getProfitForCrop(input, environmentalFactors)).toBe(116);
  });
});
//======================================================================================
// bereken de winst voor meerdere crops
describe("getTotalProfit of crops", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salesPrice: 2,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },

      wind: {
        low: 0,
        medium: 0,
        high: 0,
      },

      soil: {
        sandy: -20,
        clay: 0,
        silt: 40,
      },
    },
  };

  const potato = {
    name: "potato",
    yield: 4,
    costs: 3,
    salesPrice: 5,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },

      wind: {
        low: 10,
        medium: -20,
        high: -30,
      },

      soil: {
        sandy: 0,
        clay: 0,
        silt: 40,
      },
    },
  };

  const apple = {
    name: "apple",
    yield: 5,
    costs: 2,
    salesPrice: 3,
    factors: {
      sun: {
        low: -10,
        medium: 0,
        high: 40,
      },

      wind: {
        low: 10,
        medium: -20,
        high: -30,
      },

      soil: {
        sandy: 0,
        clay: 0,
        silt: 40,
      },
    },
  };

  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: potato, numCrops: 2 },
    { crop: apple, numCrops: 10 },
  ];

  const environmentalFactors = {
    sun: "low",
    wind: "low",
    soil: "silt",
  };

  test("getTotalProfit of corn, potato and apple with environmental factors", () => {
    expect(getTotalProfit({ crops }, environmentalFactors)).toBe(228.7);
  });
});
