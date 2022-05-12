export const formatVND = (currentAmount) => {
    const newAmount = currentAmount / 1;
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };