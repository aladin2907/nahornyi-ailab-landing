export interface ROIInputs {
  leadsPerMonth: number;
  avgConversionUplift: number; // percentage
  avgCheck: number; // euros
  hoursSavedPerWeek: number;
  hourlyCost: number; // euros
}

export interface ROIResults {
  monthlyRevenue: number;
  monthlySavings: number;
  totalMonthlyBenefit: number;
  estimatedMonthlyCost: number; // placeholder for service cost
  roi: number; // percentage
}

export function calculateROI(inputs: ROIInputs, estimatedMonthlyCost: number = 2000): ROIResults {
  // Revenue = Leads × Uplift% × AOV
  const monthlyRevenue = inputs.leadsPerMonth * (inputs.avgConversionUplift / 100) * inputs.avgCheck;
  
  // Savings = Hours × Rate × 4.3 (weeks per month)
  const monthlySavings = inputs.hoursSavedPerWeek * inputs.hourlyCost * 4.3;
  
  const totalMonthlyBenefit = monthlyRevenue + monthlySavings;
  
  // ROI = (Revenue+Savings−Cost)/Cost
  const roi = estimatedMonthlyCost > 0 
    ? ((totalMonthlyBenefit - estimatedMonthlyCost) / estimatedMonthlyCost) * 100
    : 0;
  
  return {
    monthlyRevenue,
    monthlySavings,
    totalMonthlyBenefit,
    estimatedMonthlyCost,
    roi
  };
}

export function formatCurrency(amount: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
}