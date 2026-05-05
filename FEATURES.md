# 📊 Universal Calculator Pro - Features Documentation

## Overview

Universal Calculator Pro is a comprehensive, multi-mode calculator application designed for professionals, students, and everyday users. It combines simplicity with power, offering intuitive basic arithmetic alongside advanced scientific, programming, and financial calculations.

---

## 🧮 Calculator Modes

### 1. **Basic Mode** (Default)
The fundamental arithmetic calculator for everyday calculations.

**Operations:**
- ➕ Addition (+)
- ➖ Subtraction (-)
- ✖️ Multiplication (*)
- ➗ Division (/)
- 🔢 Decimal numbers
- 📊 Parentheses for order of operations

**Use Cases:**
- Quick calculations
- Shopping/budgeting
- Basic math homework
- Tip calculations

**Example:**
```
Input: 25 + 15 * 2
Output: 55
(Respects PEMDAS order of operations)
```

---

### 2. **Scientific Mode**
Advanced mathematical functions for scientific calculations.

**Trigonometric Functions:**
- `sin(x)` - Sine
- `cos(x)` - Cosine
- `tan(x)` - Tangent
- `asin(x)` - Arcsine
- `acos(x)` - Arccosine
- `atan(x)` - Arctangent

**Logarithmic Functions:**
- `log(x)` - Logarithm base 10
- `ln(x)` - Natural logarithm
- `log_b(x)` - Arbitrary base logarithm

**Exponential & Power Functions:**
- `x^y` - Raise to power
- `sqrt(x)` - Square root
- `cbrt(x)` - Cube root
- `e^x` - Exponential
- `10^x` - Power of 10

**Other Functions:**
- `x!` - Factorial
- `|x|` - Absolute value
- `%` - Modulo/Percentage

