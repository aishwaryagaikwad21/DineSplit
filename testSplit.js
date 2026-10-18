import { calculateEqualSplit } from "./src/services/split/equalSplit.js";

const testCases = [
    {
        name: "₹100.50 split among 3 people",
        bill: { grandTotal: 100.50 },
        totalMembers: 3,
        memNames: ["A", "B", "C"],
        expected: [33.50, 33.50, 33.50]
    },
    {
        name: "₹100 split among 3 people",
        bill: { grandTotal: 100 },
        totalMembers: 3,
        memNames: ["A", "B", "C"],
        expected: [33.34, 33.33, 33.33]
    },
    {
        name: "₹250.75 split among 2 people",
        bill: { grandTotal: 250.75 },
        totalMembers: 2,
        memNames: ["A", "B"],
        expected: [125.38, 125.37]
    }
];

for (const test of testCases) {
    const result = calculateEqualSplit(
        test.bill,
        test.totalMembers,
        test.memNames
    );

    const actual = result.map(member => member.amountOwed);
    const passed = actual.every(
        (amount, index) => amount === test.expected[index]
    );

    console.log(`\n${test.name}`);
    console.log("Result:", actual);
    console.log("Expected:", test.expected);
    console.log(passed ? "✅ PASS" : "❌ FAIL");
}