// ============= UTILITY FUNCTIONS =============
export const money = (amount) => `$${Number(amount).toFixed(2)}`;
export const moneyShort = (amount) => {
  if (amount >= 1000000) return `$${(amount/1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount/1000).toFixed(1)}K`;
  return `$${amount}`;
};