// js/data.js

// Date simulate pentru luna curentă (Octombrie)
const currentMonthData = {
    totalIncome: 5000,
    currency: "RON",
    categories: [
        {
            id: 1,
            name: "Mâncare",
            budgeted: 1500,
            spent: 1650, // Depășit - va trebui să fie roșu
            icon: "🍔"
        },
        {
            id: 2,
            name: "Utilități",
            budgeted: 500,
            spent: 480, // OK - verde
            icon: "💡"
        },
        {
            id: 3,
            name: "Transport",
            budgeted: 400,
            spent: 200, // OK - verde
            icon: "🚌"
        },
        {
            id: 4,
            name: "Distracție",
            budgeted: 300,
            spent: 290, // La limită - poate galben?
            icon: "🎬"
        }
    ]
};

// Date istorice pentru Sarcina 12 (Cash Flow)
const historyData = [
    { month: "Mai", income: 4800, expense: 4000 },
    { month: "Iun", income: 4800, expense: 4500 },
    { month: "Iul", income: 5200, expense: 3800 },
    { month: "Aug", income: 4800, expense: 4900 }, // Concediu
    { month: "Sep", income: 5000, expense: 4200 },
    { month: "Oct", income: 5000, expense: 2620 } // Parțial
];