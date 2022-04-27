export const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };