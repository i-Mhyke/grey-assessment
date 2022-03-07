export const formatDate = (dateString: string): string => {
    const dateFormat = new Date(dateString);
    let formattedDate = dateFormat.toLocaleDateString();
    return formattedDate;
  };

export const currencyFormatter = ({amount, currency}:{amount: number, currency: string}): string => {
    const convert = new Intl.NumberFormat('en-US', {
        currency: currency,
        style: 'currency'
    });
   return convert.format(amount)
} 