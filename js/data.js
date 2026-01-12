const currentMonthData = {
    totalIncome: 5000,
    currency: "RON",
    categories: [
        {
            id: 1,
            name: "Mâncare",
            budgeted: 1500,
            spent: 1650,
            icon: "🍔"
        },
        {
            id: 2,
            name: "Utilități",
            budgeted: 500,
            spent: 480,
            icon: "💡"
        },
        {
            id: 3,
            name: "Transport",
            budgeted: 400,
            spent: 200,
            icon: "🚌"
        },
        {
            id: 4,
            name: "Distracție",
            budgeted: 300,
            spent: 290,
            icon: "🎬"
        }
    ]
};

const historyData = [
    { month: "Mai", income: 4800, expense: 4000 },
    { month: "Iun", income: 4800, expense: 4500 },
    { month: "Iul", income: 5200, expense: 3800 },
    { month: "Aug", income: 4800, expense: 4900 },
    { month: "Sep", income: 5000, expense: 4200 },
    { month: "Oct", income: 5000, expense: 2620 }
];

// Bugete per lună (mock). Populat de pagina Task 1 la salvare.
let budgetsData = {};

// Tranzacții înregistrate (cheltuieli). Folosit de pagina Task 2.
let transactionsData = [];