**Constants:**
- `π` (Pi) = 3.14159...
- `e` (Euler's number) = 2.71828...

**Settings:**
- **Angle Mode**: Degrees or Radians toggle
- **Decimal Precision**: Customizable rounding

**Examples:**
```
sin(90°) = 1
sqrt(16) = 4
5! = 120
2^10 = 1024
log(100) = 2
```

---

### 3. **Programmer Mode**
Specialized tools for developers and computer scientists.

**Base Conversions:**
- 🔢 **Decimal (DEC)**: Base 10 (standard)
- 🟦 **Binary (BIN)**: Base 2 (0, 1)
- 🟩 **Octal (OCT)**: Base 8 (0-7)
- 🟪 **Hexadecimal (HEX)**: Base 16 (0-F)

**Real-time Conversion:**
```
255 DEC = FF HEX = 377 OCT = 11111111 BIN
```

**Bitwise Operations:**
- `&` - AND
- `|` - OR
- `^` - XOR
- `~` - NOT
- `<<` - Left Shift
- `>>` - Right Shift

**Use Cases:**
- Binary/Hex conversions
- Bitwise manipulation
- Computer science assignments
- System programming

**Example:**
```
255 AND 240 = 240
8 << 2 = 32 (left shift by 2)
```

---

## 🌍 Unit Converter

Convert between various units of measurement instantly.

### **Length**
- Meters (m), Kilometers (km), Centimeters (cm), Millimeters (mm)
- Miles (mi), Yards (yd), Feet (ft), Inches (in)

### **Mass/Weight**
- Kilograms (kg), Grams (g), Milligrams (mg)
- Ounces (oz), Pounds (lb), Tons

### **Volume**
- Liters (L), Milliliters (ml), Gallons, Quarts, Pints, Fluid Ounces

### **Temperature**
- Celsius (°C), Fahrenheit (°F), Kelvin (K)
- Real-time conversion with formula display

### **Time**
- Seconds, Minutes, Hours, Days, Weeks, Months, Years

### **Area**
- Square meters, Square kilometers, Square centimeters, Square inches, Square feet, Square miles

### **Speed**
- Meters/second, Kilometers/hour, Miles/hour, Knots

### **Digital Storage**
- Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Petabytes

### **Fuel Consumption**
- Kilometers/Liter, Miles/Gallon, Liters/100km

### **Data Transfer Rate**
- Bits/second, Kilobits/second, Megabits/second, Gigabits/second

**Example:**
```
5 kilometers = 3.10686 miles
100 pounds = 45.3592 kilograms
32°C = 89.6°F
```

---

## 💱 Currency Converter

Convert between major global currencies with real-time rates.

### **Supported Currencies:**
- 🇺🇸 USD (US Dollar)
- 🇪🇺 EUR (Euro)
- 🇬🇧 GBP (British Pound)
- 🇯🇵 JPY (Japanese Yen)
- 🇦🇺 AUD (Australian Dollar)
- 🇨🇦 CAD (Canadian Dollar)
- 🇨🇭 CHF (Swiss Franc)
- 🇮🇳 INR (Indian Rupee)
- And 50+ more...

**Features:**
- Live exchange rates
- Historical rate tracking (optional)
- Bid/Ask spread information
- 10+ language support

**Example:**
```
100 USD = 92 EUR = 79 GBP = 14,950 JPY
```

---

## 📅 Date & Time Calculator

Perform calculations with dates and time intervals.

### **Features:**

**Calculate Date Differences**
- Days between dates
- Weeks between dates
- Months between dates
- Years between dates
- Business days (excluding weekends)

**Add/Subtract from Dates**
- Add days/weeks/months/years
- Subtract time intervals
- Find date N days from today

**Time Calculations**
- Add/subtract time duration
- Calculate elapsed time
- Business hours calculation

**Example:**
```
From: Jan 1, 2024
To: Dec 31, 2024
Result: 364 days, 52 weeks, 12 months

Jan 1, 2024 + 30 days = Jan 31, 2024
```

---

## 💰 Financial Calculator

Specialized tools for loans, mortgages, investments, and savings.

### **Loan & Mortgage Calculator**
**Inputs:**
- Principal (Loan Amount)
- Annual Interest Rate (%)
- Loan Term (Years or Months)
- Payment Frequency (Monthly, Quarterly, etc.)

**Outputs:**
- Monthly Payment Amount
- Total Interest Paid
- Total Amount Paid
- Amortization Schedule

**Formula:**
```
M = P * [r(1+r)^n] / [(1+r)^n - 1]
Where:
M = Monthly Payment
P = Principal Loan Amount
r = Monthly Interest Rate
n = Total Number of Payments
```

### **Investment Calculator**
**Compound Interest:**
```
A = P(1 + r/n)^(nt)
Where:
A = Final Amount
P = Principal
r = Annual Rate
n = Compounding Frequency
t = Time in years
```

### **Savings Calculator**
- Track savings growth
- Multiple savings goals
- Interest accrual

**Example:**
```
Loan: $300,000
Rate: 4.5% annually
Term: 30 years
Monthly Payment: $1,520.06
Total Interest: $247,515.23
```

---

## 📊 Percentage Calculator

Quick percentage calculations for various scenarios.

### **Operations:**

**What is X% of Y?**
```
Example: What is 15% of 200?
Result: 30
Formula: (X/100) × Y
```

**What Percentage is X of Y?**
```
Example: What % is 30 of 200?
Result: 15%
Formula: (X/Y) × 100
```

**X% Increase/Decrease**
```
Increase: 200 + (15% of 200) = 230
Decrease: 200 - (15% of 200) = 170
```

**Tip Calculator**
```
Bill: $50
Tip %: 15%
Tip Amount: $7.50
Total: $57.50
Per Person (4 people): $14.38
```

---

## 🎯 Advanced Features

### **Memory Functions**
- **MC** (Memory Clear): Erase memory
- **MR** (Memory Recall): Retrieve stored value
- **M+** (Memory Add): Add to memory
- **M-** (Memory Subtract): Subtract from memory
- **MS** (Memory Store): Save value

**Example:**
```
Memory: 0
Input 100 → M+ → Memory: 100
Input 50 → M- → Memory: 50
Press MR → Display: 50
Press MC → Memory: 0
```

### **Calculation History**
- **Persistent**: Saved across sessions
- **Browsable**: Click to reuse past calculations
- **Searchable**: Find specific calculations
- **Exportable**: Copy history to clipboard
- **Limit**: Last 100 calculations stored

### **Copy/Paste**
- **Copy Result**: Ctrl+C
- **Paste Expression**: Ctrl+V
- **One-Click Copy**: Result copy buttons

### **Keyboard Shortcuts**
```
Numbers:        0-9
Operations:     +, -, *, /
Decimal:        .
Equals:         Enter or =
Clear:          Escape or AC
Backspace:      Backspace or ←
Copy:           Ctrl+C
Paste:          Ctrl+V
Memory Add:     Ctrl+M (+ for M+, - for M-)
```

### **Accessibility**
- ♿ WCAG 2.1 Level AA Compliant
- ⌨️ Full keyboard navigation
- 🔊 Screen reader compatible
- 🎨 High contrast mode support
- 📱 Touch-friendly interface

---

## 🎨 Customization Options

### **Theme Settings**
- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Reduced eye strain
- **Custom Colors**: Personalize color scheme
- **Font Sizes**: Adjustable for accessibility

### **Calculation Settings**
- **Decimal Places**: 2-10 places
- **Rounding Method**: Round, Floor, Ceiling
- **Angle Mode**: Degrees or Radians
- **Number Format**: Standard, Scientific, Engineering

### **Display Options**
- **History Visibility**: Toggle on/off
- **Memory Display**: Show/hide memory value
- **Expression View**: Full or simplified
- **Result Format**: Compact or expanded

---

## 🚀 Performance Features

- **Fast Calculations**: <1ms for most operations
- **Large Number Support**: Up to 2^53 in JavaScript
- **Floating-Point Precision**: 15-17 significant digits
- **Optimized Rendering**: Smooth 60fps animations
- **Minimal Memory Usage**: ~2MB footprint

---

## 🔒 Data Security

- **Local Storage Only**: No cloud storage
- **No Tracking**: No analytics or telemetry
- **No Ads**: Clean, ad-free experience
- **Open Source**: Code transparency
- **Privacy by Design**: Built-in privacy first

---

## 📈 Use Cases

### **For Students:**
- Homework help (science, math, engineering)
- Unit conversions for projects
- Financial literacy calculations
- Scientific notation practice

### **For Professionals:**
- Financial planning and analysis
- Engineering calculations
- Programming conversions
- Quick business math

### **For Business:**
- Invoice calculations
- Currency conversions
- Loan and mortgage analysis
- Payroll and tax calculations

### **For Everyday Users:**
- Shopping and budgeting
- Tip calculations
- Recipe scaling
- Time tracking

---

## 🎓 Educational Value

Perfect for learning:
- Mathematical concepts
- Programming fundamentals
- Financial literacy
- Scientific notation
- Unit conversion principles

---

## 📝 Version History

**v1.0.0** (May 2026)
- ✅ All core modes implemented
- ✅ Full keyboard support
- ✅ Dark/Light theme
- ✅ Calculation history
- ✅ Responsive design
- ✅ Mobile optimization

---

## 🤝 Feedback

We welcome feedback! Please submit:
- Feature requests
- Bug reports
- UI/UX suggestions
- Accessibility improvements

---

**Last Updated**: May 2026  
**Maintained By**: Rehan (@codexrehan-ux)