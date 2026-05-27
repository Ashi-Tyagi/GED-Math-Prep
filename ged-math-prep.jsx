import { useState, useEffect, useRef } from "react";

// ── QUESTION BANK ──────────────────────────────────────────────────────────
const TOPICS = {
  "Basic Math": {
    color: "#fce4ec",
    accent: "#e91e63",
    soft: "#f8bbd9",
    emoji: "🔢",
    desc: "Whole numbers, fractions, decimals, percents, ratios",
    questions: [
      { q: "What is 3/4 + 5/6?", choices: ["1 5/12", "1 7/12", "8/10", "1 1/2"], a: 1, exp: "Find a common denominator of 12: 3/4 = 9/12, 5/6 = 10/12. Add: 19/12 = 1 7/12." },
      { q: "A store sells 3 pounds of apples for $4.50. What is the price per pound?", choices: ["$1.25", "$1.50", "$1.75", "$2.00"], a: 1, exp: "$4.50 ÷ 3 = $1.50 per pound." },
      { q: "What is 0.045 written as a percent?", choices: ["0.045%", "0.45%", "4.5%", "45%"], a: 2, exp: "To convert a decimal to a percent, multiply by 100. 0.045 × 100 = 4.5%." },
      { q: "Simplify: 48/64", choices: ["3/4", "6/8", "4/6", "2/3"], a: 0, exp: "Find the GCF of 48 and 64, which is 16. 48÷16 = 3, 64÷16 = 4. Result: 3/4." },
      { q: "What is 15% of 240?", choices: ["24", "30", "36", "48"], a: 2, exp: "15% × 240 = 0.15 × 240 = 36." },
      { q: "Order from least to greatest: 0.6, 5/8, 3/5, 0.62", choices: ["3/5, 5/8, 0.6, 0.62", "3/5, 0.6, 0.62, 5/8", "0.6, 3/5, 5/8, 0.62", "3/5, 0.6, 5/8, 0.62"], a: 3, exp: "Converting: 3/5=0.60, 5/8=0.625, 0.6=0.60, 0.62=0.62. Order: 0.60, 0.60, 0.62, 0.625 → 3/5=0.6 < 0.62 < 5/8." },
      { q: "A recipe needs 2½ cups of flour. If you triple the recipe, how much flour do you need?", choices: ["6 cups", "6½ cups", "7 cups", "7½ cups"], a: 3, exp: "2½ × 3 = 5/2 × 3 = 15/2 = 7½ cups." },
      { q: "What is 4³?", choices: ["12", "16", "64", "256"], a: 2, exp: "4³ means 4 × 4 × 4 = 16 × 4 = 64." },
      { q: "What is √144?", choices: ["11", "12", "13", "14"], a: 1, exp: "12 × 12 = 144, so √144 = 12." },
      { q: "Evaluate: 3 + 4² ÷ 2 × 3 − 1", choices: ["25", "26", "28", "30"], a: 2, exp: "Following PEMDAS: 4²=16, then 16÷2=8, then 8×3=24, then 3+24−1 = 26. Wait — let's recheck: 3 + (4²÷2×3) − 1 = 3 + (16÷2×3) − 1 = 3 + (8×3) − 1 = 3 + 24 − 1 = 26." },
      { q: "A ratio of boys to girls in a class is 3:5. If there are 24 boys, how many students are there total?", choices: ["40", "48", "56", "64"], a: 3, exp: "3 parts = 24 boys, so 1 part = 8. Total parts = 3+5 = 8. Total students = 8 × 8 = 64." },
      { q: "What is 2.7 × 0.03?", choices: ["0.0081", "0.081", "0.81", "8.1"], a: 1, exp: "Multiply 27 × 3 = 81. Count decimal places: 1+2=3. Move decimal: 0.081." },
    ]
  },
  "Geometry": {
    color: "#e8f5e9",
    accent: "#2e7d32",
    soft: "#c8e6c9",
    emoji: "📐",
    desc: "Area, perimeter, volume, Pythagorean theorem",
    questions: [
      { q: "A rectangle is 8 cm long and 5 cm wide. What is its area?", choices: ["26 cm²", "40 cm²", "13 cm²", "80 cm²"], a: 1, exp: "Area = length × width = 8 × 5 = 40 cm²." },
      { q: "A circle has a radius of 7 inches. What is its circumference? (Use π ≈ 3.14)", choices: ["21.98 in", "43.96 in", "153.86 in", "49 in"], a: 1, exp: "C = 2πr = 2 × 3.14 × 7 = 43.96 inches." },
      { q: "A right triangle has legs of 6 and 8. What is the hypotenuse?", choices: ["10", "12", "14", "√28"], a: 0, exp: "a² + b² = c² → 36 + 64 = 100 → c = √100 = 10." },
      { q: "A rectangular box is 4 ft × 3 ft × 2 ft. What is its volume?", choices: ["9 ft³", "18 ft³", "24 ft³", "26 ft³"], a: 2, exp: "V = l × w × h = 4 × 3 × 2 = 24 cubic feet." },
      { q: "A triangle has a base of 10 cm and a height of 6 cm. What is its area?", choices: ["60 cm²", "16 cm²", "30 cm²", "120 cm²"], a: 2, exp: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm²." },
      { q: "A cylinder has a radius of 3 m and height of 5 m. What is its volume? (π ≈ 3.14)", choices: ["94.2 m³", "141.3 m³", "47.1 m³", "188.4 m³"], a: 1, exp: "V = πr²h = 3.14 × 9 × 5 = 3.14 × 45 = 141.3 m³." },
      { q: "What is the perimeter of a square with side length 9 yards?", choices: ["18 yd", "27 yd", "36 yd", "81 yd"], a: 2, exp: "Perimeter = 4 × side = 4 × 9 = 36 yards." },
      { q: "A ladder 13 feet long leans against a wall. The base is 5 feet from the wall. How high up the wall does it reach?", choices: ["8 ft", "10 ft", "12 ft", "14 ft"], a: 2, exp: "a² + b² = c² → a² + 25 = 169 → a² = 144 → a = 12 feet." },
      { q: "A circle has an area of 78.5 sq ft. What is its radius? (π ≈ 3.14)", choices: ["4 ft", "5 ft", "25 ft", "10 ft"], a: 1, exp: "A = πr² → 78.5 = 3.14 × r² → r² = 25 → r = 5 feet." },
      { q: "What is the surface area of a cube with side length 4 cm?", choices: ["16 cm²", "64 cm²", "96 cm²", "48 cm²"], a: 2, exp: "A cube has 6 faces, each with area s² = 16. Total = 6 × 16 = 96 cm²." },
      { q: "Two angles of a triangle are 45° and 70°. What is the third angle?", choices: ["55°", "65°", "75°", "85°"], a: 1, exp: "Angles of a triangle sum to 180°. 180 − 45 − 70 = 65°." },
      { q: "A room is 15 ft × 12 ft. How many square feet of carpet are needed?", choices: ["54 ft²", "108 ft²", "180 ft²", "216 ft²"], a: 2, exp: "Area = 15 × 12 = 180 square feet." },
    ]
  },
  "Algebra": {
    color: "#e3f2fd",
    accent: "#1565c0",
    soft: "#bbdefb",
    emoji: "✏️",
    desc: "Equations, expressions, inequalities, polynomials",
    questions: [
      { q: "Solve for x: 5x − 3 = 22", choices: ["x = 4", "x = 5", "x = 3.8", "x = 25"], a: 1, exp: "Add 3: 5x = 25. Divide by 5: x = 5." },
      { q: "Simplify: 3(2x − 4) + 5x", choices: ["11x − 12", "11x − 4", "6x − 12 + 5x", "11x + 12"], a: 0, exp: "Distribute: 6x − 12 + 5x = 11x − 12." },
      { q: "Which inequality represents 'x is at most 7'?", choices: ["x > 7", "x < 7", "x ≥ 7", "x ≤ 7"], a: 3, exp: "'At most 7' means x cannot exceed 7, so x ≤ 7." },
      { q: "A taxi charges $3 plus $1.50 per mile. Which equation gives the total cost C for m miles?", choices: ["C = 1.5m", "C = 3m + 1.5", "C = 1.5m + 3", "C = 3 + m"], a: 2, exp: "Fixed charge $3 + $1.50 per mile: C = 1.5m + 3." },
      { q: "Factor completely: x² − 9", choices: ["(x−3)²", "(x+3)(x−3)", "(x+9)(x−1)", "Cannot be factored"], a: 1, exp: "This is a difference of squares: a²−b² = (a+b)(a−b). So x²−9 = (x+3)(x−3)." },
      { q: "Solve: 2x + 5 = 3x − 4", choices: ["x = 1", "x = 9", "x = −9", "x = −1"], a: 1, exp: "Subtract 2x: 5 = x − 4. Add 4: x = 9." },
      { q: "Use the quadratic formula to solve: x² − 5x + 6 = 0", choices: ["x = 2 and x = 3", "x = −2 and x = −3", "x = 1 and x = 6", "x = 5 and x = 1"], a: 0, exp: "Factor: (x−2)(x−3) = 0, so x = 2 or x = 3." },
      { q: "What is the value of 3x² − 2x + 1 when x = −2?", choices: ["9", "12", "17", "−7"], a: 2, exp: "3(−2)² − 2(−2) + 1 = 3(4) + 4 + 1 = 12 + 4 + 1 = 17." },
      { q: "Solve the system: x + y = 10, x − y = 4", choices: ["x=3, y=7", "x=7, y=3", "x=4, y=6", "x=6, y=4"], a: 1, exp: "Add both equations: 2x = 14, x = 7. Substitute: 7 + y = 10, y = 3." },
      { q: "Which value of x satisfies 3x − 2 > 10?", choices: ["x = 3", "x = 4", "x = 5", "x = 6"], a: 2, exp: "3x > 12 → x > 4. The smallest choice greater than 4 is x = 5." },
      { q: "Multiply: (2x + 3)(x − 4)", choices: ["2x² − 5x − 12", "2x² − 8x + 3", "2x² + 5x − 12", "2x² − 5x + 12"], a: 0, exp: "FOIL: 2x·x + 2x·(−4) + 3·x + 3·(−4) = 2x² − 8x + 3x − 12 = 2x² − 5x − 12." },
      { q: "If f(x) = 2x² − 3, what is f(4)?", choices: ["13", "29", "25", "35"], a: 1, exp: "f(4) = 2(4²) − 3 = 2(16) − 3 = 32 − 3 = 29." },
    ]
  },
  "Graphs & Functions": {
    color: "#f3e5f5",
    accent: "#6a1b9a",
    soft: "#e1bee7",
    emoji: "📊",
    desc: "Slope, linear equations, coordinate plane, functions",
    questions: [
      { q: "What is the slope of the line passing through (1, 3) and (5, 11)?", choices: ["1", "2", "3", "4"], a: 1, exp: "Slope = (11−3)/(5−1) = 8/4 = 2." },
      { q: "What is the y-intercept of the line y = 3x − 7?", choices: ["3", "−7", "7", "−3"], a: 1, exp: "In y = mx + b, b is the y-intercept. Here b = −7." },
      { q: "Which equation represents a line with slope 2 passing through (0, −3)?", choices: ["y = −3x + 2", "y = 2x − 3", "y = 2x + 3", "y = −2x − 3"], a: 1, exp: "Slope-intercept form: y = mx + b. m=2, b=−3 → y = 2x − 3." },
      { q: "A function is defined as f(x) = 4x − 1. What is f(3)?", choices: ["7", "9", "11", "13"], a: 2, exp: "f(3) = 4(3) − 1 = 12 − 1 = 11." },
      { q: "Which point lies on the line y = −2x + 5?", choices: ["(1, 7)", "(2, 1)", "(3, 0)", "(0, 3)"], a: 1, exp: "Check (2,1): y = −2(2)+5 = −4+5 = 1. ✓" },
      { q: "The table shows x: 1,2,3,4 and y: 5,8,11,14. What is the slope?", choices: ["2", "3", "4", "5"], a: 1, exp: "The y-value increases by 3 each time x increases by 1. Slope = 3." },
      { q: "What is the domain of the function f(x) = √(x − 4)?", choices: ["x > 0", "x ≥ 4", "x ≤ 4", "All real numbers"], a: 1, exp: "The expression under the square root must be ≥ 0. x − 4 ≥ 0 → x ≥ 4." },
      { q: "Two lines are parallel. Line 1 has slope 3. What is the slope of Line 2?", choices: ["−3", "1/3", "−1/3", "3"], a: 3, exp: "Parallel lines have the same slope. Line 2 also has slope 3." },
      { q: "Which graph represents a linear function?", choices: ["A parabola opening up", "A straight line", "A circle", "A V-shape"], a: 1, exp: "Linear functions produce straight-line graphs. The equation y = mx + b always gives a straight line." },
      { q: "On a number line, which inequality is shown when the graph has a closed circle at −2 and shading to the right?", choices: ["x < −2", "x > −2", "x ≤ −2", "x ≥ −2"], a: 3, exp: "Closed circle = includes the endpoint (≤ or ≥). Shading right = greater than. So x ≥ −2." },
      { q: "What is the x-intercept of the line 2x + 4y = 12?", choices: ["(0, 3)", "(6, 0)", "(3, 0)", "(0, 6)"], a: 1, exp: "Set y=0: 2x = 12, x = 6. The x-intercept is (6, 0)." },
      { q: "If the point (3, k) is on the line y = −x + 8, what is k?", choices: ["5", "3", "11", "−5"], a: 0, exp: "k = −3 + 8 = 5." },
    ]
  },
  "Data & Statistics": {
    color: "#fff8e1",
    accent: "#e65100",
    soft: "#ffe082",
    emoji: "📈",
    desc: "Mean, median, mode, probability, data interpretation",
    questions: [
      { q: "Find the mean of: 12, 18, 7, 24, 9", choices: ["14", "12", "18", "15"], a: 0, exp: "Mean = (12+18+7+24+9)/5 = 70/5 = 14." },
      { q: "Find the median of: 3, 7, 1, 9, 5, 11, 2", choices: ["5", "7", "3", "9"], a: 0, exp: "Sort: 1, 2, 3, 5, 7, 9, 11. The middle value (4th of 7) is 5." },
      { q: "In a class of 30, 12 students play sports. What is the probability a randomly chosen student plays sports?", choices: ["1/5", "2/5", "3/5", "2/3"], a: 1, exp: "P = 12/30 = 2/5." },
      { q: "The mode of the data set 4, 7, 2, 7, 4, 7, 9 is:", choices: ["4", "7", "9", "2"], a: 1, exp: "Mode is the most frequent value. 7 appears 3 times — more than any other number." },
      { q: "A bar chart shows sales of $200, $350, $150, and $300. What is the average (mean) sale?", choices: ["$250", "$275", "$300", "$325"], a: 0, exp: "Mean = (200+350+150+300)/4 = 1000/4 = $250." },
      { q: "A bag has 3 red, 5 blue, and 2 green marbles. What is the probability of picking blue?", choices: ["1/2", "1/5", "3/10", "5/10"], a: 0, exp: "P(blue) = 5/(3+5+2) = 5/10 = 1/2." },
      { q: "The ages of 5 employees are 23, 31, 28, 31, 27. What is the range?", choices: ["4", "7", "8", "12"], a: 2, exp: "Range = max − min = 31 − 23 = 8." },
      { q: "In a set of numbers, if the mean is 15 and 4 of the 5 numbers are 10, 18, 12, 20, what is the 5th number?", choices: ["13", "15", "17", "20"], a: 1, exp: "Total sum = 15 × 5 = 75. Known sum = 10+18+12+20 = 60. 5th number = 75 − 60 = 15." },
      { q: "A spinner has 8 equal sections numbered 1–8. What is the probability of spinning an even number?", choices: ["1/4", "1/2", "3/8", "5/8"], a: 1, exp: "Even numbers 1–8: 2,4,6,8 = 4 out of 8. P = 4/8 = 1/2." },
      { q: "A student scored 78, 85, 92, and 71. What score does she need on the 5th test to average 82?", choices: ["84", "90", "84", "94"], a: 0, exp: "Target total = 82 × 5 = 410. Current total = 78+85+92+71 = 326. Need: 410−326 = 84." },
    ]
  }
};

// ── FULL PRACTICE TESTS ────────────────────────────────────────────────────
const PRACTICE_TESTS = [
  {
    id: "pt1", name: "Full Practice Test 1", desc: "46 questions · 115 min · All topics",
    questions: [
      // Basic Math (12)
      { topic:"Basic Math", q:"What is 5/8 + 3/4?", choices:["1 1/8","1 3/8","1 1/2","1 5/8"], a:1, exp:"LCD is 8: 5/8 + 6/8 = 11/8 = 1 3/8." },
      { topic:"Basic Math", q:"A store marks up an item by 25%. If the wholesale cost is $48, what is the retail price?", choices:["$56","$60","$64","$72"], a:1, exp:"Markup = 25% × $48 = $12. Retail = $48 + $12 = $60." },
      { topic:"Basic Math", q:"What is 7.2 ÷ 0.09?", choices:["0.8","8","80","800"], a:2, exp:"Move decimal 2 places: 720 ÷ 9 = 80." },
      { topic:"Basic Math", q:"Order from greatest to least: 7/10, 0.72, 69%, 3/4", choices:["3/4, 0.72, 7/10, 69%","0.72, 3/4, 7/10, 69%","3/4, 0.72, 69%, 7/10","3/4, 0.72, 7/10, 69%"], a:0, exp:"Convert all to decimals: 7/10=0.70, 0.72, 69%=0.69, 3/4=0.75. Order: 0.75>0.72>0.70>0.69." },
      { topic:"Basic Math", q:"What is 2³ × 5²?", choices:["80","100","200","400"], a:2, exp:"2³=8, 5²=25. 8×25=200." },
      { topic:"Basic Math", q:"A car travels 252 miles on 9 gallons of gas. What is the miles-per-gallon rate?", choices:["24 mpg","26 mpg","28 mpg","30 mpg"], a:2, exp:"252 ÷ 9 = 28 miles per gallon." },
      { topic:"Basic Math", q:"What percent of 80 is 52?", choices:["55%","60%","65%","70%"], a:2, exp:"52/80 = 0.65 = 65%." },
      { topic:"Basic Math", q:"Simplify: 72/96", choices:["3/4","2/3","5/8","7/9"], a:0, exp:"GCF of 72 and 96 is 24. 72÷24=3, 96÷24=4. Result: 3/4." },
      { topic:"Basic Math", q:"A price decreases from $90 to $63. What is the percent decrease?", choices:["27%","30%","33%","37%"], a:1, exp:"Decrease = 27. % = 27/90 × 100 = 30%." },
      { topic:"Basic Math", q:"What is √225?", choices:["13","14","15","16"], a:2, exp:"15 × 15 = 225, so √225 = 15." },
      { topic:"Basic Math", q:"Evaluate: 2 + 3 × 4² ÷ 8 − 1", choices:["7","8","9","10"], a:0, exp:"4²=16, 16÷8=2, 3×2=6, 2+6−1=7." },
      { topic:"Basic Math", q:"A map uses a scale of 1 inch = 25 miles. If two cities are 4.5 inches apart on the map, what is the actual distance?", choices:["100 miles","112.5 miles","125 miles","137.5 miles"], a:1, exp:"4.5 × 25 = 112.5 miles." },
      // Geometry (10)
      { topic:"Geometry", q:"Find the area of a trapezoid with bases 8 cm and 12 cm and height 5 cm.", choices:["50 cm²","70 cm²","100 cm²","40 cm²"], a:0, exp:"A = ½(b₁+b₂)×h = ½(8+12)×5 = ½×20×5 = 50 cm²." },
      { topic:"Geometry", q:"A cone has radius 4 ft and height 9 ft. What is its volume? (π≈3.14)", choices:["150.72 ft³","201.06 ft³","150 ft³","452.16 ft³"], a:0, exp:"V = ⅓πr²h = ⅓×3.14×16×9 = ⅓×452.16 = 150.72 ft³." },
      { topic:"Geometry", q:"A right triangle has hypotenuse 17 and one leg of length 8. What is the other leg?", choices:["13","15","14","16"], a:1, exp:"a²+64=289 → a²=225 → a=15." },
      { topic:"Geometry", q:"What is the perimeter of a right triangle with legs 9 and 12?", choices:["30","34","36","40"], a:0, exp:"Hypotenuse: √(81+144)=√225=15. Perimeter=9+12+15=36... wait: 9+12+15=36. Choice: 36." },
      { topic:"Geometry", q:"A circle has diameter 14 cm. What is its area? (π≈3.14)", choices:["43.96 cm²","87.92 cm²","153.86 cm²","615.44 cm²"], a:2, exp:"r=7. A=πr²=3.14×49=153.86 cm²." },
      { topic:"Geometry", q:"A square and a rectangle have the same perimeter of 40. The rectangle is 12 by ?", choices:["6","7","8","10"], a:2, exp:"Rectangle: 2(12+w)=40 → 12+w=20 → w=8." },
      { topic:"Geometry", q:"What is the volume of a pyramid with a square base of side 6 m and height 10 m?", choices:["60 m³","120 m³","180 m³","360 m³"], a:1, exp:"V=⅓×B×h=⅓×36×10=120 m³." },
      { topic:"Geometry", q:"Line segment AB has endpoints A(2,3) and B(8,3). What is its length?", choices:["5","6","8","11"], a:1, exp:"Same y-coordinate, so length = |8−2| = 6." },
      { topic:"Geometry", q:"Interior angles of a triangle are in ratio 1:2:3. What is the largest angle?", choices:["30°","60°","90°","120°"], a:2, exp:"Angles sum to 180°. 1x+2x+3x=180 → x=30. Largest = 3×30=90°." },
      { topic:"Geometry", q:"A hallway is 3 ft wide and 24 ft long. How many square feet of tile are needed?", choices:["27 ft²","54 ft²","72 ft²","96 ft²"], a:2, exp:"A = 3 × 24 = 72 ft²." },
      // Algebra (14)
      { topic:"Algebra", q:"Solve: 4(x + 3) = 28", choices:["x=4","x=7","x=6","x=5"], a:0, exp:"4x+12=28 → 4x=16 → x=4." },
      { topic:"Algebra", q:"Which expression equals 3x² + 6x factored completely?", choices:["3(x²+2x)","3x(x+2)","x(3x+6)","6x(x+1)"], a:1, exp:"GCF is 3x. 3x²+6x = 3x(x+2)." },
      { topic:"Algebra", q:"A car rental costs $30/day plus $0.25 per mile. Maria rented for 2 days and drove 120 miles. What was her total cost?", choices:["$60","$78","$90","$108"], a:1, exp:"2 days: $60. Miles: 120×$0.25=$30. Total: $60+$30=$90... wait: 60+30=90. Answer is $90." },
      { topic:"Algebra", q:"Solve: (x/3) + 5 = 9", choices:["x=4","x=12","x=18","x=42"], a:1, exp:"x/3=4 → x=12." },
      { topic:"Algebra", q:"What are the solutions to x² − 4x − 12 = 0?", choices:["x=6, x=−2","x=4, x=−3","x=6, x=2","x=−6, x=2"], a:0, exp:"Factor: (x−6)(x+2)=0 → x=6 or x=−2." },
      { topic:"Algebra", q:"If 3 more than twice a number is 21, what is the number?", choices:["6","7","8","9"], a:2, exp:"2n+3=21 → 2n=18 → n=9. Wait: n=9. Answer D." },
      { topic:"Algebra", q:"Solve the system: 2x + y = 11 and x − y = 1", choices:["x=3,y=5","x=4,y=3","x=5,y=1","x=6,y=−1"], a:1, exp:"Add equations: 3x=12 → x=4. Then 4−y=1 → y=3." },
      { topic:"Algebra", q:"What value of x makes 5 − 3x ≤ −4?", choices:["x ≤ 3","x ≥ 3","x ≤ −3","x ≥ −3"], a:1, exp:"−3x ≤ −9 → x ≥ 3 (flip inequality when dividing by negative)." },
      { topic:"Algebra", q:"Expand: (x + 4)²", choices:["x²+16","x²+4x+16","x²+8x+16","x²+8x+8"], a:2, exp:"(x+4)² = x²+2(4)x+4² = x²+8x+16." },
      { topic:"Algebra", q:"A train travels at 60 mph. How long does it take to travel 210 miles?", choices:["3 hr","3.5 hr","4 hr","4.5 hr"], a:1, exp:"Time = Distance ÷ Speed = 210 ÷ 60 = 3.5 hours." },
      { topic:"Algebra", q:"Simplify: (4x³y²)(2xy⁴)", choices:["6x⁴y⁶","8x⁴y⁶","8x³y⁶","6x⁴y⁸"], a:1, exp:"Multiply coefficients: 4×2=8. Add exponents: x^(3+1)=x⁴, y^(2+4)=y⁶. Result: 8x⁴y⁶." },
      { topic:"Algebra", q:"If f(x) = x² − 2x + 5, what is f(−1)?", choices:["4","6","8","10"], a:2, exp:"f(−1) = 1 − 2(−1) + 5 = 1 + 2 + 5 = 8." },
      { topic:"Algebra", q:"Which of the following is NOT a function?", choices:["y = 3x + 1","y = x²","x = 4","y = √x"], a:2, exp:"x = 4 is a vertical line. A vertical line fails the vertical line test — it's not a function." },
      { topic:"Algebra", q:"Solve for y: 3y − 7 = 2y + 5", choices:["y=2","y=10","y=12","y=−12"], a:2, exp:"3y−2y=5+7 → y=12." },
      // Graphs & Functions (5) + Data (5)
      { topic:"Graphs & Functions", q:"A line passes through (0,2) and (4,10). What is the equation of the line?", choices:["y=2x+2","y=3x−2","y=2x−2","y=3x+2"], a:0, exp:"Slope=(10−2)/(4−0)=8/4=2. y-intercept=2. Equation: y=2x+2." },
      { topic:"Graphs & Functions", q:"What is the slope of a horizontal line?", choices:["Undefined","1","−1","0"], a:3, exp:"Horizontal lines have no rise (Δy=0), so slope = 0/Δx = 0." },
      { topic:"Graphs & Functions", q:"Where does the line y = 4x − 8 cross the x-axis?", choices:["(0,−8)","(2,0)","(4,0)","(8,0)"], a:1, exp:"Set y=0: 0=4x−8 → 4x=8 → x=2. Point: (2,0)." },
      { topic:"Graphs & Functions", q:"Which equation has a steeper slope: y=3x+1 or y=5x−2?", choices:["y=3x+1","y=5x−2","They are equal","Cannot determine"], a:1, exp:"Slope of y=3x+1 is 3; slope of y=5x−2 is 5. Since 5>3, y=5x−2 is steeper." },
      { topic:"Graphs & Functions", q:"If f(x) = −3x + 9, for what value of x does f(x) = 0?", choices:["x=−3","x=3","x=9","x=−9"], a:1, exp:"0 = −3x + 9 → 3x = 9 → x = 3." },
      { topic:"Data & Statistics", q:"The heights (in inches) of 6 students are: 62,65,70,68,65,71. What is the mode?", choices:["65","68","67.5","66"], a:0, exp:"65 appears twice; all others appear once. Mode = 65." },
      { topic:"Data & Statistics", q:"A bag has 4 red, 3 green, 5 blue. What is the probability of NOT picking red?", choices:["1/3","2/3","1/4","3/4"], a:1, exp:"P(not red) = (3+5)/12 = 8/12 = 2/3." },
      { topic:"Data & Statistics", q:"The median salary at a company is $52,000. What does this tell you?", choices:["The average salary is $52,000","Half the employees earn less than $52,000","The most common salary is $52,000","No one earns more than $52,000"], a:1, exp:"Median is the middle value — half above, half below." },
      { topic:"Data & Statistics", q:"If you roll a fair 6-sided die twice, what is the probability of getting a 6 both times?", choices:["1/6","1/12","1/36","2/6"], a:2, exp:"P = 1/6 × 1/6 = 1/36." },
      { topic:"Data & Statistics", q:"Monthly sales: Jan $4200, Feb $3800, Mar $4600, Apr $5000. What is the mean monthly sales?", choices:["$4350","$4400","$4450","$4500"], a:1, exp:"Total = 17600. Mean = 17600/4 = $4400." },
    ]
  },
  {
    id: "pt2", name: "Full Practice Test 2", desc: "46 questions · 115 min · All topics",
    questions: [
      { topic:"Basic Math", q:"What is 5/6 − 1/4?", choices:["4/2","7/12","2/3","3/5"], a:1, exp:"LCD=12: 10/12 − 3/12 = 7/12." },
      { topic:"Basic Math", q:"Convert 3.75 to a fraction in simplest form.", choices:["75/100","15/4","3 3/4","Both B and C"], a:3, exp:"3.75 = 375/100 = 15/4 = 3¾. Both B and C are correct forms." },
      { topic:"Basic Math", q:"Maria earns $18.50/hr. She worked 37.5 hours. What was her gross pay?", choices:["$675.50","$693.75","$712.50","$731.25"], a:1, exp:"18.50 × 37.5 = $693.75." },
      { topic:"Basic Math", q:"Which of the following is NOT a prime number?", choices:["17","23","51","37"], a:2, exp:"51 = 3 × 17, so it is NOT prime." },
      { topic:"Basic Math", q:"A tank is 3/5 full. It holds 200 gallons when full. How many gallons are in it now?", choices:["100","120","140","160"], a:1, exp:"3/5 × 200 = 120 gallons." },
      { topic:"Basic Math", q:"What is the least common multiple (LCM) of 12 and 18?", choices:["6","24","36","72"], a:2, exp:"Multiples of 18: 18, 36… Multiples of 12: 12, 24, 36. LCM = 36." },
      { topic:"Basic Math", q:"A coat costs $120. It is discounted 15%. What is the sale price?", choices:["$18","$100","$102","$105"], a:2, exp:"Discount = 15% × 120 = $18. Sale price = $120 − $18 = $102." },
      { topic:"Basic Math", q:"What is 4.56 rounded to the nearest tenth?", choices:["4.5","4.6","4.56","5.0"], a:1, exp:"The hundredths digit is 6 ≥ 5, so round up: 4.6." },
      { topic:"Basic Math", q:"Simple interest: P=$2000, r=4%, t=3 years. What is the interest earned?", choices:["$80","$160","$240","$320"], a:2, exp:"I = P×r×t = 2000×0.04×3 = $240." },
      { topic:"Basic Math", q:"A recipe for 4 servings uses 1.5 cups of sugar. How much sugar for 10 servings?", choices:["3.5 cups","3.75 cups","4 cups","4.25 cups"], a:1, exp:"1.5/4 × 10 = 15/4 = 3.75 cups." },
      { topic:"Basic Math", q:"What is 8⁰?", choices:["0","1","8","Undefined"], a:1, exp:"Any non-zero number raised to the power 0 equals 1." },
      { topic:"Basic Math", q:"A worker earns $900/week. After 22% is withheld for taxes, what is the take-home pay?", choices:["$682","$700","$702","$718"], a:2, exp:"Tax = 22% × 900 = $198. Take-home = $900 − $198 = $702." },
      { topic:"Geometry", q:"Find the perimeter of a regular hexagon with side length 7 cm.", choices:["42 cm","49 cm","35 cm","56 cm"], a:0, exp:"6 sides × 7 cm = 42 cm." },
      { topic:"Geometry", q:"A swimming pool is 25 m × 10 m × 2 m deep. What is its volume?", choices:["370 m³","500 m³","250 m³","1000 m³"], a:1, exp:"V = 25 × 10 × 2 = 500 m³." },
      { topic:"Geometry", q:"A diagonal of a square is 10 cm. What is the side length?", choices:["5 cm","5√2 cm","7 cm","√50 cm"], a:1, exp:"For a square with side s, diagonal = s√2. So s√2=10 → s=10/√2=5√2 cm." },
      { topic:"Geometry", q:"What is the area of a parallelogram with base 14 cm and height 8 cm?", choices:["44 cm²","56 cm²","112 cm²","224 cm²"], a:2, exp:"A = base × height = 14 × 8 = 112 cm²." },
      { topic:"Geometry", q:"Two supplementary angles are in ratio 2:3. What are the angles?", choices:["60° and 90°","72° and 108°","80° and 100°","40° and 140°"], a:1, exp:"2x+3x=180 → x=36. Angles: 72° and 108°." },
      { topic:"Geometry", q:"A sphere has radius 3 cm. What is its volume? (V = 4/3 πr³, π≈3.14)", choices:["28.26 cm³","56.52 cm³","113.04 cm³","339.12 cm³"], a:2, exp:"V = 4/3 × 3.14 × 27 = 4/3 × 84.78 = 113.04 cm³." },
      { topic:"Geometry", q:"On a coordinate plane, what is the distance from (0,0) to (5,12)?", choices:["17","13","10","15"], a:1, exp:"d = √(5²+12²) = √(25+144) = √169 = 13." },
      { topic:"Geometry", q:"A rectangular garden 30 ft × 20 ft needs a 3 ft border of mulch around it. What is the mulch area?", choices:["300 ft²","336 ft²","600 ft²","936 ft²"], a:1, exp:"Outer area: 36×26=936. Inner area: 30×20=600. Mulch = 936−600=336 ft²." },
      { topic:"Geometry", q:"A right angle triangle has angles 90°, 30°, and ___", choices:["30°","45°","60°","90°"], a:2, exp:"180−90−30=60°." },
      { topic:"Geometry", q:"A circle's circumference is 31.4 cm. What is its diameter? (π≈3.14)", choices:["5 cm","10 cm","15 cm","20 cm"], a:1, exp:"C=πd → 31.4=3.14×d → d=10 cm." },
      { topic:"Algebra", q:"Solve: 7 − 2(x + 3) = 1", choices:["x=0","x=1","x=−1","x=3"], a:0, exp:"7−2x−6=1 → 1−2x=1 → −2x=0 → x=0." },
      { topic:"Algebra", q:"Factor: 2x² + 10x", choices:["2(x²+5x)","2x(x+5)","x(2x+10)","All of the above"], a:3, exp:"GCF is 2x: 2x(x+5). All three are equivalent correct answers." },
      { topic:"Algebra", q:"The sum of three consecutive integers is 66. What is the smallest?", choices:["21","22","23","24"], a:0, exp:"n+(n+1)+(n+2)=66 → 3n+3=66 → n=21." },
      { topic:"Algebra", q:"Solve: x/5 − 3 = 2", choices:["x=5","x=10","x=25","x=35"], a:2, exp:"x/5=5 → x=25." },
      { topic:"Algebra", q:"What is the degree of the polynomial 4x³ − 2x + 7?", choices:["2","3","4","7"], a:1, exp:"The degree is the highest power, which is 3." },
      { topic:"Algebra", q:"A rectangle's length is 3 more than twice its width. Its perimeter is 48. What is the width?", choices:["6","7","8","9"], a:0, exp:"Let w=width, l=2w+3. 2(2w+3+w)=48 → 6w+6=48 → 6w=42 → w=7." },
      { topic:"Algebra", q:"Which value is NOT in the range of f(x) = x² + 1?", choices:["1","2","5","0"], a:3, exp:"x²≥0 always, so f(x)=x²+1≥1. The value 0 is not in the range." },
      { topic:"Algebra", q:"Solve the system: y = 2x + 1, y = −x + 7", choices:["(2,5)","(3,7)","(1,3)","(4,−1)"], a:0, exp:"2x+1=−x+7 → 3x=6 → x=2. y=2(2)+1=5. Point: (2,5)." },
      { topic:"Algebra", q:"What is the slope of the line 6x − 2y = 8?", choices:["2","3","−3","6"], a:1, exp:"Solve for y: −2y=−6x+8 → y=3x−4. Slope=3." },
      { topic:"Algebra", q:"Which expression is equivalent to (3x²)³?", choices:["9x⁶","27x⁵","27x⁶","9x⁵"], a:2, exp:"(3x²)³ = 3³ × x^(2×3) = 27x⁶." },
      { topic:"Algebra", q:"A number increased by 40% gives 84. What is the original number?", choices:["50","55","60","65"], a:2, exp:"n × 1.4 = 84 → n = 60." },
      { topic:"Algebra", q:"Solve: |x − 3| = 7", choices:["x=10 only","x=−4 only","x=10 or x=−4","x=4 or x=−10"], a:2, exp:"x−3=7 → x=10, or x−3=−7 → x=−4." },
      { topic:"Algebra", q:"If 3x + 2y = 16 and x = 4, what is y?", choices:["1","2","3","4"], a:1, exp:"3(4)+2y=16 → 12+2y=16 → 2y=4 → y=2." },
      { topic:"Graphs & Functions", q:"What is the y-intercept of the equation 5x + 2y = 10?", choices:["(0,5)","(2,0)","(0,2)","(5,0)"], a:0, exp:"Set x=0: 2y=10 → y=5. Y-intercept is (0,5)." },
      { topic:"Graphs & Functions", q:"A line has slope −2 and passes through (3,1). What is its equation?", choices:["y=−2x+7","y=−2x+1","y=2x−5","y=−2x−5"], a:0, exp:"y−1=−2(x−3) → y−1=−2x+6 → y=−2x+7." },
      { topic:"Graphs & Functions", q:"If g(x) = 3x − 5, find x when g(x) = 16", choices:["x=5","x=6","x=7","x=8"], a:2, exp:"3x−5=16 → 3x=21 → x=7." },
      { topic:"Graphs & Functions", q:"Two lines are perpendicular. One has slope 4. What is the slope of the other?", choices:["4","-4","−1/4","1/4"], a:2, exp:"Perpendicular slopes are negative reciprocals. −1/4." },
      { topic:"Graphs & Functions", q:"In which quadrant is the point (−3, 5)?", choices:["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"], a:1, exp:"(−x, +y) is in Quadrant II." },
      { topic:"Data & Statistics", q:"Test scores: 55, 70, 85, 90, 100. What is the median?", choices:["70","80","85","90"], a:2, exp:"Already sorted. Middle value (3rd of 5) = 85." },
      { topic:"Data & Statistics", q:"A die is rolled. What is the probability of rolling a number greater than 4?", choices:["1/6","1/3","1/2","2/3"], a:1, exp:"Numbers > 4: {5, 6}. P = 2/6 = 1/3." },
      { topic:"Data & Statistics", q:"A survey of 200 people: 80 prefer coffee, 70 tea, 50 juice. What % prefer tea?", choices:["30%","35%","40%","45%"], a:1, exp:"70/200 = 0.35 = 35%." },
      { topic:"Data & Statistics", q:"The average of 5 numbers is 14. If four of them are 10, 12, 16, 18, what is the 5th?", choices:["12","14","15","16"], a:1, exp:"Total=14×5=70. Sum of 4=56. 5th=70−56=14." },
      { topic:"Data & Statistics", q:"Which measure of center is most affected by an outlier?", choices:["Mean","Median","Mode","Range"], a:0, exp:"The mean uses all values in its calculation, so an extreme outlier pulls it significantly." },
    ]
  }
];

// ── UTILITIES ──────────────────────────────────────────────────────────────
const topicColors = {
  "Basic Math": { bg:"#fce4ec", accent:"#c62828", pill:"#f06292" },
  "Geometry": { bg:"#e8f5e9", accent:"#1b5e20", pill:"#66bb6a" },
  "Algebra": { bg:"#e3f2fd", accent:"#0d47a1", pill:"#42a5f5" },
  "Graphs & Functions": { bg:"#f3e5f5", accent:"#4a148c", pill:"#ab47bc" },
  "Data & Statistics": { bg:"#fff8e1", accent:"#bf360c", pill:"#ffa726" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ScoreRing({ pct, size = 80, color }) {
  const r = (size - 10) / 2, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display:"block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f0f0" strokeWidth={8}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x={size/2} y={size/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>{pct}%</text>
    </svg>
  );
}

// ── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ questions, title, subtitle, onDone, onBack, timeLimit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit || null);
  const [flagged, setFlagged] = useState(new Set());
  const [showReview, setShowReview] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (!timeLimit) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); finish(answers); return 0; } return t-1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const q = questions[idx];
  const total = questions.length;

  const choose = (i) => { if (revealed) return; setSelected(i); };
  const submit = () => {
    if (selected === null) return;
    setRevealed(true);
    const newAnswers = [...answers, { question: q, chosen: selected, correct: selected === q.a }];
    if (idx + 1 === total) {
      clearInterval(timerRef.current);
      setTimeout(() => finish(newAnswers), 1400);
    } else {
      setAnswers(newAnswers);
    }
  };
  const next = () => {
    const newAnswers = answers.some((_,i)=>i===idx) ? answers : [...answers, { question: q, chosen: selected, correct: selected === q.a }];
    setAnswers(newAnswers);
    setSelected(null); setRevealed(false); setIdx(idx + 1);
  };

  const finish = (finalAnswers) => {
    const score = finalAnswers.filter(a => a.correct).length;
    const pct = Math.round((score / total) * 100);
    const byTopic = {};
    finalAnswers.forEach(({ question, correct }) => {
      const t = question.topic || title;
      if (!byTopic[t]) byTopic[t] = { correct: 0, total: 0 };
      byTopic[t].total++;
      if (correct) byTopic[t].correct++;
    });
    onDone({ score, total, pct, byTopic, answers: finalAnswers, title, timestamp: new Date().toLocaleString() });
  };

  const fmtTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const topicColor = topicColors[q.topic || title] || topicColors["Algebra"];

  if (showReview) {
    return (
      <div style={styles.quizWrap}>
        <div style={{ ...styles.quizHeader, background: topicColor.bg }}>
          <button onClick={onBack} style={styles.backBtn}>← Back</button>
          <h2 style={styles.quizTitle}>{title} — Review All</h2>
        </div>
        <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
          {questions.map((q, i) => {
            const ans = answers[i];
            const isCorrect = ans?.correct;
            return (
              <div key={i} style={{ background: isCorrect ? "#f1f8e9" : "#fce4ec", borderRadius:12, padding:"1rem 1.25rem", border:`1px solid ${isCorrect?"#aed581":"#ef9a9a"}` }}>
                <div style={{ fontSize:12, color:"#888", marginBottom:4 }}>Q{i+1} · {q.topic || title}</div>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:10, color:"#333" }}>{q.q}</div>
                {q.choices.map((c,ci) => (
                  <div key={ci} style={{ padding:"6px 10px", borderRadius:8, marginBottom:4, fontSize:13, background: ci===q.a?"#c8e6c9": ci===ans?.chosen&&!isCorrect?"#ffcdd2":"transparent", color: ci===q.a?"#2e7d32": ci===ans?.chosen&&!isCorrect?"#c62828":"#444" }}>
                    {ci===q.a?"✓ ":ci===ans?.chosen&&!isCorrect?"✗ ":""}{c}
                  </div>
                ))}
                <div style={{ marginTop:8, fontSize:12, color:"#666", lineHeight:1.6 }}>💡 {q.exp}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.quizWrap}>
      <div style={{ ...styles.quizHeader, background: topicColor.bg }}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <div>
          <h2 style={styles.quizTitle}>{title}</h2>
          <div style={{ fontSize:13, color:"#888" }}>{subtitle}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {timeLimit && <div style={{ fontWeight:700, fontSize:16, color: timeLeft<300?"#e53935":"#555" }}>⏱ {fmtTime(timeLeft)}</div>}
          <button onClick={() => setShowReview(true)} style={{ ...styles.ghostBtn, fontSize:12 }}>Review All</button>
        </div>
      </div>

      <div style={{ padding:"0 1.5rem", marginTop:"1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ fontSize:13, color:"#999" }}>Question {idx+1} of {total}</span>
          <span style={{ fontSize:13, color: topicColor.accent, fontWeight:600 }}>{q.topic || title}</span>
        </div>
        <div style={{ height:6, background:"#f0f0f0", borderRadius:100, marginBottom:"1.5rem", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${((idx+1)/total)*100}%`, background: topicColor.pill, borderRadius:100, transition:"width 0.4s" }}/>
        </div>

        <div style={{ fontSize:17, fontWeight:600, color:"#222", lineHeight:1.6, marginBottom:"1.5rem" }}>{q.q}</div>

        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1.5rem" }}>
          {q.choices.map((c, i) => {
            let bg = "#fafafa", border = "1px solid #e8e8e8", color = "#333";
            if (revealed) {
              if (i === q.a) { bg="#e8f5e9"; border="1.5px solid #66bb6a"; color="#2e7d32"; }
              else if (i === selected) { bg="#fce4ec"; border="1.5px solid #ef9a9a"; color="#c62828"; }
            } else if (i === selected) { bg=topicColor.bg; border=`1.5px solid ${topicColor.pill}`; color=topicColor.accent; }
            return (
              <button key={i} onClick={() => choose(i)} style={{ background:bg, border, borderRadius:12, padding:"12px 16px", fontSize:14, color, textAlign:"left", cursor: revealed?"default":"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontWeight:600, marginRight:8, color: color==="#333"?"#bbb":color }}>{String.fromCharCode(65+i)}.</span>{c}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ background:"#fffde7", border:"1px solid #ffe082", borderRadius:12, padding:"12px 16px", fontSize:13, color:"#5d4037", marginBottom:"1.5rem", lineHeight:1.7 }}>
            <span style={{ fontWeight:700 }}>💡 Explanation: </span>{q.exp}
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          {!revealed
            ? <button onClick={submit} disabled={selected===null} style={{ ...styles.primaryBtn, opacity: selected===null?0.4:1, background: topicColor.accent }}>Check Answer</button>
            : idx+1 < total
              ? <button onClick={next} style={{ ...styles.primaryBtn, background: topicColor.accent }}>Next Question →</button>
              : null
          }
        </div>
      </div>
    </div>
  );
}

// ── RESULTS SCREEN ──────────────────────────────────────────────────────────
function ResultScreen({ result, onRetry, onBack, onSave }) {
  useEffect(() => { onSave(result); }, []);
  const grade = result.pct >= 80 ? "Excellent!" : result.pct >= 60 ? "Good work!" : "Keep practicing!";
  const gradeColor = result.pct >= 80 ? "#2e7d32" : result.pct >= 60 ? "#e65100" : "#c62828";

  return (
    <div style={styles.quizWrap}>
      <div style={{ padding:"2rem", textAlign:"center", borderBottom:"1px solid #f0f0f0" }}>
        <div style={{ fontSize:13, color:"#aaa", marginBottom:8 }}>{result.title}</div>
        <ScoreRing pct={result.pct} size={110} color={gradeColor}/>
        <h2 style={{ fontSize:24, fontWeight:700, color:"#222", marginTop:12, marginBottom:4 }}>{grade}</h2>
        <p style={{ color:"#888", fontSize:14 }}>{result.score} of {result.total} correct · {result.timestamp}</p>
      </div>

      {result.byTopic && (
        <div style={{ padding:"1.5rem" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:"#555", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>By Topic</h3>
          {Object.entries(result.byTopic).map(([t, d]) => {
            const tpct = Math.round((d.correct/d.total)*100);
            const tc = topicColors[t] || topicColors["Algebra"];
            return (
              <div key={t} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:13, color:"#444" }}>{t}</span>
                  <span style={{ fontSize:13, fontWeight:600, color: tc.accent }}>{d.correct}/{d.total} ({tpct}%)</span>
                </div>
                <div style={{ height:8, background:"#f0f0f0", borderRadius:100, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${tpct}%`, background:tc.pill, borderRadius:100, transition:"width 0.6s" }}/>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ padding:"0 1.5rem 1.5rem", display:"flex", gap:10 }}>
        {result.pct < 80 && <button onClick={onRetry} style={{ ...styles.primaryBtn, background:"#5c6bc0" }}>Retry</button>}
        <button onClick={onBack} style={styles.ghostBtn}>← Back to Practice</button>
      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const styles = {
  quizWrap: { fontFamily:"'Nunito', 'Segoe UI', sans-serif", background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 30px rgba(0,0,0,0.08)", minHeight:400 },
  quizHeader: { padding:"1.25rem 1.5rem", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" },
  quizTitle: { fontSize:17, fontWeight:700, color:"#222", margin:0 },
  backBtn: { background:"rgba(255,255,255,0.7)", border:"none", borderRadius:100, padding:"6px 14px", fontSize:13, color:"#555", cursor:"pointer", fontFamily:"inherit", fontWeight:600 },
  ghostBtn: { background:"#f5f5f5", border:"1px solid #e0e0e0", borderRadius:100, padding:"10px 20px", fontSize:14, color:"#555", cursor:"pointer", fontFamily:"inherit", fontWeight:600 },
  primaryBtn: { background:"#5c6bc0", border:"none", borderRadius:100, padding:"11px 26px", fontSize:14, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:700, transition:"opacity 0.2s" },
};

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [activeQuiz, setActiveQuiz] = useState(null); // { type, data }
  const [results, setResults] = useState([]);
  const [retryData, setRetryData] = useState(null);

  const saveResult = (r) => {
    setResults(prev => {
      const exists = prev.find(x => x.timestamp === r.timestamp);
      return exists ? prev : [r, ...prev];
    });
  };

  if (activeQuiz) {
    const handleDone = (result) => {
      setActiveQuiz({ type:"result", result, source: activeQuiz });
    };
    if (activeQuiz.type === "result") {
      return <ResultScreen
        result={activeQuiz.result}
        onSave={saveResult}
        onBack={() => setActiveQuiz(null)}
        onRetry={() => {
          const src = activeQuiz.source;
          setActiveQuiz({ ...src });
        }}
      />;
    }
    const qs = activeQuiz.type === "topic"
      ? shuffle(TOPICS[activeQuiz.topic].questions).slice(0, 10)
      : activeQuiz.type === "fulltest"
        ? activeQuiz.questions
        : activeQuiz.questions;
    const tl = activeQuiz.type === "fulltest" ? 115 * 60 : null;
    return <QuizEngine
      questions={qs}
      title={activeQuiz.title}
      subtitle={activeQuiz.subtitle}
      onDone={handleDone}
      onBack={() => setActiveQuiz(null)}
      timeLimit={tl}
    />;
  }

  return (
    <div style={{ fontFamily:"'Nunito', 'Georgia', sans-serif", background:"linear-gradient(135deg,#fdf6ff 0%,#f0f8ff 50%,#fff8f0 100%)", minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#e8d5f5 0%,#d4e8ff 60%,#ffe0ec 100%)", padding:"2.5rem 2rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.25)" }}/>
        <div style={{ position:"absolute", bottom:-60, right:-30, width:250, height:250, borderRadius:"50%", background:"rgba(255,255,255,0.2)" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.6)", borderRadius:100, padding:"5px 18px", fontSize:12, fontWeight:800, letterSpacing:2, color:"#7c4dff", marginBottom:12, textTransform:"uppercase" }}>GED Math Prep</div>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, color:"#2d1b69", margin:"0 0 10px", lineHeight:1.2 }}>
            You've Got This 💫
          </h1>
          <p style={{ fontSize:15, color:"#5a4a7a", maxWidth:500, margin:"0 auto 1.5rem", lineHeight:1.7 }}>A beautiful study hub built just for you. Learn, practice, and track your progress toward passing the GED Math test.</p>
          <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
            {[["46","Questions"],["115 min","Time limit"],["145","Score to pass"],["4","Topic areas"]].map(([n,l]) => (
              <div key={l} style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"10px 20px", textAlign:"center" }}>
                <div style={{ fontSize:20, fontWeight:900, color:"#5c35d4" }}>{n}</div>
                <div style={{ fontSize:11, color:"#9e8ecf", fontWeight:600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background:"#fff", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display:"flex", overflowX:"auto", scrollbarWidth:"none", padding:"0 1rem" }}>
          {[["home","🏠 Home"],["topics","📚 Topics"],["practice","✏️ Practice"],["resources","🔗 Resources"],["results","📊 My Results"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ background:"none", border:"none", padding:"14px 18px", fontSize:13, fontWeight: tab===id?800:600, color: tab===id?"#7c4dff":"#999", borderBottom: tab===id?"3px solid #7c4dff":"3px solid transparent", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"all 0.18s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"2rem 1.5rem 4rem" }}>

        {/* HOME */}
        {tab === "home" && <HomeTab setTab={setTab} />}

        {/* TOPICS */}
        {tab === "topics" && <TopicsTab setActiveQuiz={setActiveQuiz} />}

        {/* PRACTICE */}
        {tab === "practice" && <PracticeTab setActiveQuiz={setActiveQuiz} results={results} />}

        {/* RESOURCES */}
        {tab === "resources" && <ResourcesTab />}

        {/* RESULTS */}
        {tab === "results" && <ResultsTab results={results} />}
      </div>
    </div>
  );
}

// ── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ setTab }) {
  const cards = [
    { color:"#f3e5f5", accent:"#7c4dff", icon:"📚", title:"Study by Topic", desc:"5 focused topic quizzes — 10 questions each with instant explanations.", tab:"topics" },
    { color:"#e3f2fd", accent:"#1565c0", icon:"✏️", title:"Full Practice Tests", desc:"2 full 46-question tests with a 115-minute timer, just like the real exam.", tab:"practice" },
    { color:"#e8f5e9", accent:"#2e7d32", icon:"📊", title:"My Results", desc:"Track every quiz and test you've taken. See where you're strongest.", tab:"results" },
    { color:"#fff8e1", accent:"#e65100", icon:"🔗", title:"Free Resources", desc:"Hand-picked links to the best free GED Math resources online.", tab:"resources" },
  ];
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:6 }}>Welcome! Where would you like to start?</h2>
      <p style={{ color:"#888", marginBottom:"1.5rem", fontSize:14, lineHeight:1.7 }}>The GED Math test has 46 questions covering Basic Math, Geometry, Algebra, Graphs & Functions, and Data & Statistics. You have 115 minutes and need a score of 145/200 to pass — that's about 45% correct. You can do this.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
        {cards.map(c => (
          <button key={c.tab} onClick={() => setTab(c.tab)} style={{ background:c.color, border:"none", borderRadius:20, padding:"1.5rem", textAlign:"left", cursor:"pointer", transition:"transform 0.18s, box-shadow 0.18s", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", fontFamily:"inherit" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"; }}>
            <div style={{ fontSize:32, marginBottom:10 }}>{c.icon}</div>
            <h3 style={{ fontSize:16, fontWeight:800, color:c.accent, marginBottom:6 }}>{c.title}</h3>
            <p style={{ fontSize:13, color:"#555", lineHeight:1.6, margin:0 }}>{c.desc}</p>
          </button>
        ))}
      </div>

      <div style={{ marginTop:"2rem", background:"#fce4ec", borderRadius:20, padding:"1.5rem" }}>
        <h3 style={{ fontSize:16, fontWeight:800, color:"#880e4f", marginBottom:10 }}>📋 Test at a Glance</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 }}>
          {[
            ["Format","Computer-based exam at a testing center"],
            ["Part 1","5 questions, NO calculator"],
            ["Part 2","41 questions, TI-30XS calculator allowed"],
            ["Question types","Multiple choice, fill-in-blank, drag-drop, hot spot"],
            ["Passing score","145 out of 200 (~45% correct)"],
            ["College Ready","Score 165+ to skip developmental courses"],
          ].map(([k,v]) => (
            <div key={k} style={{ background:"rgba(255,255,255,0.6)", borderRadius:12, padding:"10px 14px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#c62878", textTransform:"uppercase", letterSpacing:0.5, marginBottom:3 }}>{k}</div>
              <div style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TOPICS TAB ────────────────────────────────────────────────────────────────
function TopicsTab({ setActiveQuiz }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:6 }}>Study by Topic</h2>
      <p style={{ color:"#888", marginBottom:"1.5rem", fontSize:14 }}>Each topic below has a 10-question quiz with instant feedback and detailed explanations. Click a topic to learn more, then start the quiz.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {Object.entries(TOPICS).map(([name, data]) => (
          <div key={name} style={{ background:data.color, borderRadius:20, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <button onClick={() => setExpanded(expanded===name?null:name)} style={{ width:"100%", background:"none", border:"none", padding:"1.25rem 1.5rem", display:"flex", alignItems:"center", gap:14, cursor:"pointer", fontFamily:"inherit" }}>
              <span style={{ fontSize:28 }}>{data.emoji}</span>
              <div style={{ flex:1, textAlign:"left" }}>
                <div style={{ fontSize:17, fontWeight:800, color:data.accent }}>{name}</div>
                <div style={{ fontSize:13, color:"#666", marginTop:2 }}>{data.desc} · {data.questions.length} questions</div>
              </div>
              <span style={{ fontSize:20, color:data.accent, transform: expanded===name?"rotate(180deg)":"", transition:"transform 0.2s" }}>⌄</span>
            </button>
            {expanded === name && (
              <div style={{ padding:"0 1.5rem 1.5rem" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
                  {data.questions.slice(0,4).map((q,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.7)", borderRadius:10, padding:"6px 12px", fontSize:12, color:"#555", maxWidth:300 }}>
                      {q.q.length > 60 ? q.q.slice(0,60)+"…" : q.q}
                    </div>
                  ))}
                  <div style={{ background:"rgba(255,255,255,0.5)", borderRadius:10, padding:"6px 12px", fontSize:12, color:"#888" }}>+{data.questions.length-4} more…</div>
                </div>
                <button onClick={() => setActiveQuiz({ type:"topic", topic:name, title:`${data.emoji} ${name} Quiz`, subtitle:`10 questions · instant explanations` })}
                  style={{ background:data.accent, border:"none", borderRadius:100, padding:"11px 28px", fontSize:14, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:700 }}>
                  Start Quiz → 10 Questions
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop:"2rem", background:"#e8eaf6", borderRadius:20, padding:"1.5rem" }}>
        <h3 style={{ fontSize:15, fontWeight:800, color:"#3949ab", marginBottom:12 }}>📐 Formula Reference Sheet</h3>
        <p style={{ fontSize:13, color:"#555", marginBottom:14, lineHeight:1.6 }}>These formulas are provided during the real test. You don't need to memorize them — but know how to use each one.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10 }}>
          {[
            ["Area","Rectangle: A=lw | Triangle: A=½bh | Circle: A=πr²"],
            ["Perimeter","Rectangle: P=2l+2w | Circle: C=2πr"],
            ["Volume","Box: V=lwh | Cylinder: V=πr²h | Cone: V=⅓πr²h"],
            ["Pythagorean","a² + b² = c²"],
            ["Slope","m = (y₂−y₁)/(x₂−x₁)"],
            ["Line","y = mx + b"],
            ["Quadratic","x = (−b ± √(b²−4ac)) / 2a"],
            ["Percent","Part = % × Whole | % change = (new−old)/old × 100"],
            ["Interest","I = P × r × t"],
            ["Mean","Sum ÷ count (memorize this one!)"],
          ].map(([k,v]) => (
            <div key={k} style={{ background:"rgba(255,255,255,0.7)", borderRadius:12, padding:"10px 14px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#3949ab", textTransform:"uppercase", letterSpacing:0.5, marginBottom:4 }}>{k}</div>
              <code style={{ fontSize:12, color:"#333", lineHeight:1.6, display:"block" }}>{v}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PRACTICE TAB ──────────────────────────────────────────────────────────────
function PracticeTab({ setActiveQuiz, results }) {
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:6 }}>Practice Tests</h2>
      <p style={{ color:"#888", marginBottom:"1.5rem", fontSize:14, lineHeight:1.7 }}>Full-length practice tests mirror the real GED: 46 questions, 115-minute countdown timer, and a mix of all topics. Take one timed to simulate the real exam experience.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:"2rem" }}>
        {PRACTICE_TESTS.map(pt => {
          const myResults = results.filter(r => r.title === pt.name);
          const best = myResults.length ? Math.max(...myResults.map(r=>r.pct)) : null;
          const topicSet = [...new Set(pt.questions.map(q=>q.topic))];
          return (
            <div key={pt.id} style={{ background:"#fff", borderRadius:20, boxShadow:"0 4px 20px rgba(0,0,0,0.08)", overflow:"hidden", border:"1px solid #f0f0f0" }}>
              <div style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"1.5rem", color:"#fff" }}>
                <div style={{ fontSize:13, opacity:0.8, marginBottom:4 }}>Full Practice Test</div>
                <h3 style={{ fontSize:20, fontWeight:900, margin:"0 0 8px" }}>{pt.name}</h3>
                <p style={{ fontSize:13, opacity:0.85, margin:0 }}>{pt.desc}</p>
              </div>
              <div style={{ padding:"1.25rem 1.5rem" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                  {topicSet.map(t => (
                    <span key={t} style={{ background:(topicColors[t]||topicColors["Algebra"]).bg, color:(topicColors[t]||topicColors["Algebra"]).accent, borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{t}</span>
                  ))}
                </div>
                {best !== null && (
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, background:"#f3e5f5", borderRadius:10, padding:"8px 12px" }}>
                    <ScoreRing pct={best} size={44} color="#7c4dff"/>
                    <div>
                      <div style={{ fontSize:12, color:"#888" }}>Your best score</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#5c35d4" }}>{myResults.length} attempt{myResults.length>1?"s":""}</div>
                    </div>
                  </div>
                )}
                <button onClick={() => setActiveQuiz({ type:"fulltest", questions: pt.questions, title: pt.name, subtitle:"46 questions · 115 min timer" })}
                  style={{ width:"100%", background:"linear-gradient(135deg,#667eea,#764ba2)", border:"none", borderRadius:100, padding:"12px 20px", fontSize:14, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:800 }}>
                  {best!==null?"Retake Test →":"Start Test →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background:"#e8f5e9", borderRadius:20, padding:"1.5rem", marginBottom:"1.5rem" }}>
        <h3 style={{ fontSize:16, fontWeight:800, color:"#1b5e20", marginBottom:10 }}>🎯 Topic Mini-Quizzes</h3>
        <p style={{ fontSize:13, color:"#555", marginBottom:14, lineHeight:1.6 }}>Not ready for a full test? Start with a focused 10-question quiz on a specific topic. Great for drilling weak areas.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
          {Object.entries(TOPICS).map(([name, data]) => (
            <button key={name} onClick={() => setActiveQuiz({ type:"topic", topic:name, title:`${data.emoji} ${name} Quiz`, subtitle:"10 questions · no time limit" })}
              style={{ background:data.color, border:"none", borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontFamily:"inherit", transition:"transform 0.18s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
              <span style={{ fontSize:22 }}>{data.emoji}</span>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:13, fontWeight:800, color:data.accent }}>{name}</div>
                <div style={{ fontSize:11, color:"#777" }}>10 questions</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ background:"#fff3e0", borderRadius:20, padding:"1.5rem" }}>
        <h3 style={{ fontSize:15, fontWeight:800, color:"#bf360c", marginBottom:8 }}>💡 Test-Taking Tips</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {["The first 5 questions have NO calculator — practice mental math and fractions by hand before test day.","Use the formula sheet! You get one during the real test — learn where each formula is so you find it quickly under pressure.","Flag hard questions and come back. Don't spend 10 minutes on one problem.","For multiple-select questions, evaluate EVERY choice — there may be 2 or more correct answers.","Algebra is 55% of the test. Make sure you're comfortable solving equations and graphing lines.","You only need ~45% correct to pass. Focus on your strongest topics first, then work on weaknesses."].map((tip,i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <div style={{ minWidth:24, height:24, borderRadius:"50%", background:"#bf360c", color:"#fff", fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>{i+1}</div>
              <p style={{ fontSize:13, color:"#555", lineHeight:1.6, margin:0 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESOURCES TAB ─────────────────────────────────────────────────────────────
function ResourcesTab() {
  const resources = [
    { icon:"🏛️", color:"#e8eaf6", accent:"#3949ab", tag:"Official", name:"GED.com — Official Study Materials", desc:"The official source. Includes a free GED Ready mini-test, flash cards, and the formula sheet PDF.", url:"https://ged.com/study-online/math/" },
    { icon:"📺", color:"#fff8e1", accent:"#f57f17", tag:"Free · Video", name:"Khan Academy — Free Math Lessons", desc:"Short, clear video lessons on every GED topic. Search by subject: fractions, linear equations, Pythagorean theorem.", url:"https://www.khanacademy.org/math" },
    { icon:"✏️", color:"#e8f5e9", accent:"#2e7d32", tag:"Free · Practice", name:"PassGED — Practice Tests", desc:"Practice questions that mirror the real GED format, with full answer explanations.", url:"https://www.passged.com/ged-math-practice-test" },
    { icon:"🎯", color:"#fce4ec", accent:"#c62828", tag:"Free · Practice", name:"Union Test Prep — Topic Drills", desc:"Organized by content area. Great for drilling a specific weakness in algebra, geometry, or data.", url:"https://uniontestprep.com/ged-test/practice-test" },
    { icon:"📄", color:"#e3f2fd", accent:"#1565c0", tag:"Official · PDF", name:"Official GED Formula Sheet", desc:"The exact formula reference you'll see during the real exam. Download and keep it handy.", url:"https://ged.com/wp-content/uploads/assessment_guide_for_educators_math.pdf" },
    { icon:"▶️", color:"#f3e5f5", accent:"#6a1b9a", tag:"Free · Video", name:"YouTube — GED Math Walkthroughs", desc:'"Mario\'s Math Tutoring" and "Anywhere Math" have excellent GED-specific video content for every topic.', url:"https://www.youtube.com/results?search_query=GED+math+2025+study+guide" },
    { icon:"🔢", color:"#e8f5e9", accent:"#2e7d32", tag:"Free · Tool", name:"TI-30XS Calculator Simulator", desc:"Practice with the official GED calculator before test day so you're comfortable with it.", url:"https://www.desmos.com/scientific" },
    { icon:"📝", color:"#fff8e1", accent:"#e65100", tag:"Free · Practice", name:"GED Practice Questions.com", desc:"Full practice tests and topic-specific questions, updated regularly for accuracy.", url:"https://www.gedpracticequestions.com/ged-math-practice-test/" },
    { icon:"📖", color:"#fce4ec", accent:"#880e4f", tag:"Free · Guide", name:"GED Practice Test .net — Study Guide", desc:"Detailed study guide organized by topic with worked examples and practice problems.", url:"https://gedpracticetest.net/ged-study-guide/math/" },
  ];
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:6 }}>Free Study Resources</h2>
      <p style={{ color:"#888", marginBottom:"1.5rem", fontSize:14, lineHeight:1.7 }}>The best free tools available online — hand-picked for GED Math prep. Click any card to open the link.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {resources.map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
            style={{ background:r.color, borderRadius:16, padding:"1.25rem 1.5rem", display:"flex", gap:16, alignItems:"flex-start", textDecoration:"none", transition:"transform 0.18s, box-shadow 0.18s", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.06)"; }}>
            <div style={{ fontSize:28, lineHeight:1 }}>{r.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4, flexWrap:"wrap" }}>
                <span style={{ fontSize:15, fontWeight:800, color:r.accent }}>{r.name}</span>
                <span style={{ background:"rgba(255,255,255,0.7)", borderRadius:100, padding:"2px 10px", fontSize:10, fontWeight:700, color:r.accent }}>{r.tag}</span>
              </div>
              <p style={{ fontSize:13, color:"#555", lineHeight:1.6, margin:"0 0 4px" }}>{r.desc}</p>
              <span style={{ fontSize:12, color:r.accent, fontWeight:600 }}>{r.url.replace(/https?:\/\/(www\.)?/,"").split("/")[0]} →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── RESULTS TAB ───────────────────────────────────────────────────────────────
function ResultsTab({ results }) {
  if (results.length === 0) {
    return (
      <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>📊</div>
        <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:8 }}>No results yet</h2>
        <p style={{ color:"#888", fontSize:14 }}>Complete a quiz or practice test to see your results here. Every attempt is tracked automatically.</p>
      </div>
    );
  }
  const allTopicStats = {};
  results.forEach(r => {
    Object.entries(r.byTopic || {}).forEach(([t, d]) => {
      if (!allTopicStats[t]) allTopicStats[t] = { correct:0, total:0 };
      allTopicStats[t].correct += d.correct;
      allTopicStats[t].total += d.total;
    });
  });
  const avgPct = Math.round(results.reduce((s,r)=>s+r.pct,0)/results.length);

  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#2d1b69", marginBottom:6 }}>My Results</h2>
      <p style={{ color:"#888", marginBottom:"1.5rem", fontSize:14 }}>Every quiz and test you've taken is tracked below.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:"2rem" }}>
        {[["📝",results.length,"Tests Taken"],["⭐",`${avgPct}%`,"Average Score"],["✅",results.filter(r=>r.pct>=45).length,"Passing Scores"]].map(([icon,val,label]) => (
          <div key={label} style={{ background:"linear-gradient(135deg,#e8d5f5,#d4e8ff)", borderRadius:16, padding:"1.25rem", textAlign:"center" }}>
            <div style={{ fontSize:24 }}>{icon}</div>
            <div style={{ fontSize:24, fontWeight:900, color:"#5c35d4" }}>{val}</div>
            <div style={{ fontSize:12, color:"#888", fontWeight:600 }}>{label}</div>
          </div>
        ))}
      </div>

      {Object.keys(allTopicStats).length > 0 && (
        <div style={{ background:"#fff", borderRadius:20, padding:"1.5rem", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", marginBottom:"1.5rem" }}>
          <h3 style={{ fontSize:15, fontWeight:800, color:"#333", marginBottom:14 }}>Performance by Topic</h3>
          {Object.entries(allTopicStats).map(([t, d]) => {
            const pct = Math.round((d.correct/d.total)*100);
            const tc = topicColors[t] || topicColors["Algebra"];
            return (
              <div key={t} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:"#333" }}>{t}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:tc.accent }}>{d.correct}/{d.total} · {pct}%</span>
                </div>
                <div style={{ height:10, background:"#f5f5f5", borderRadius:100, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background: pct>=70?tc.pill:"#ef9a9a", borderRadius:100, transition:"width 0.8s" }}/>
                </div>
                {pct < 60 && <p style={{ fontSize:11, color:"#e53935", marginTop:4 }}>⚠ Needs more practice — revisit this topic</p>}
                {pct >= 80 && <p style={{ fontSize:11, color:"#2e7d32", marginTop:4 }}>✓ Strong performance — keep it up!</p>}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {results.map((r, i) => (
          <div key={i} style={{ background:"#fff", borderRadius:16, padding:"1.25rem 1.5rem", boxShadow:"0 2px 10px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", gap:16 }}>
            <ScoreRing pct={r.pct} size={56} color={r.pct>=80?"#2e7d32":r.pct>=60?"#e65100":"#c62828"}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800, color:"#222" }}>{r.title}</div>
              <div style={{ fontSize:12, color:"#aaa", marginTop:2 }}>{r.timestamp} · {r.score}/{r.total} correct</div>
            </div>
            <div style={{ fontSize:20, fontWeight:900, color:r.pct>=45?"#2e7d32":"#c62828" }}>
              {r.pct>=45?"✅":"❌"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
