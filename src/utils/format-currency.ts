
export function convertToKobo(amount: number): number {
    return Math.round(amount * 100);
  }
  
  export function convertToNairaUnit(amount: number): number {
    return amount / 100;
  }
  
  export function formatCurrency(amount: number): string {

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  }