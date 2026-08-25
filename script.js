/**
 * Universal Smart Calculator Pro - Comprehensive Engine (script.js)
 * Covers 34 specialized calculators across Finance, Health, Education, Business, Everyday Math, and Scientific.
 */

// ==========================================
// 1. Calculator Registry & Metadata
// ==========================================

const CATEGORIES = [
  { id: 'all', name: 'All Calculators', icon: '✨' },
  { id: 'popular', name: 'Popular', icon: '🔥' },
  { id: 'loans', name: 'Loans & EMI', icon: '🏠' },
  { id: 'interest', name: 'Interest & Savings', icon: '📈' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'everyday', name: 'Everyday & Math', icon: '🧮' },
  { id: 'health', name: 'Health & Fitness', icon: '🏃' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'datetime', name: 'Date & Time', icon: '📅' }
];

const CALCULATORS = [
  // --- Popular / Core ---
  {
    id: 'sci-calc',
    name: 'Scientific & Standard Calculator',
    category: 'everyday',
    popular: true,
    icon: '🧮',
    description: 'Interactive scientific calculator with trigonometry, logarithms, powers, roots, and memory operations.',
    keywords: ['basic', 'scientific', 'trig', 'sin', 'cos', 'tan', 'math', 'square root', 'log', 'pi'],
    type: 'scientific_ui'
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'health',
    popular: true,
    icon: '⚖️',
    description: 'Calculate your Body Mass Index (BMI), category, and healthy weight range for metric and imperial units.',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'fitness', 'obesity', 'health'],
    inputs: [
      { id: 'unit', label: 'Unit System', type: 'select', options: [{ val: 'metric', text: 'Metric (kg, cm)' }, { val: 'imperial', text: 'Imperial (lbs, ft/in)' }], default: 'metric' },
      { id: 'weight', label: 'Weight', type: 'number', default: 70, min: 1, max: 500, step: 0.1, unitLabel: 'kg' },
      { id: 'height', label: 'Height', type: 'number', default: 175, min: 30, max: 300, step: 0.1, unitLabel: 'cm' },
      { id: 'height_ft', label: 'Height (Feet)', type: 'number', default: 5, min: 1, max: 8, hidden: true },
      { id: 'height_in', label: 'Height (Inches)', type: 'number', default: 9, min: 0, max: 11, hidden: true }
    ],
    formula: 'BMI = weight (kg) / [height (m)]²',
    calculate: (inputs) => {
      let weightKg = parseFloat(inputs.weight) || 0;
      let heightM = 0;
      if (inputs.unit === 'metric') {
        heightM = (parseFloat(inputs.height) || 170) / 100;
      } else {
        weightKg = (parseFloat(inputs.weight) || 150) * 0.45359237;
        const ft = parseFloat(inputs.height_ft) || 5;
        const inches = parseFloat(inputs.height_in) || 9;
        heightM = ((ft * 12) + inches) * 0.0254;
      }
      if (heightM <= 0) return { main: '0.0', label: 'BMI Score', details: [] };
      const bmi = weightKg / (heightM * heightM);
      let status = 'Normal Weight';
      let badgeClass = 'badge-success';
      if (bmi < 18.5) { status = 'Underweight'; badgeClass = 'badge-warning'; }
      else if (bmi < 25) { status = 'Normal Weight'; badgeClass = 'badge-success'; }
      else if (bmi < 30) { status = 'Overweight'; badgeClass = 'badge-warning'; }
      else { status = 'Obese'; badgeClass = 'badge-danger'; }

      const minHealthyKg = 18.5 * (heightM * heightM);
      const maxHealthyKg = 24.9 * (heightM * heightM);

      return {
        main: bmi.toFixed(1),
        label: 'Your BMI Score',
        badge: { text: status, class: badgeClass },
        details: [
          { label: 'Category', value: status },
          { label: 'Healthy Weight Range', value: `${minHealthyKg.toFixed(1)} - ${maxHealthyKg.toFixed(1)} kg` },
          { label: 'Prime Index', value: (bmi / 25).toFixed(2) }
        ]
      };
    }
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    category: 'loans',
    popular: true,
    icon: '💰',
    description: 'Calculate monthly payments, total interest, and total cost for auto, personal, or general loans.',
    keywords: ['loan', 'interest', 'monthly payment', 'borrow', 'personal loan', 'finance'],
    inputs: [
      { id: 'amount', label: 'Loan Amount ($)', type: 'number', default: 25000, min: 100, step: 100 },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 6.5, min: 0.1, max: 100, step: 0.1 },
      { id: 'term', label: 'Loan Term (Years)', type: 'number', default: 5, min: 1, max: 40, step: 1 }
    ],
    formula: 'M = P · [r(1+r)^n] / [(1+r)^n – 1]',
    calculate: (inputs) => {
      const p = parseFloat(inputs.amount) || 0;
      const annualR = (parseFloat(inputs.rate) || 0) / 100;
      const years = parseFloat(inputs.term) || 1;
      const r = annualR / 12;
      const n = years * 12;
      let monthly = 0;
      if (r === 0) {
        monthly = p / n;
      } else {
        monthly = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      }
      const totalPayment = monthly * n;
      const totalInterest = totalPayment - p;
      return {
        main: `$${monthly.toFixed(2)}`,
        label: 'Monthly Payment',
        details: [
          { label: 'Total Loan Amount', value: `$${p.toLocaleString()}` },
          { label: 'Total Interest Paid', value: `$${totalInterest.toFixed(2)}` },
          { label: 'Total Amount Paid', value: `$${totalPayment.toFixed(2)}` }
        ]
      };
    }
  },
  {
    id: 'calorie',
    name: 'Calorie & TDEE Calculator',
    category: 'health',
    popular: true,
    icon: '🥗',
    description: 'Find your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on activity.',
    keywords: ['calorie', 'diet', 'tdee', 'bmr', 'weight loss', 'macros', 'nutrition'],
    inputs: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ val: 'male', text: 'Male' }, { val: 'female', text: 'Female' }], default: 'male' },
      { id: 'age', label: 'Age (Years)', type: 'number', default: 25, min: 10, max: 100 },
      { id: 'weight', label: 'Weight (kg)', type: 'number', default: 70, min: 20, max: 300 },
      { id: 'height', label: 'Height (cm)', type: 'number', default: 175, min: 50, max: 250 },
      { id: 'activity', label: 'Activity Level', type: 'select', options: [
        { val: '1.2', text: 'Sedentary (little/no exercise)' },
        { val: '1.375', text: 'Light (1-3 days/week)' },
        { val: '1.55', text: 'Moderate (3-5 days/week)' },
        { val: '1.725', text: 'Heavy (6-7 days/week)' },
        { val: '1.9', text: 'Athlete (2x per day)' }
      ], default: '1.55' }
    ],
    formula: 'BMR = 10W + 6.25H - 5A + S (Mifflin-St Jeor)',
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight) || 70;
      const h = parseFloat(inputs.height) || 175;
      const a = parseFloat(inputs.age) || 25;
      const s = inputs.gender === 'male' ? 5 : -161;
      const bmr = 10 * w + 6.25 * h - 5 * a + s;
      const tdee = bmr * parseFloat(inputs.activity || 1.2);
      return {
        main: `${Math.round(tdee)} kcal`,
        label: 'Daily Maintenance Calories (TDEE)',
        details: [
          { label: 'BMR (Base Metabolic Rate)', value: `${Math.round(bmr)} kcal` },
          { label: 'Weight Loss (0.5 kg/wk)', value: `${Math.round(tdee - 500)} kcal` },
          { label: 'Weight Gain (+0.5 kg/wk)', value: `${Math.round(tdee + 500)} kcal` }
        ]
      };
    }
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'everyday',
    popular: true,
    icon: '%',
    description: 'Calculate what is X% of Y, X is what percent of Y, and percentage increase or decrease.',
    keywords: ['percentage', 'percent', 'fraction', 'discount', 'ratio', 'change'],
    inputs: [
      { id: 'type', label: 'Calculation Type', type: 'select', options: [
        { val: 'what_is', text: 'What is X% of Y?' },
        { val: 'x_is_what_pct', text: 'X is what % of Y?' },
        { val: 'pct_change', text: '% Change from X to Y' }
      ], default: 'what_is' },
      { id: 'val1', label: 'Value X', type: 'number', default: 15, step: 0.1 },
      { id: 'val2', label: 'Value Y', type: 'number', default: 200, step: 0.1 }
    ],
    formula: '(X / 100) · Y | (X / Y) · 100 | ((Y - X) / X) · 100',
    calculate: (inputs) => {
      const x = parseFloat(inputs.val1) || 0;
      const y = parseFloat(inputs.val2) || 0;
      if (inputs.type === 'what_is') {
        const res = (x / 100) * y;
        return {
          main: `${res}`,
          label: `${x}% of ${y}`,
          details: [{ label: 'Formula', value: `(${x} / 100) × ${y} = ${res}` }]
        };
      } else if (inputs.type === 'x_is_what_pct') {
        if (y === 0) return { main: '0%', label: 'Result', details: [] };
        const res = (x / y) * 100;
        return {
          main: `${res.toFixed(2)}%`,
          label: `${x} is what % of ${y}`,
          details: [{ label: 'Formula', value: `(${x} / ${y}) × 100 = ${res.toFixed(2)}%` }]
        };
      } else {
        if (x === 0) return { main: '0%', label: 'Result', details: [] };
        const change = ((y - x) / x) * 100;
        const sign = change >= 0 ? '+' : '';
        return {
          main: `${sign}${change.toFixed(2)}%`,
          label: `Change from ${x} to ${y}`,
          badge: { text: change >= 0 ? 'Increase' : 'Decrease', class: change >= 0 ? 'badge-success' : 'badge-danger' },
          details: [
            { label: 'Absolute Difference', value: `${(y - x).toFixed(2)}` },
            { label: 'Multiplier Factor', value: `${(y / x).toFixed(4)}x` }
          ]
        };
      }
    }
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator',
    category: 'everyday',
    popular: true,
    icon: '📑',
    description: 'Estimate income tax liabilities for US Federal or India New Tax Regime FY 2025-26.',
    keywords: ['tax', 'income tax', 'irs', 'india tax', 'deduction', 'salary tax'],
    inputs: [
      { id: 'region', label: 'Tax System', type: 'select', options: [
        { val: 'us_single', text: 'United States (Single Filer)' },
        { val: 'us_married', text: 'United States (Married Joint)' },
        { val: 'india_new', text: 'India (New Regime 2025-26)' }
      ], default: 'us_single' },
      { id: 'income', label: 'Annual Gross Income', type: 'number', default: 85000, min: 0, step: 1000 }
    ],
    formula: 'Progressive marginal tax brackets',
    calculate: (inputs) => {
      const income = parseFloat(inputs.income) || 0;
      let tax = 0;
      let effectiveRate = 0;
      if (inputs.region === 'india_new') {
        // Indian New Regime 2025-26 (Slabs up to 3L 0%, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%, standard deduction 75,000)
        const taxable = Math.max(0, income - 75000);
        if (taxable <= 700000) {
          tax = 0; // Section 87A rebate
        } else {
          if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
          if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.20;
          if (taxable > 1000000) tax += (Math.min(taxable, 1200000) - 1000000) * 0.15;
          if (taxable > 700000) tax += (Math.min(taxable, 1000000) - 700000) * 0.10;
          if (taxable > 300000) tax += (Math.min(taxable, 700000) - 300000) * 0.05;
          tax *= 1.04; // 4% cess
        }
        effectiveRate = income > 0 ? (tax / income) * 100 : 0;
        return {
          main: `₹${Math.round(tax).toLocaleString('en-IN')}`,
          label: 'Estimated Annual Tax (India New Regime)',
          details: [
            { label: 'Standard Deduction', value: '₹75,000' },
            { label: 'Taxable Income', value: `₹${Math.round(taxable).toLocaleString('en-IN')}` },
            { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(1)}%` },
            { label: 'Take Home Annual', value: `₹${Math.round(income - tax).toLocaleString('en-IN')}` }
          ]
        };
      } else {
        // US Federal approx brackets
        const stdDeduction = inputs.region === 'us_single' ? 14600 : 29200;
        const taxable = Math.max(0, income - stdDeduction);
        if (inputs.region === 'us_single') {
          if (taxable > 609350) tax += (taxable - 609350) * 0.37;
          if (taxable > 243725) tax += (Math.min(taxable, 609350) - 243725) * 0.35;
          if (taxable > 100525) tax += (Math.min(taxable, 243725) - 100525) * 0.24;
          if (taxable > 47150) tax += (Math.min(taxable, 100525) - 47150) * 0.22;
          if (taxable > 11600) tax += (Math.min(taxable, 47150) - 11600) * 0.12;
          if (taxable > 0) tax += Math.min(taxable, 11600) * 0.10;
        } else {
          tax = taxable * 0.18; // simplified estimate for married
        }
        effectiveRate = income > 0 ? (tax / income) * 100 : 0;
        return {
          main: `$${Math.round(tax).toLocaleString()}`,
          label: 'Estimated US Federal Tax',
          details: [
            { label: 'Standard Deduction', value: `$${stdDeduction.toLocaleString()}` },
            { label: 'Taxable Income', value: `$${Math.round(taxable).toLocaleString()}` },
            { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(1)}%` },
            { label: 'Monthly Take-Home', value: `$${Math.round((income - tax) / 12).toLocaleString()}` }
          ]
        };
      }
    }
  },
  {
    id: 'gpa',
    name: 'GPA & College Grade Calculator',
    category: 'education',
    popular: true,
    icon: '🎓',
    description: 'Calculate your Grade Point Average (GPA) on 4.0, 5.0, or 10.0 scale with credit weighting.',
    keywords: ['gpa', 'grades', 'college', 'school', 'cgpa', 'credits', 'education'],
    inputs: [
      { id: 'scale', label: 'GPA Scale', type: 'select', options: [{ val: '4', text: '4.0 Scale (Standard)' }, { val: '5', text: '5.0 Scale (Weighted)' }, { val: '10', text: '10.0 Scale' }], default: '4' },
      { id: 'c1_grade', label: 'Course 1 Grade Point & Credits', type: 'number', default: 4.0, step: 0.1 },
      { id: 'c1_cred', label: 'Course 1 Credits', type: 'number', default: 3, min: 1 },
      { id: 'c2_grade', label: 'Course 2 Grade Point', type: 'number', default: 3.7, step: 0.1 },
      { id: 'c2_cred', label: 'Course 2 Credits', type: 'number', default: 4, min: 1 },
      { id: 'c3_grade', label: 'Course 3 Grade Point', type: 'number', default: 3.3, step: 0.1 },
      { id: 'c3_cred', label: 'Course 3 Credits', type: 'number', default: 3, min: 1 }
    ],
    formula: 'GPA = Σ (Grade Points × Credits) / Σ Credits',
    calculate: (inputs) => {
      const g1 = parseFloat(inputs.c1_grade) || 0, c1 = parseFloat(inputs.c1_cred) || 0;
      const g2 = parseFloat(inputs.c2_grade) || 0, c2 = parseFloat(inputs.c2_cred) || 0;
      const g3 = parseFloat(inputs.c3_grade) || 0, c3 = parseFloat(inputs.c3_cred) || 0;
      const totalCredits = c1 + c2 + c3;
      if (totalCredits === 0) return { main: '0.00', label: 'GPA', details: [] };
      const gpa = ((g1 * c1) + (g2 * c2) + (g3 * c3)) / totalCredits;
      return {
        main: gpa.toFixed(2),
        label: `Cumulative GPA (Scale: ${inputs.scale}.0)`,
        details: [
          { label: 'Total Credits Earned', value: `${totalCredits}` },
          { label: 'Total Grade Points', value: `${((g1*c1)+(g2*c2)+(g3*c3)).toFixed(1)}` }
        ]
      };
    }
  },

  // --- Loans & EMI ---
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: 'loans',
    icon: '🏡',
    description: 'Estimate monthly mortgage payments including principal, interest, taxes, insurance, and PMI.',
    keywords: ['mortgage', 'home loan', 'property tax', 'house payment', 'pmi', 'insurance'],
    inputs: [
      { id: 'home_price', label: 'Home Purchase Price ($)', type: 'number', default: 400000, step: 5000 },
      { id: 'down_payment', label: 'Down Payment ($)', type: 'number', default: 80000, step: 2000 },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', default: 6.8, step: 0.1 },
      { id: 'term', label: 'Loan Term (Years)', type: 'select', options: [{ val: '30', text: '30 Years Fixed' }, { val: '15', text: '15 Years Fixed' }, { val: '20', text: '20 Years' }], default: '30' },
      { id: 'property_tax', label: 'Annual Property Tax ($)', type: 'number', default: 4500, step: 100 },
      { id: 'home_ins', label: 'Annual Home Insurance ($)', type: 'number', default: 1200, step: 50 }
    ],
    formula: 'P&I = P · [r(1+r)^n]/[(1+r)^n - 1] + Monthly Taxes & Ins',
    calculate: (inputs) => {
      const price = parseFloat(inputs.home_price) || 0;
      const down = parseFloat(inputs.down_payment) || 0;
      const p = Math.max(0, price - down);
      const r = ((parseFloat(inputs.rate) || 0) / 100) / 12;
      const n = (parseFloat(inputs.term) || 30) * 12;
      let pi = 0;
      if (r > 0) pi = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const monthlyTax = (parseFloat(inputs.property_tax) || 0) / 12;
      const monthlyIns = (parseFloat(inputs.home_ins) || 0) / 12;
      const totalMonthly = pi + monthlyTax + monthlyIns;
      return {
        main: `$${totalMonthly.toFixed(2)}`,
        label: 'Total Monthly Payment',
        details: [
          { label: 'Principal & Interest', value: `$${pi.toFixed(2)}` },
          { label: 'Property Taxes / mo', value: `$${monthlyTax.toFixed(2)}` },
          { label: 'Home Insurance / mo', value: `$${monthlyIns.toFixed(2)}` },
          { label: 'Total Loan Amount', value: `$${p.toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    category: 'loans',
    icon: '📊',
    description: 'Calculate Equated Monthly Installments (EMI) with principal vs interest breakdown.',
    keywords: ['emi', 'installment', 'car loan', 'bank loan', 'interest breakdown'],
    inputs: [
      { id: 'p', label: 'Principal Amount', type: 'number', default: 1000000, step: 10000 },
      { id: 'r', label: 'Annual Interest Rate (%)', type: 'number', default: 8.5, step: 0.1 },
      { id: 't', label: 'Tenure (Months)', type: 'number', default: 60, min: 1 }
    ],
    formula: 'EMI = P · r · (1+r)^n / [(1+r)^n - 1]',
    calculate: (inputs) => {
      const p = parseFloat(inputs.p) || 0;
      const r = ((parseFloat(inputs.r) || 0) / 12) / 100;
      const n = parseFloat(inputs.t) || 1;
      let emi = 0;
      if (r > 0) emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      const interest = total - p;
      return {
        main: `${Math.round(emi).toLocaleString()}`,
        label: 'Monthly EMI Amount',
        details: [
          { label: 'Principal Loan Amount', value: `${p.toLocaleString()}` },
          { label: 'Total Interest Payable', value: `${Math.round(interest).toLocaleString()}` },
          { label: 'Total Amount Payable', value: `${Math.round(total).toLocaleString()}` }
        ]
      };
    }
  },

  // --- Interest & Investments ---
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'interest',
    icon: '📈',
    description: 'See how savings and investments grow exponentially over time with compound interest.',
    keywords: ['compound', 'interest', 'investment', 'wealth', 'savings', 'apy'],
    inputs: [
      { id: 'principal', label: 'Initial Principal ($)', type: 'number', default: 10000, step: 500 },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 7.0, step: 0.1 },
      { id: 'years', label: 'Time Horizon (Years)', type: 'number', default: 10, min: 1, max: 100 },
      { id: 'compound', label: 'Compounding Frequency', type: 'select', options: [
        { val: '12', text: 'Monthly (12x/yr)' },
        { val: '1', text: 'Annually (1x/yr)' },
        { val: '4', text: 'Quarterly (4x/yr)' },
        { val: '365', text: 'Daily (365x/yr)' }
      ], default: '12' },
      { id: 'monthly_contrib', label: 'Additional Monthly Contribution ($)', type: 'number', default: 200, step: 25 }
    ],
    formula: 'A = P(1 + r/n)^(nt) + PMT · [((1 + r/n)^(nt) - 1) / (r/n)]',
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal) || 0;
      const r = (parseFloat(inputs.rate) || 0) / 100;
      const t = parseFloat(inputs.years) || 1;
      const n = parseFloat(inputs.compound) || 12;
      const pmt = parseFloat(inputs.monthly_contrib) || 0;

      const baseGrowth = p * Math.pow(1 + (r / n), n * t);
      let contribGrowth = 0;
      if (r > 0 && pmt > 0) {
        const periodicRate = r / 12;
        const totalMonths = t * 12;
        contribGrowth = pmt * ((Math.pow(1 + periodicRate, totalMonths) - 1) / periodicRate);
      } else {
        contribGrowth = pmt * 12 * t;
      }
      const total = baseGrowth + contribGrowth;
      const totalContributed = p + (pmt * 12 * t);
      const totalInterest = total - totalContributed;

      return {
        main: `$${Math.round(total).toLocaleString()}`,
        label: 'Future Value Balance',
        details: [
          { label: 'Total Principal Invested', value: `$${Math.round(totalContributed).toLocaleString()}` },
          { label: 'Total Compound Interest', value: `$${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Return on Investment (ROI)', value: `${((totalInterest / totalContributed) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    category: 'interest',
    icon: '💵',
    description: 'Calculate non-compounding simple interest on short term loans or fixed bonds.',
    keywords: ['simple interest', 'pnr', 'bonds', 'borrowing', 'flat interest'],
    inputs: [
      { id: 'p', label: 'Principal Amount ($)', type: 'number', default: 5000, step: 100 },
      { id: 'r', label: 'Annual Rate (%)', type: 'number', default: 5.0, step: 0.1 },
      { id: 't', label: 'Time (Years)', type: 'number', default: 3, step: 0.5 }
    ],
    formula: 'I = P · r · t',
    calculate: (inputs) => {
      const p = parseFloat(inputs.p) || 0;
      const r = (parseFloat(inputs.r) || 0) / 100;
      const t = parseFloat(inputs.t) || 0;
      const interest = p * r * t;
      return {
        main: `$${interest.toFixed(2)}`,
        label: 'Total Simple Interest',
        details: [
          { label: 'Final Total Amount', value: `$${(p + interest).toFixed(2)}` },
          { label: 'Annual Interest', value: `$${(p * r).toFixed(2)}/yr` }
        ]
      };
    }
  },
  {
    id: 'sip',
    name: 'SIP Calculator (Mutual Funds)',
    category: 'interest',
    icon: '🌱',
    description: 'Calculate returns on Systematic Investment Plans with optional step-up investment rate.',
    keywords: ['sip', 'mutual fund', 'invest', 'stock market', 'systematic investment', 'equity'],
    inputs: [
      { id: 'monthly', label: 'Monthly Investment ($ / ₹)', type: 'number', default: 5000, step: 500 },
      { id: 'rate', label: 'Expected Annual Return (%)', type: 'number', default: 12.0, step: 0.5 },
      { id: 'years', label: 'Investment Period (Years)', type: 'number', default: 15, min: 1, max: 40 }
    ],
    formula: 'FV = P · [((1 + i)^n - 1) / i] · (1 + i)',
    calculate: (inputs) => {
      const p = parseFloat(inputs.monthly) || 0;
      const i = ((parseFloat(inputs.rate) || 0) / 100) / 12;
      const n = (parseFloat(inputs.years) || 1) * 12;
      let total = 0;
      if (i > 0) {
        total = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      } else {
        total = p * n;
      }
      const invested = p * n;
      const wealthGained = total - invested;
      return {
        main: `${Math.round(total).toLocaleString()}`,
        label: 'Expected Maturity Value',
        details: [
          { label: 'Total Amount Invested', value: `${invested.toLocaleString()}` },
          { label: 'Estimated Wealth Gain', value: `${Math.round(wealthGained).toLocaleString()}` },
          { label: 'Growth Multiple', value: `${(total / invested).toFixed(2)}x` }
        ]
      };
    }
  },
  {
    id: 'fd',
    name: 'FD Calculator (Fixed Deposit)',
    category: 'interest',
    icon: '🏦',
    description: 'Calculate Fixed Deposit maturity amount, interest earned, and effective yield.',
    keywords: ['fd', 'fixed deposit', 'bank', 'term deposit', 'savings', 'guaranteed'],
    inputs: [
      { id: 'deposit', label: 'Total Investment ($ / ₹)', type: 'number', default: 100000, step: 5000 },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', default: 7.5, step: 0.1 },
      { id: 'tenure', label: 'Tenure (Years)', type: 'number', default: 5, min: 0.5, step: 0.5 },
      { id: 'freq', label: 'Compounding Frequency', type: 'select', options: [
        { val: '4', text: 'Quarterly (Standard)' },
        { val: '12', text: 'Monthly' },
        { val: '1', text: 'Annually' }
      ], default: '4' }
    ],
    formula: 'A = P(1 + r/n)^(nt)',
    calculate: (inputs) => {
      const p = parseFloat(inputs.deposit) || 0;
      const r = (parseFloat(inputs.rate) || 0) / 100;
      const t = parseFloat(inputs.tenure) || 1;
      const n = parseFloat(inputs.freq) || 4;
      const a = p * Math.pow(1 + (r / n), n * t);
      const interest = a - p;
      return {
        main: `${Math.round(a).toLocaleString()}`,
        label: 'Maturity Amount',
        details: [
          { label: 'Principal Amount', value: `${p.toLocaleString()}` },
          { label: 'Total Interest Earned', value: `${Math.round(interest).toLocaleString()}` },
          { label: 'Effective Annual Yield', value: `${((Math.pow(1 + r/n, n) - 1) * 100).toFixed(2)}%` }
        ]
      };
    }
  },
  {
    id: 'retirement',
    name: 'Retirement Savings Planner',
    category: 'interest',
    icon: '🏖️',
    description: 'Estimate your retirement nest egg balance, safe annual withdrawal, and shortfall.',
    keywords: ['retirement', 'pension', 'fire', '401k', 'savings', 'golden years'],
    inputs: [
      { id: 'cur_age', label: 'Current Age', type: 'number', default: 30, min: 18, max: 70 },
      { id: 'ret_age', label: 'Retirement Age', type: 'number', default: 65, min: 30, max: 90 },
      { id: 'current_savings', label: 'Current Savings ($)', type: 'number', default: 20000, step: 1000 },
      { id: 'monthly_save', label: 'Monthly Savings ($)', type: 'number', default: 500, step: 50 },
      { id: 'roi', label: 'Expected Annual Growth (%)', type: 'number', default: 7.0, step: 0.1 }
    ],
    formula: 'Compound Accumulation + Safe 4% Withdrawal Rule',
    calculate: (inputs) => {
      const curAge = parseFloat(inputs.cur_age) || 30;
      const retAge = parseFloat(inputs.ret_age) || 65;
      const years = Math.max(1, retAge - curAge);
      const p = parseFloat(inputs.current_savings) || 0;
      const pmt = parseFloat(inputs.monthly_save) || 0;
      const r = (parseFloat(inputs.roi) || 7) / 100;
      const monthlyRate = r / 12;
      const totalMonths = years * 12;

      const fvPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
      const fvContributions = pmt * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      const totalNestEgg = fvPrincipal + fvContributions;
      const safeWithdrawalYearly = totalNestEgg * 0.04;

      return {
        main: `$${Math.round(totalNestEgg).toLocaleString()}`,
        label: `Projected Nest Egg at Age ${retAge}`,
        details: [
          { label: 'Years to Save', value: `${years} Years` },
          { label: 'Safe 4% Annual Income', value: `$${Math.round(safeWithdrawalYearly).toLocaleString()}/yr` },
          { label: 'Monthly Retirement Income', value: `$${Math.round(safeWithdrawalYearly / 12).toLocaleString()}/mo` }
        ]
      };
    }
  },

  // --- Business ---
  {
    id: 'roi',
    name: 'ROI Calculator (Return on Investment)',
    category: 'business',
    icon: '💼',
    description: 'Calculate return on investment percentage, net profit, and annualized return rate.',
    keywords: ['roi', 'return', 'profit', 'investment', 'real estate', 'marketing'],
    inputs: [
      { id: 'cost', label: 'Amount Invested ($)', type: 'number', default: 5000, step: 100 },
      { id: 'revenue', label: 'Amount Returned / Revenue ($)', type: 'number', default: 7500, step: 100 },
      { id: 'time_years', label: 'Investment Duration (Years)', type: 'number', default: 1, min: 0.1, step: 0.5 }
    ],
    formula: 'ROI = [(Revenue - Cost) / Cost] · 100',
    calculate: (inputs) => {
      const c = parseFloat(inputs.cost) || 1;
      const rev = parseFloat(inputs.revenue) || 0;
      const t = parseFloat(inputs.time_years) || 1;
      const net = rev - c;
      const roi = (net / c) * 100;
      const annualized = (Math.pow(rev / c, 1 / t) - 1) * 100;
      return {
        main: `${roi.toFixed(2)}%`,
        label: 'Total Return on Investment (ROI)',
        badge: { text: net >= 0 ? 'Profitable' : 'Loss', class: net >= 0 ? 'badge-success' : 'badge-danger' },
        details: [
          { label: 'Net Profit / Gain', value: `$${net.toFixed(2)}` },
          { label: 'Annualized ROI (CAGR)', value: `${annualized.toFixed(2)}%` }
        ]
      };
    }
  },
  {
    id: 'break-even',
    name: 'Break-Even Calculator',
    category: 'business',
    icon: '⚖️',
    description: 'Determine the exact units and sales revenue needed to cover all fixed and variable costs.',
    keywords: ['breakeven', 'units', 'fixed cost', 'variable cost', 'startup', 'pricing'],
    inputs: [
      { id: 'fixed', label: 'Total Fixed Costs ($)', type: 'number', default: 10000, step: 500 },
      { id: 'price', label: 'Sale Price Per Unit ($)', type: 'number', default: 50, step: 1 },
      { id: 'variable', label: 'Variable Cost Per Unit ($)', type: 'number', default: 20, step: 1 }
    ],
    formula: 'Break-Even Units = Fixed Costs / (Price - Variable Cost)',
    calculate: (inputs) => {
      const fixed = parseFloat(inputs.fixed) || 0;
      const price = parseFloat(inputs.price) || 0;
      const variable = parseFloat(inputs.variable) || 0;
      const marginPerUnit = price - variable;
      if (marginPerUnit <= 0) {
        return { main: 'N/A', label: 'Price must exceed variable cost', details: [] };
      }
      const units = Math.ceil(fixed / marginPerUnit);
      const revenue = units * price;
      return {
        main: `${units.toLocaleString()} Units`,
        label: 'Break-Even Unit Sales',
        details: [
          { label: 'Break-Even Revenue', value: `$${revenue.toLocaleString()}` },
          { label: 'Contribution Margin / Unit', value: `$${marginPerUnit.toFixed(2)}` },
          { label: 'Contribution Margin Ratio', value: `${((marginPerUnit / price) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'margin',
    name: 'Margin Calculator',
    category: 'business',
    icon: '🏷️',
    description: 'Calculate gross profit margin and markup from cost and selling price.',
    keywords: ['margin', 'gross margin', 'markup', 'profit', 'sales', 'retail'],
    inputs: [
      { id: 'cost', label: 'Cost of Good ($)', type: 'number', default: 60, step: 1 },
      { id: 'revenue', label: 'Selling Price ($)', type: 'number', default: 100, step: 1 }
    ],
    formula: 'Gross Margin % = [(Revenue - Cost) / Revenue] · 100',
    calculate: (inputs) => {
      const cost = parseFloat(inputs.cost) || 0;
      const rev = parseFloat(inputs.revenue) || 0;
      if (rev === 0) return { main: '0%', label: 'Gross Margin', details: [] };
      const profit = rev - cost;
      const margin = (profit / rev) * 100;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;
      return {
        main: `${margin.toFixed(2)}%`,
        label: 'Gross Profit Margin',
        details: [
          { label: 'Gross Profit', value: `$${profit.toFixed(2)}` },
          { label: 'Equivalent Markup', value: `${markup.toFixed(2)}%` }
        ]
      };
    }
  },
  {
    id: 'markup',
    name: 'Markup Calculator',
    category: 'business',
    icon: '💲',
    description: 'Find retail selling price and profit from unit cost and desired markup percentage.',
    keywords: ['markup', 'selling price', 'retail price', 'wholesale', 'e-commerce'],
    inputs: [
      { id: 'cost', label: 'Cost ($)', type: 'number', default: 50, step: 1 },
      { id: 'markup_pct', label: 'Markup (%)', type: 'number', default: 40, step: 1 }
    ],
    formula: 'Selling Price = Cost + (Cost · Markup %)',
    calculate: (inputs) => {
      const cost = parseFloat(inputs.cost) || 0;
      const m = (parseFloat(inputs.markup_pct) || 0) / 100;
      const profit = cost * m;
      const price = cost + profit;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      return {
        main: `$${price.toFixed(2)}`,
        label: 'Target Selling Price',
        details: [
          { label: 'Profit Per Item', value: `$${profit.toFixed(2)}` },
          { label: 'Resulting Profit Margin', value: `${margin.toFixed(2)}%` }
        ]
      };
    }
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    category: 'business',
    icon: '📉',
    description: 'Calculate how inflation degrades purchasing power and the future cost of goods.',
    keywords: ['inflation', 'cpi', 'purchasing power', 'future cost', 'economy'],
    inputs: [
      { id: 'amount', label: 'Initial Amount ($)', type: 'number', default: 1000, step: 50 },
      { id: 'rate', label: 'Average Annual Inflation (%)', type: 'number', default: 3.5, step: 0.1 },
      { id: 'years', label: 'Number of Years', type: 'number', default: 10, min: 1, max: 100 }
    ],
    formula: 'Future Cost = Present · (1 + r)^t',
    calculate: (inputs) => {
      const p = parseFloat(inputs.amount) || 0;
      const r = (parseFloat(inputs.rate) || 0) / 100;
      const t = parseFloat(inputs.years) || 1;
      const futureCost = p * Math.pow(1 + r, t);
      const purchasingPower = p / Math.pow(1 + r, t);
      return {
        main: `$${futureCost.toFixed(2)}`,
        label: `Equivalent Cost in ${t} Years`,
        details: [
          { label: `Purchasing Power of $${p}`, value: `$${purchasingPower.toFixed(2)}` },
          { label: 'Cumulative Price Increase', value: `${(((futureCost - p) / p) * 100).toFixed(1)}%` }
        ]
      };
    }
  },

  // --- Everyday & Math ---
  {
    id: 'tip',
    name: 'Tip & Bill Splitter',
    category: 'everyday',
    icon: '🍽️',
    description: 'Calculate tip amount and split bills evenly among friends at restaurants.',
    keywords: ['tip', 'restaurant', 'bill split', 'dinner', 'gratuity'],
    inputs: [
      { id: 'bill', label: 'Total Bill Amount ($)', type: 'number', default: 85.00, step: 1 },
      { id: 'tip_pct', label: 'Tip Percentage (%)', type: 'number', default: 18, min: 0, max: 100 },
      { id: 'people', label: 'Number of People', type: 'number', default: 3, min: 1, max: 50 }
    ],
    formula: 'Tip = Bill · Tip % | Total / People',
    calculate: (inputs) => {
      const bill = parseFloat(inputs.bill) || 0;
      const tipPct = (parseFloat(inputs.tip_pct) || 0) / 100;
      const people = Math.max(1, parseInt(inputs.people) || 1);
      const tipAmount = bill * tipPct;
      const total = bill + tipAmount;
      const perPerson = total / people;
      return {
        main: `$${perPerson.toFixed(2)}`,
        label: 'Total Per Person',
        details: [
          { label: 'Total Tip', value: `$${tipAmount.toFixed(2)}` },
          { label: 'Total Bill with Tip', value: `$${total.toFixed(2)}` },
          { label: 'Tip Per Person', value: `$${(tipAmount / people).toFixed(2)}` }
        ]
      };
    }
  },
  {
    id: 'discount',
    name: 'Discount & Sale Calculator',
    category: 'everyday',
    icon: '🛍️',
    description: 'Find the final discounted price and money saved after applying percentage off.',
    keywords: ['discount', 'sale', 'percent off', 'promo', 'coupon', 'black friday'],
    inputs: [
      { id: 'original', label: 'Original Price ($)', type: 'number', default: 120, step: 1 },
      { id: 'discount_pct', label: 'Discount (%)', type: 'number', default: 25, min: 0, max: 100 },
      { id: 'tax_pct', label: 'Sales Tax (% optional)', type: 'number', default: 8, min: 0, max: 30 }
    ],
    formula: 'Final = [Price · (1 - Disc%)] · (1 + Tax%)',
    calculate: (inputs) => {
      const orig = parseFloat(inputs.original) || 0;
      const disc = (parseFloat(inputs.discount_pct) || 0) / 100;
      const tax = (parseFloat(inputs.tax_pct) || 0) / 100;
      const discountedPrice = orig * (1 - disc);
      const savings = orig * disc;
      const finalPrice = discountedPrice * (1 + tax);
      return {
        main: `$${finalPrice.toFixed(2)}`,
        label: 'Final Price (with Tax)',
        details: [
          { label: 'You Save', value: `$${savings.toFixed(2)} (${(disc * 100).toFixed(0)}% Off)` },
          { label: 'Price Before Tax', value: `$${discountedPrice.toFixed(2)}` }
        ]
      };
    }
  },
  {
    id: 'salary',
    name: 'Salary & Wage Converter',
    category: 'everyday',
    icon: '💵',
    description: 'Convert between hourly pay, weekly wage, monthly salary, and annual total compensation.',
    keywords: ['salary', 'hourly', 'wage', 'paycheck', 'income', 'job offer'],
    inputs: [
      { id: 'amount', label: 'Amount ($)', type: 'number', default: 35, step: 1 },
      { id: 'period', label: 'Pay Frequency', type: 'select', options: [
        { val: 'hourly', text: 'Hourly Rate' },
        { val: 'weekly', text: 'Weekly' },
        { val: 'monthly', text: 'Monthly' },
        { val: 'annual', text: 'Annual' }
      ], default: 'hourly' },
      { id: 'hours_week', label: 'Hours per Week', type: 'number', default: 40, min: 1, max: 100 }
    ],
    formula: 'Annual = Hourly × Hours/Wk × 52',
    calculate: (inputs) => {
      const val = parseFloat(inputs.amount) || 0;
      const hours = parseFloat(inputs.hours_week) || 40;
      let annual = 0;
      if (inputs.period === 'hourly') annual = val * hours * 52;
      else if (inputs.period === 'weekly') annual = val * 52;
      else if (inputs.period === 'monthly') annual = val * 12;
      else annual = val;

      const hourly = annual / (hours * 52);
      const monthly = annual / 12;
      const weekly = annual / 52;
      return {
        main: `$${Math.round(annual).toLocaleString()}`,
        label: 'Equivalent Annual Salary',
        details: [
          { label: 'Hourly Rate', value: `$${hourly.toFixed(2)} / hr` },
          { label: 'Weekly Pay', value: `$${weekly.toFixed(2)} / wk` },
          { label: 'Monthly Pay', value: `$${monthly.toFixed(2)} / mo` }
        ]
      };
    }
  },
  {
    id: 'fuel',
    name: 'Fuel Cost & Trip Calculator',
    category: 'everyday',
    icon: '⛽',
    description: 'Calculate trip fuel expenses, gas quantity required, and estimated carbon emissions.',
    keywords: ['fuel', 'gas', 'mileage', 'trip', 'road trip', 'mpg', 'cost'],
    inputs: [
      { id: 'distance', label: 'Trip Distance (miles / km)', type: 'number', default: 350, step: 10 },
      { id: 'efficiency', label: 'Fuel Efficiency (MPG / km/L)', type: 'number', default: 28, step: 1 },
      { id: 'price', label: 'Fuel Price (per gallon / liter)', type: 'number', default: 3.50, step: 0.05 }
    ],
    formula: 'Cost = (Distance / MPG) · Price',
    calculate: (inputs) => {
      const dist = parseFloat(inputs.distance) || 0;
      const eff = parseFloat(inputs.efficiency) || 1;
      const price = parseFloat(inputs.price) || 0;
      const fuelNeeded = dist / eff;
      const totalCost = fuelNeeded * price;
      return {
        main: `$${totalCost.toFixed(2)}`,
        label: 'Total Trip Fuel Cost',
        details: [
          { label: 'Fuel Needed', value: `${fuelNeeded.toFixed(2)} Units` },
          { label: 'Cost Per Mile/KM', value: `$${(totalCost / (dist || 1)).toFixed(3)}` }
        ]
      };
    }
  },
  {
    id: 'unit-converter',
    name: 'Multi-Unit Converter',
    category: 'everyday',
    icon: '🔄',
    description: 'Convert units for Length, Weight, Temperature, Area, Speed, Volume, and Digital Storage.',
    keywords: ['convert', 'units', 'meters', 'feet', 'celsius', 'fahrenheit', 'kg', 'pounds'],
    inputs: [
      { id: 'type', label: 'Category', type: 'select', options: [
        { val: 'length', text: 'Length (Meters ↔ Feet ↔ Inches)' },
        { val: 'weight', text: 'Weight (Kilograms ↔ Pounds)' },
        { val: 'temp', text: 'Temperature (°C ↔ °F ↔ K)' },
        { val: 'speed', text: 'Speed (km/h ↔ mph ↔ m/s)' },
        { val: 'data', text: 'Digital Data (GB ↔ MB ↔ TB)' }
      ], default: 'length' },
      { id: 'val', label: 'Value to Convert', type: 'number', default: 100, step: 0.1 }
    ],
    formula: 'Standard SI metric to Imperial conversion factors',
    calculate: (inputs) => {
      const v = parseFloat(inputs.val) || 0;
      if (inputs.type === 'length') {
        return {
          main: `${(v * 3.28084).toFixed(2)} ft`,
          label: `${v} Meters in Feet`,
          details: [
            { label: 'Inches', value: `${(v * 39.3701).toFixed(2)} in` },
            { label: 'Miles', value: `${(v * 0.000621371).toFixed(4)} mi` },
            { label: 'Kilometers', value: `${(v / 1000).toFixed(3)} km` }
          ]
        };
      } else if (inputs.type === 'weight') {
        return {
          main: `${(v * 2.20462).toFixed(2)} lbs`,
          label: `${v} kg in Pounds`,
          details: [
            { label: 'Grams', value: `${(v * 1000).toLocaleString()} g` },
            { label: 'Ounces', value: `${(v * 35.274).toFixed(2)} oz` }
          ]
        };
      } else if (inputs.type === 'temp') {
        const f = (v * 9/5) + 32;
        const k = v + 273.15;
        return {
          main: `${f.toFixed(1)} °F`,
          label: `${v} °C in Fahrenheit`,
          details: [
            { label: 'Kelvin', value: `${k.toFixed(2)} K` },
            { label: 'Formula', value: '°F = (°C × 9/5) + 32' }
          ]
        };
      } else if (inputs.type === 'speed') {
        return {
          main: `${(v * 0.621371).toFixed(2)} mph`,
          label: `${v} km/h in Miles per Hour`,
          details: [
            { label: 'Meters/second', value: `${(v / 3.6).toFixed(2)} m/s` },
            { label: 'Knots', value: `${(v * 0.539957).toFixed(2)} kn` }
          ]
        };
      } else {
        return {
          main: `${(v * 1024).toLocaleString()} MB`,
          label: `${v} GB in Megabytes`,
          details: [
            { label: 'Terabytes', value: `${(v / 1024).toFixed(3)} TB` },
            { label: 'Kilobytes', value: `${(v * 1024 * 1024).toLocaleString()} KB` }
          ]
        };
      }
    }
  },

  // --- Health & Fitness ---
  {
    id: 'bodyfat',
    name: 'Body Fat Calculator',
    category: 'health',
    icon: '💪',
    description: 'Estimate body fat percentage using the U.S. Navy circumference method.',
    keywords: ['body fat', 'navy method', 'lean mass', 'fitness', 'waist', 'neck'],
    inputs: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ val: 'male', text: 'Male' }, { val: 'female', text: 'Female' }], default: 'male' },
      { id: 'height', label: 'Height (cm)', type: 'number', default: 175, min: 100, max: 250 },
      { id: 'neck', label: 'Neck Circumference (cm)', type: 'number', default: 38, min: 20, max: 80 },
      { id: 'waist', label: 'Waist Circumference (cm)', type: 'number', default: 85, min: 40, max: 180 },
      { id: 'hip', label: 'Hip Circumference (cm for women)', type: 'number', default: 95, min: 40, max: 180 }
    ],
    formula: 'U.S. Navy Anthropometric Formula',
    calculate: (inputs) => {
      const h = parseFloat(inputs.height) || 175;
      const neck = parseFloat(inputs.neck) || 38;
      const waist = parseFloat(inputs.waist) || 85;
      const hip = parseFloat(inputs.hip) || 95;
      let bf = 0;
      if (inputs.gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, waist - neck)) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(1, waist + hip - neck)) + 0.22100 * Math.log10(h)) - 450;
      }
      bf = Math.max(2, Math.min(60, bf));
      let category = bf < 14 ? 'Athletes' : (bf < 24 ? 'Fitness/Normal' : 'Higher Fat');
      return {
        main: `${bf.toFixed(1)}%`,
        label: 'Estimated Body Fat Percentage',
        details: [
          { label: 'Category', value: category },
          { label: 'Fat Mass Classification', value: `${bf.toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'water',
    name: 'Water Intake Hydration Calculator',
    category: 'health',
    icon: '💧',
    description: 'Calculate your optimal daily water intake based on weight and physical activity.',
    keywords: ['water', 'hydration', 'drinks', 'health', 'daily fluid', 'glasses'],
    inputs: [
      { id: 'weight', label: 'Body Weight (kg)', type: 'number', default: 70, min: 20 },
      { id: 'exercise_min', label: 'Daily Exercise (Minutes)', type: 'number', default: 30, min: 0 }
    ],
    formula: 'Water (L) = Weight · 0.033 + (Exercise Mins / 30 · 0.35)',
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight) || 70;
      const ex = parseFloat(inputs.exercise_min) || 0;
      const baseL = w * 0.033;
      const exerciseExtra = (ex / 30) * 0.35;
      const totalL = baseL + exerciseExtra;
      const glasses = totalL / 0.25; // 250ml glasses
      return {
        main: `${totalL.toFixed(1)} Liters`,
        label: 'Recommended Daily Water Intake',
        details: [
          { label: 'In Standard Glasses (250ml)', value: `~${Math.round(glasses)} Glasses` },
          { label: 'In Fluid Ounces (fl oz)', value: `${(totalL * 33.814).toFixed(0)} fl oz` }
        ]
      };
    }
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Due Date Calculator',
    category: 'health',
    icon: '👶',
    description: 'Estimate baby due date, current gestational age, and pregnancy trimester milestones.',
    keywords: ['pregnancy', 'due date', 'baby', 'trimester', 'lmp', 'gestation'],
    inputs: [
      { id: 'lmp', label: 'First Day of Last Period (LMP)', type: 'date', default: new Date(Date.now() - 60*24*3600*1000).toISOString().split('T')[0] }
    ],
    formula: "Naegele's Rule: LMP + 280 Days (40 Weeks)",
    calculate: (inputs) => {
      const lmpDate = new Date(inputs.lmp || Date.now());
      const dueDate = new Date(lmpDate.getTime() + (280 * 24 * 60 * 60 * 1000));
      const today = new Date();
      const diffDays = Math.max(0, Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24)));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      let trimester = 'First Trimester';
      if (weeks >= 28) trimester = 'Third Trimester';
      else if (weeks >= 13) trimester = 'Second Trimester';

      return {
        main: dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
        label: 'Estimated Due Date',
        badge: { text: trimester, class: 'badge-info' },
        details: [
          { label: 'Current Progress', value: `${weeks} Weeks, ${days} Days` },
          { label: 'Days Remaining', value: `${Math.max(0, 280 - diffDays)} Days` }
        ]
      };
    }
  },
  {
    id: 'pace',
    name: 'Running Pace Calculator',
    category: 'health',
    icon: '🏃‍♂️',
    description: 'Calculate running pace, speed, and race finish times for 5K, 10K, Half, or Marathon.',
    keywords: ['pace', 'running', 'marathon', '5k', '10k', 'speed', 'splits'],
    inputs: [
      { id: 'event', label: 'Distance', type: 'select', options: [
        { val: '5', text: '5K (5 km)' },
        { val: '10', text: '10K (10 km)' },
        { val: '21.0975', text: 'Half Marathon (21.1 km)' },
        { val: '42.195', text: 'Full Marathon (42.2 km)' }
      ], default: '5' },
      { id: 'hours', label: 'Hours', type: 'number', default: 0, min: 0 },
      { id: 'mins', label: 'Minutes', type: 'number', default: 25, min: 0 },
      { id: 'secs', label: 'Seconds', type: 'number', default: 0, min: 0 }
    ],
    formula: 'Pace = Total Time / Distance',
    calculate: (inputs) => {
      const dist = parseFloat(inputs.event) || 5;
      const totalMins = (parseFloat(inputs.hours) || 0) * 60 + (parseFloat(inputs.mins) || 0) + (parseFloat(inputs.secs) || 0) / 60;
      if (totalMins <= 0) return { main: '0:00 /km', label: 'Pace', details: [] };
      const pacePerKm = totalMins / dist;
      const pMins = Math.floor(pacePerKm);
      const pSecs = Math.round((pacePerKm - pMins) * 60);
      const pacePerMi = totalMins / (dist * 0.621371);
      const mPMin = Math.floor(pacePerMi);
      const mPSec = Math.round((pacePerMi - mPMin) * 60);
      const speedKmh = dist / (totalMins / 60);

      return {
        main: `${pMins}:${pSecs < 10 ? '0' : ''}${pSecs} /km`,
        label: 'Average Running Pace',
        details: [
          { label: 'Pace per Mile', value: `${mPMin}:${mPSec < 10 ? '0' : ''}${mPSec} /mi` },
          { label: 'Speed', value: `${speedKmh.toFixed(2)} km/h (${(speedKmh * 0.621371).toFixed(2)} mph)` }
        ]
      };
    }
  },
  {
    id: 'ovulation',
    name: 'Ovulation & Fertility Calculator',
    category: 'health',
    icon: '🌸',
    description: 'Predict most fertile window, ovulation day, and next menstrual period.',
    keywords: ['ovulation', 'fertility', 'conception', 'period', 'cycle'],
    inputs: [
      { id: 'last_period', label: 'First Day of Last Period', type: 'date', default: new Date().toISOString().split('T')[0] },
      { id: 'cycle_length', label: 'Average Cycle Length (Days)', type: 'number', default: 28, min: 21, max: 40 }
    ],
    formula: 'Ovulation = Next Period Date - 14 Days',
    calculate: (inputs) => {
      const lmp = new Date(inputs.last_period || Date.now());
      const cycle = parseInt(inputs.cycle_length) || 28;
      const nextPeriod = new Date(lmp.getTime() + (cycle * 24 * 3600 * 1000));
      const ovulation = new Date(nextPeriod.getTime() - (14 * 24 * 3600 * 1000));
      const fertileStart = new Date(ovulation.getTime() - (5 * 24 * 3600 * 1000));

      return {
        main: ovulation.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        label: 'Estimated Ovulation Day',
        details: [
          { label: 'Fertile Window', value: `${fertileStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${ovulation.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` },
          { label: 'Next Period Date', value: nextPeriod.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }
        ]
      };
    }
  },
  {
    id: 'sleep',
    name: 'Sleep Cycle Calculator',
    category: 'health',
    icon: '🌙',
    description: 'Calculate ideal wake-up times and bedtimes based on natural 90-minute REM sleep cycles.',
    keywords: ['sleep', 'rem cycle', 'wake up', 'bedtime', 'insomnia', 'alarm'],
    inputs: [
      { id: 'wake_time', label: 'Target Wake-Up Time', type: 'time', default: '07:00' }
    ],
    formula: 'Cycles: 90 mins each + 15 mins to fall asleep',
    calculate: (inputs) => {
      const parts = (inputs.wake_time || '07:00').split(':');
      const wakeH = parseInt(parts[0]) || 7;
      const wakeM = parseInt(parts[1]) || 0;
      const target = new Date();
      target.setHours(wakeH, wakeM, 0, 0);

      // Bedtimes for 6 cycles (9h), 5 cycles (7.5h), 4 cycles (6h)
      const times = [6, 5, 4].map(cycles => {
        const d = new Date(target.getTime() - (cycles * 90 + 15) * 60 * 1000);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      });

      return {
        main: `${times[1]} (5 Cycles)`,
        label: 'Recommended Bedtime (7.5h Sleep)',
        details: [
          { label: 'Optimal 9h (6 Cycles)', value: times[0] },
          { label: 'Recommended 7.5h (5 Cycles)', value: times[1] },
          { label: 'Minimum 6h (4 Cycles)', value: times[2] }
        ]
      };
    }
  },

  // --- Education ---
  {
    id: 'cgpa-percent',
    name: 'CGPA to Percentage Converter',
    category: 'education',
    icon: '📜',
    description: 'Convert CGPA to percentage using standard Indian university conversion formulas (CBSE, VTU, KTU, AICTE).',
    keywords: ['cgpa', 'percentage', 'cbse', 'vtu', 'ktu', 'university grades'],
    inputs: [
      { id: 'board', label: 'University / Board Formula', type: 'select', options: [
        { val: 'cbse', text: 'CBSE / AICTE (Percentage = CGPA × 9.5)' },
        { val: 'vtu', text: 'VTU (Percentage = (CGPA - 0.75) × 10)' },
        { val: 'ktu', text: 'KTU (Percentage = (CGPA - 0.5) × 10)' },
        { val: 'direct10', text: 'Direct 10 Scale (Percentage = CGPA × 10)' }
      ], default: 'cbse' },
      { id: 'cgpa', label: 'CGPA (Out of 10.0)', type: 'number', default: 8.4, min: 0, max: 10, step: 0.01 }
    ],
    formula: 'Percentage = CGPA × 9.5 (or Board Specific Factor)',
    calculate: (inputs) => {
      const cgpa = parseFloat(inputs.cgpa) || 0;
      let pct = 0;
      if (inputs.board === 'cbse') pct = cgpa * 9.5;
      else if (inputs.board === 'vtu') pct = Math.max(0, (cgpa - 0.75) * 10);
      else if (inputs.board === 'ktu') pct = Math.max(0, (cgpa - 0.5) * 10);
      else pct = cgpa * 10;

      return {
        main: `${pct.toFixed(2)}%`,
        label: `Equivalent Percentage (${inputs.board.toUpperCase()})`,
        details: [
          { label: 'Input CGPA', value: `${cgpa.toFixed(2)} / 10.0` },
          { label: 'Academic Standing', value: pct >= 75 ? 'First Class with Distinction' : (pct >= 60 ? 'First Class' : 'Second Class') }
        ]
      };
    }
  },

  // --- Date & Time ---
  {
    id: 'age',
    name: 'Exact Age Calculator',
    category: 'datetime',
    icon: '🎂',
    description: 'Calculate your exact age in years, months, days, total hours, and countdown to next birthday.',
    keywords: ['age', 'birthday', 'dob', 'years', 'days old', 'milestone'],
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '2000-01-15' }
    ],
    formula: 'Current Date - Date of Birth',
    calculate: (inputs) => {
      const dob = new Date(inputs.dob || '2000-01-15');
      const now = new Date();
      if (isNaN(dob.getTime()) || dob > now) {
        return { main: '0 Years', label: 'Invalid Date of Birth', details: [] };
      }

      let years = now.getFullYear() - dob.getFullYear();
      let months = now.getMonth() - dob.getMonth();
      let days = now.getDate() - dob.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const totalDiffMs = now - dob;
      const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));

      const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
      const daysToNext = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));

      return {
        main: `${years} Years, ${months} Mos, ${days} Days`,
        label: 'Exact Chronological Age',
        details: [
          { label: 'Total Days Lived', value: `${totalDays.toLocaleString()} Days` },
          { label: 'Total Hours', value: `${(totalDays * 24).toLocaleString()} Hours` },
          { label: 'Days Until Next Birthday', value: `${daysToNext} Days` }
        ]
      };
    }
  },
  {
    id: 'date-diff',
    name: 'Date Difference Calculator',
    category: 'datetime',
    icon: '🗓️',
    description: 'Calculate the total days, weeks, business days, and time between two dates.',
    keywords: ['date', 'days between', 'calendar', 'duration', 'weeks', 'event'],
    inputs: [
      { id: 'start_date', label: 'Start Date', type: 'date', default: new Date().toISOString().split('T')[0] },
      { id: 'end_date', label: 'End Date', type: 'date', default: new Date(Date.now() + 90*24*3600*1000).toISOString().split('T')[0] }
    ],
    formula: 'End Date - Start Date',
    calculate: (inputs) => {
      const d1 = new Date(inputs.start_date);
      const d2 = new Date(inputs.end_date);
      const diffMs = Math.abs(d2 - d1);
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
      const weeks = (days / 7).toFixed(1);
      return {
        main: `${days} Days`,
        label: 'Total Calendar Days',
        details: [
          { label: 'In Weeks', value: `${weeks} Weeks` },
          { label: 'Approx Months', value: `${(days / 30.4375).toFixed(1)} Months` }
        ]
      };
    }
  },
  {
    id: 'time-duration',
    name: 'Time & Timesheet Calculator',
    category: 'datetime',
    icon: '⏱️',
    description: 'Calculate hours and minutes between two timestamps and decimal hours for freelance billing.',
    keywords: ['time', 'hours', 'timesheet', 'minutes', 'freelance billing', 'duration'],
    inputs: [
      { id: 'start', label: 'Start Time', type: 'time', default: '09:00' },
      { id: 'end', label: 'End Time', type: 'time', default: '17:30' },
      { id: 'break_mins', label: 'Unpaid Break (Minutes)', type: 'number', default: 30, min: 0 }
    ],
    formula: 'Work Duration = (End Time - Start Time) - Break',
    calculate: (inputs) => {
      const s = (inputs.start || '09:00').split(':');
      const e = (inputs.end || '17:30').split(':');
      let startM = parseInt(s[0]) * 60 + parseInt(s[1]);
      let endM = parseInt(e[0]) * 60 + parseInt(e[1]);
      if (endM < startM) endM += 24 * 60; // overnight
      const breakM = parseFloat(inputs.break_mins) || 0;
      const netMinutes = Math.max(0, endM - startM - breakM);
      const hrs = Math.floor(netMinutes / 60);
      const mins = netMinutes % 60;
      const decimalHours = (netMinutes / 60).toFixed(2);
      return {
        main: `${hrs}h ${mins}m`,
        label: 'Total Net Work Time',
        details: [
          { label: 'Decimal Hours (For Billing)', value: `${decimalHours} Hours` },
          { label: 'Total Minutes', value: `${netMinutes} Minutes` }
        ]
      };
    }
  }
];

