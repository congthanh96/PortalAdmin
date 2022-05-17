/**
 * 
 * @param {*} currentAmount 
 * Định dạng dữ liệu truyền vào sang dạng chuỗi biểu diễn giá tiền 
 * @returns 
 */
export const formatVND = (currentAmount) => {
    const newAmount = currentAmount / 1;
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };