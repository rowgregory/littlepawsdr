const getPaymentMethodLabel = (method: string) => {
  const methodMap: Record<string, string> = {
    venmo: 'Venmo',
    cash: 'Cash',
    check: 'Check',
    zelle: 'Zelle',
    bank_transfer: 'Bank Transfer',
    cash_app: 'Cash App',
    wire_transfer: 'Wire Transfer',
    other: 'Other',
  };
  return methodMap[method] || method;
};

export default getPaymentMethodLabel;
