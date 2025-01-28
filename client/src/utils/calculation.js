export const calculateMake = (data) => {
  const countByProductType = {};

  data.forEach((obj) => {
    const key = obj.product_type;
    countByProductType[key] = (countByProductType[key] || 0) + 1;
  });
  return countByProductType;
};

export const calculateMSRP = (data) => {
    const countMSRP = {};
  
    data.forEach((obj) => {
      const key = obj.price;
      countMSRP[key] = (countMSRP[key] || 0) + 1;
    });
    return countMSRP;
  };
  