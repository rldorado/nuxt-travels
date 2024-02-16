export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
};
  
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(amount);
}

export const truncateDescription = (description: string, maxLength: number = 100): string => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
}