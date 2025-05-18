export const formatCurrency = (value: number): string => {
  if (isNaN(value)) {
    return "";
  }

  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
