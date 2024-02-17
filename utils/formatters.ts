export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
};
  
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(amount);
}

export const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
}

export const convertDateToInputFormat = (date: string) => {
    const [month, day, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}