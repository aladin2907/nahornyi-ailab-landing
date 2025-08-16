'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateROI, formatCurrency, formatPercentage, type ROIInputs } from '@/lib/roi';
import Button from './Button';

interface ROIField {
  id: keyof ROIInputs;
  label: string;
}

interface ROICalculatorProps {
  title: string;
  cta: string;
  fields: readonly ROIField[];
  formulaDesc: string;
  copy: {
    roi_results: {
      monthly_revenue: string;
      monthly_savings: string;
      roi: string;
      total_monthly_benefit: string;
      sending: string;
    };
  };
}

export default function ROICalculator({ title, cta, fields, formulaDesc, copy }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<ROIInputs>({
    leadsPerMonth: 100,
    avgConversionUplift: 25,
    avgCheck: 150,
    hoursSavedPerWeek: 20,
    hourlyCost: 50
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const handleInputChange = (field: keyof ROIInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const results = calculateROI(inputs);
  
  return (
    <section className="py-32 bg-[--background]/40 backdrop-blur-sm">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h2>
          </motion.div>
          
          <div className="glass-hover p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    value={inputs[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 bg-[--background] border border-[--subtle] rounded-lg focus:border-[--accent] focus:outline-none transition-colors"
                    min="0"
                    step={field.id.includes('Uplift') || field.id.includes('Cost') ? '0.1' : '1'}
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mb-8">
              <Button onClick={handleCalculate} size="lg">
                {cta}
              </Button>
            </div>
            
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="border-t border-[--subtle] pt-8"
              >
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[--accent] mb-2">
                      {formatCurrency(results.monthlyRevenue)}
                    </div>
                    <div className="text-sm opacity-70">{copy.roi_results.monthly_revenue}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[--secondary] mb-2">
                      {formatCurrency(results.monthlySavings)}
                    </div>
                    <div className="text-sm opacity-70">{copy.roi_results.monthly_savings}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[--accent] mb-2">
                      {formatPercentage(results.roi)}
                    </div>
                    <div className="text-sm opacity-70">{copy.roi_results.roi}</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">
                    {copy.roi_results.total_monthly_benefit}: {formatCurrency(results.totalMonthlyBenefit)}
                  </div>
                  <p className="text-sm opacity-60 max-w-2xl mx-auto">
                    {formulaDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}