// ==========================================
// 2. Application State & Storage
// ==========================================

let activeCategory = 'all';
let currentCalc = null;
let calculationHistory = JSON.parse(localStorage.getItem('smart_calc_history') || '[]');
let currentTheme = localStorage.getItem('smart_calc_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Scientific Calculator State
let sciExpression = '';
let sciResult = '0';
let sciMemory = 0;

// Apply initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// ==========================================
// 3. UI Rendering & Interaction
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryTabs();
  renderCalculatorsGrid();
  setupEventListeners();
  updateThemeIcon();
  renderHistoryList();
});

function renderCategoryTabs() {
  const container = document.getElementById('categoryNav');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all' 
      ? CALCULATORS.length 
      : (cat.id === 'popular' ? CALCULATORS.filter(c => c.popular).length : CALCULATORS.filter(c => c.category === cat.id).length);
    return `
      <button class="cat-tab ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
        <span class="cat-badge">${count}</span>
      </button>
    `;
  }).join('');
}

function renderCalculatorsGrid(searchQuery = '') {
  const grid = document.getElementById('calculatorsGrid');
  if (!grid) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = CALCULATORS.filter(calc => {
    const matchesCat = activeCategory === 'all' 
      ? true 
      : (activeCategory === 'popular' ? calc.popular : calc.category === activeCategory);

    const matchesSearch = query === '' 
      ? true 
      : (calc.name.toLowerCase().includes(query) || 
         calc.description.toLowerCase().includes(query) || 
         (calc.keywords && calc.keywords.some(k => k.toLowerCase().includes(query))));

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</p>
        <p>No calculators found matching "<strong>${escapeHtml(searchQuery)}</strong>"</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(calc => `
    <div class="calc-card" data-calc-id="${calc.id}">
      <div class="calc-card-header">
        <div class="calc-card-icon">${calc.icon}</div>
        <div>
          <h3 class="calc-card-title">${calc.name}</h3>
          <div class="calc-card-cat">${calc.category}</div>
        </div>
      </div>
      <p class="calc-card-desc">${calc.description}</p>
      <div class="calc-card-footer">
        <span>Free & Instant</span>
        <span class="calc-card-btn">Open Tool &rarr;</span>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 4. Modal & Calculator Runner
// ==========================================

function openCalculator(calcId) {
  const calc = CALCULATORS.find(c => c.id === calcId);
  if (!calc) return;
  currentCalc = calc;

  const modal = document.getElementById('calcModal');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const icon = document.getElementById('modalIcon');
  const body = document.getElementById('modalBody');

  title.textContent = calc.name;
  subtitle.textContent = calc.description;
  icon.textContent = calc.icon;

  if (calc.type === 'scientific_ui') {
    body.innerHTML = renderScientificCalcWidget();
    initScientificEvents();
  } else {
    body.innerHTML = `
      <div class="calc-form-grid" id="calcFormGrid">
        ${calc.inputs.map(renderInputField).join('')}
      </div>
      <div class="results-card" id="resultsContainer">
        <!-- Live computation results will render here -->
      </div>
      ${calc.formula ? `
        <div class="formula-box">
          <div class="formula-box-title">📐 Formula & Logic</div>
          <div>${calc.formula}</div>
        </div>
      ` : ''}
      <div class="modal-actions">
        <button class="btn btn-secondary" id="copyResultBtn">📋 Copy Result</button>
        <button class="btn btn-primary" id="saveHistoryBtn">⭐ Save to History</button>
      </div>
    `;

    bindFormEvents();
    computeAndRenderResult();
  }

  modal.classList.add('active');
}

function renderInputField(field) {
  if (field.hidden) return '';
  if (field.type === 'select') {
    return `
      <div class="form-group">
        <label class="form-label" for="inp_${field.id}">${field.label}</label>
        <select class="form-select" id="inp_${field.id}" data-id="${field.id}">
          ${field.options.map(opt => `<option value="${opt.val}" ${opt.val === field.default ? 'selected' : ''}>${opt.text}</option>`).join('')}
        </select>
      </div>
    `;
  }
  return `
    <div class="form-group">
      <label class="form-label" for="inp_${field.id}">
        <span>${field.label}</span>
      </label>
      <input 
        type="${field.type}" 
        class="form-input" 
        id="inp_${field.id}" 
        data-id="${field.id}"
        value="${field.default !== undefined ? field.default : ''}"
        ${field.min !== undefined ? `min="${field.min}"` : ''}
        ${field.max !== undefined ? `max="${field.max}"` : ''}
        ${field.step !== undefined ? `step="${field.step}"` : ''}
      />
    </div>
  `;
}

function bindFormEvents() {
  const inputs = document.querySelectorAll('#calcFormGrid .form-input, #calcFormGrid .form-select');
  inputs.forEach(input => {
    input.addEventListener('input', () => computeAndRenderResult());
    input.addEventListener('change', () => computeAndRenderResult());
  });

  const copyBtn = document.getElementById('copyResultBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const resContainer = document.getElementById('resultsContainer');
      if (!resContainer) return;
      const mainVal = resContainer.querySelector('.result-main-val')?.textContent || '';
      const mainLabel = resContainer.querySelector('.result-main-label')?.textContent || '';
      navigator.clipboard.writeText(`${currentCalc.name}: ${mainLabel} = ${mainVal}`);
      showToast('Result copied to clipboard!');
    });
  }

  const saveBtn = document.getElementById('saveHistoryBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveCurrentToHistory();
    });
  }
}

function computeAndRenderResult() {
  if (!currentCalc || !currentCalc.calculate) return;
  const inputVals = {};
  document.querySelectorAll('#calcFormGrid [data-id]').forEach(el => {
    inputVals[el.getAttribute('data-id')] = el.value;
  });

  const res = currentCalc.calculate(inputVals);
  const container = document.getElementById('resultsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="result-main">
      <div class="result-main-label">${res.label || 'Result'}</div>
      <div class="result-main-val">${res.main}</div>
      ${res.badge ? `<span class="result-badge ${res.badge.class}">${res.badge.text}</span>` : ''}
    </div>
    ${res.details && res.details.length > 0 ? `
      <div class="results-grid">
        ${res.details.map(d => `
          <div class="result-item">
            <span class="result-item-label">${d.label}</span>
            <span class="result-item-val">${d.value}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function saveCurrentToHistory() {
  if (!currentCalc) return;
  const resContainer = document.getElementById('resultsContainer');
  const mainVal = resContainer?.querySelector('.result-main-val')?.textContent || 'Result';
  const entry = {
    id: Date.now(),
    calcId: currentCalc.id,
    title: currentCalc.name,
    icon: currentCalc.icon,
    result: mainVal,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  calculationHistory.unshift(entry);
  if (calculationHistory.length > 30) calculationHistory.pop();
  localStorage.setItem('smart_calc_history', JSON.stringify(calculationHistory));
  renderHistoryList();
  showToast('Saved to history drawer!');
}

// ==========================================
// 5. Interactive Scientific Calculator Engine
// ==========================================

function renderScientificCalcWidget() {
  return `
    <div class="sci-calc-container">
      <div class="sci-calc-screen">
        <div class="sci-history-line" id="sciHistory">${sciExpression || '&nbsp;'}</div>
        <div class="sci-display-line" id="sciDisplay">${sciResult}</div>
      </div>
      <div class="sci-grid">
        <button class="sci-btn sci-func" data-fn="deg_rad">RAD</button>
        <button class="sci-btn sci-func" data-fn="sin">sin</button>
        <button class="sci-btn sci-func" data-fn="cos">cos</button>
        <button class="sci-btn sci-func" data-fn="tan">tan</button>
        <button class="sci-btn sci-clear" data-action="clear">AC</button>

        <button class="sci-btn sci-func" data-fn="ln">ln</button>
        <button class="sci-btn sci-func" data-fn="log">log</button>
        <button class="sci-btn sci-func" data-fn="sqrt">√</button>
        <button class="sci-btn sci-func" data-fn="pow">xʸ</button>
        <button class="sci-btn sci-op" data-action="backspace">⌫</button>

        <button class="sci-btn sci-func" data-val="(">(</button>
        <button class="sci-btn sci-func" data-val=")">)</button>
        <button class="sci-btn sci-func" data-fn="pi">π</button>
        <button class="sci-btn sci-func" data-fn="e">e</button>
        <button class="sci-btn sci-op" data-val="/">÷</button>

        <button class="sci-btn" data-val="7">7</button>
        <button class="sci-btn" data-val="8">8</button>
        <button class="sci-btn" data-val="9">9</button>
        <button class="sci-btn sci-func" data-fn="fact">x!</button>
        <button class="sci-btn sci-op" data-val="*">×</button>

        <button class="sci-btn" data-val="4">4</button>
        <button class="sci-btn" data-val="5">5</button>
        <button class="sci-btn" data-val="6">6</button>
        <button class="sci-btn sci-func" data-fn="inv">1/x</button>
        <button class="sci-btn sci-op" data-val="-">−</button>

        <button class="sci-btn" data-val="1">1</button>
        <button class="sci-btn" data-val="2">2</button>
        <button class="sci-btn" data-val="3">3</button>
        <button class="sci-btn sci-func" data-fn="pct">%</button>
        <button class="sci-btn sci-op" data-val="+">+</button>

        <button class="sci-btn" data-val="0">0</button>
        <button class="sci-btn" data-val=".">.</button>
        <button class="sci-btn sci-func" data-fn="mplus">M+</button>
        <button class="sci-btn sci-eq" data-action="equals">=</button>
      </div>
    </div>
  `;
}

function initScientificEvents() {
  document.querySelectorAll('.sci-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      const action = btn.getAttribute('data-action');
      const fn = btn.getAttribute('data-fn');

      if (val) {
        if (sciResult === '0' && !isNaN(val)) sciResult = val;
        else sciResult += val;
      } else if (action === 'clear') {
        sciExpression = '';
        sciResult = '0';
      } else if (action === 'backspace') {
        sciResult = sciResult.length > 1 ? sciResult.slice(0, -1) : '0';
      } else if (action === 'equals') {
        calculateScientificExpression();
      } else if (fn) {
        handleScientificFunction(fn);
      }
      updateSciDisplay();
    });
  });
}

function handleScientificFunction(fn) {
  let num = parseFloat(sciResult) || 0;
  if (fn === 'sin') sciResult = Math.sin(num).toFixed(6).replace(/\.?0+$/, '');
  else if (fn === 'cos') sciResult = Math.cos(num).toFixed(6).replace(/\.?0+$/, '');
  else if (fn === 'tan') sciResult = Math.tan(num).toFixed(6).replace(/\.?0+$/, '');
  else if (fn === 'sqrt') sciResult = Math.sqrt(num).toString();
  else if (fn === 'log') sciResult = Math.log10(num).toFixed(6).replace(/\.?0+$/, '');
  else if (fn === 'ln') sciResult = Math.log(num).toFixed(6).replace(/\.?0+$/, '');
  else if (fn === 'pi') sciResult = Math.PI.toFixed(6);
  else if (fn === 'e') sciResult = Math.E.toFixed(6);
  else if (fn === 'pow') sciResult += '^';
  else if (fn === 'inv') sciResult = (num !== 0 ? (1 / num).toString() : 'Error');
  else if (fn === 'pct') sciResult = (num / 100).toString();
  else if (fn === 'fact') {
    let f = 1; for (let i = 2; i <= Math.min(num, 100); i++) f *= i;
    sciResult = f.toString();
  } else if (fn === 'mplus') {
    sciMemory += num;
    showToast(`Memory: ${sciMemory}`);
  }
}

function calculateScientificExpression() {
  try {
    sciExpression = sciResult;
    let safeExp = sciResult.replace(/\^/g, '**');
    // Basic safe eval for numbers & math ops
    if (/^[0-9+\-*/().\s*]+$/.test(safeExp)) {
      const res = Function(`'use strict'; return (${safeExp})`)();
      sciResult = (Math.round(res * 100000000) / 100000000).toString();
    }
  } catch (e) {
    sciResult = 'Error';
  }
}

function updateSciDisplay() {
  const d = document.getElementById('sciDisplay');
  const h = document.getElementById('sciHistory');
  if (d) d.textContent = sciResult;
  if (h) h.textContent = sciExpression || ' ';
}

// ==========================================
// 6. Global Search & ⌘K Palette
// ==========================================

function openSearchPalette() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchPaletteInput');
  if (!modal || !input) return;
  modal.classList.add('active');
  input.value = '';
  input.focus();
  renderPaletteResults('');
}

function closeSearchPalette() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.classList.remove('active');
}

function renderPaletteResults(query) {
  const container = document.getElementById('searchPaletteResults');
  if (!container) return;
  const q = query.toLowerCase().trim();
  const results = CALCULATORS.filter(c => 
    q === '' || 
    c.name.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q) || 
    (c.keywords && c.keywords.some(k => k.toLowerCase().includes(q)))
  ).slice(0, 8);

  if (results.length === 0) {
    container.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No calculators found for "${escapeHtml(query)}"</div>`;
    return;
  }

  container.innerHTML = results.map(c => `
    <div class="search-palette-item" data-calc-id="${c.id}">
      <span class="search-palette-icon">${c.icon}</span>
      <div class="search-palette-meta">
        <span class="search-palette-name">${c.name}</span>
        <span class="search-palette-desc">${c.description}</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.search-palette-item').forEach(item => {
    item.addEventListener('click', () => {
      closeSearchPalette();
      openCalculator(item.getAttribute('data-calc-id'));
    });
  });
}

// ==========================================
// 7. Event Listeners & Theme Toggling
// ==========================================

function setupEventListeners() {
  // Category tabs click
  document.getElementById('categoryNav')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    activeCategory = tab.getAttribute('data-category');
    renderCategoryTabs();
    renderCalculatorsGrid(document.getElementById('heroSearchInput')?.value || '');
  });

  // Hero Quick Search Input
  const heroSearch = document.getElementById('heroSearchInput');
  if (heroSearch) {
    heroSearch.addEventListener('input', (e) => {
      renderCalculatorsGrid(e.target.value);
    });
  }

  // Calculator Card Click
  document.getElementById('calculatorsGrid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.calc-card');
    if (!card) return;
    openCalculator(card.getAttribute('data-calc-id'));
  });

  // Popular Pill buttons
  document.querySelectorAll('.popular-section .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-calc');
      if (id) openCalculator(id);
    });
  });

  // Modal Close buttons
  document.getElementById('modalCloseBtn')?.addEventListener('click', () => {
    document.getElementById('calcModal')?.classList.remove('active');
  });

  document.getElementById('calcModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'calcModal') {
      document.getElementById('calcModal')?.classList.remove('active');
    }
  });

  // Theme Toggle Button
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

  // Search Modal Trigger & Input
  document.getElementById('searchTriggerBtn')?.addEventListener('click', openSearchPalette);
  document.getElementById('searchPaletteInput')?.addEventListener('input', (e) => {
    renderPaletteResults(e.target.value);
  });
  document.getElementById('searchModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'searchModal') closeSearchPalette();
  });

  // Keyboard shortcut (⌘K / Ctrl+K / Escape)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearchPalette();
    }
    if (e.key === 'Escape') {
      closeSearchPalette();
      document.getElementById('calcModal')?.classList.remove('active');
      document.getElementById('historyDrawer')?.classList.remove('active');
    }
  });

  // History Drawer toggle
  document.getElementById('historyToggleBtn')?.addEventListener('click', () => {
    document.getElementById('historyDrawer')?.classList.toggle('active');
  });
  document.getElementById('historyCloseBtn')?.addEventListener('click', () => {
    document.getElementById('historyDrawer')?.classList.remove('active');
  });
  document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
    calculationHistory = [];
    localStorage.removeItem('smart_calc_history');
    renderHistoryList();
    showToast('History cleared.');
  });
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('smart_calc_theme', currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

function renderHistoryList() {
  const container = document.getElementById('historyList');
  if (!container) return;
  if (calculationHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.9rem;">
        No recent calculations saved yet.
      </div>
    `;
    return;
  }
  container.innerHTML = calculationHistory.map(item => `
    <div class="history-item" data-calc-id="${item.calcId}">
      <div class="history-item-top">
        <span>${item.icon} ${item.title}</span>
        <span>${item.time}</span>
      </div>
      <div class="history-item-val">${item.result}</div>
    </div>
  `).join('');

  container.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('historyDrawer')?.classList.remove('active');
      openCalculator(el.getAttribute('data-calc-id'));
    });
  });
}

function showToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}