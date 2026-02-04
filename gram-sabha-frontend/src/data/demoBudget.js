// Demo budget and transparency data for GRAM-SABHA

export const demoBudget = [
  {
    id: 'budget-001',
    complaintId: 'complaint-001',
    title: 'Broken Hand Pump Repair',
    titleHi: 'टूटा हैंडपंप मरम्मत',
    totalAllocated: 15000,
    totalSpent: 9750,
    breakdown: {
      materials: [
        { item: 'Hand Pump Parts', itemHi: 'हैंडपंप पुर्जे', cost: 4500, quantity: 1, unit: 'set' },
        { item: 'Cement & Sand', itemHi: 'सीमेंट और रेत', cost: 1200, quantity: 50, unit: 'kg' },
        { item: 'Pipes', itemHi: 'पाइप', cost: 2500, quantity: 10, unit: 'meters' },
      ],
      labor: [
        { worker: 'Shyam (Plumber)', workerHi: 'श्याम (प्लम्बर)', days: 2, ratePerDay: 800, total: 1600 },
      ],
    },
    timeline: [
      { date: new Date('2024-01-16'), event: 'Budget Allocated', eventHi: 'बजट आवंटित', amount: 15000 },
      { date: new Date('2024-01-17'), event: 'Materials Purchased', eventHi: 'सामग्री खरीदी', amount: -8200 },
      { date: new Date('2024-01-19'), event: 'Labor Payment (Day 1-2)', eventHi: 'श्रम भुगतान (दिन 1-2)', amount: -1600 },
    ],
    remainingBalance: 5250,
    status: 'in_progress'
  },
  {
    id: 'budget-002',
    complaintId: 'complaint-003',
    title: 'Street Lights Installation Ward 3',
    titleHi: 'वार्ड 3 स्ट्रीट लाइट स्थापना',
    totalAllocated: 32000,
    totalSpent: 0,
    breakdown: {
      materials: [
        { item: 'LED Street Lights', itemHi: 'LED स्ट्रीट लाइट', cost: 18000, quantity: 8, unit: 'pieces' },
        { item: 'Poles & Fittings', itemHi: 'खंभे और फिटिंग', cost: 8000, quantity: 8, unit: 'sets' },
        { item: 'Wiring & Cables', itemHi: 'तारें और केबल', cost: 3500, quantity: 100, unit: 'meters' },
      ],
      labor: [
        { worker: 'Bijli Seva Team', workerHi: 'बिजली सेवा टीम', days: 3, ratePerDay: 800, total: 2400 },
      ],
    },
    timeline: [
      { date: new Date('2024-01-21'), event: 'Budget Allocated', eventHi: 'बजट आवंटित', amount: 32000 },
    ],
    remainingBalance: 32000,
    status: 'allocated'
  },
  {
    id: 'budget-003',
    complaintId: 'complaint-006',
    title: 'School Building Repair',
    titleHi: 'स्कूल भवन मरम्मत',
    totalAllocated: 250000,
    totalSpent: 98000,
    breakdown: {
      materials: [
        { item: 'Roofing Materials', itemHi: 'छत सामग्री', cost: 45000, quantity: 200, unit: 'sq ft' },
        { item: 'Cement & Concrete', itemHi: 'सीमेंट और कंक्रीट', cost: 35000, quantity: 500, unit: 'kg' },
        { item: 'Paint & Coating', itemHi: 'पेंट और कोटिंग', cost: 15000, quantity: 50, unit: 'liters' },
        { item: 'Wall Repair Materials', itemHi: 'दीवार मरम्मत सामग्री', cost: 12000, quantity: 1, unit: 'set' },
      ],
      labor: [
        { worker: 'Kumar Construction Team', workerHi: 'कुमार निर्माण टीम', days: 15, ratePerDay: 2000, total: 30000 },
      ],
    },
    timeline: [
      { date: new Date('2024-01-14'), event: 'Budget Allocated', eventHi: 'बजट आवंटित', amount: 250000 },
      { date: new Date('2024-01-17'), event: 'Materials Phase 1', eventHi: 'सामग्री चरण 1', amount: -65000 },
      { date: new Date('2024-01-20'), event: 'Labor Payment Week 1-2', eventHi: 'श्रम भुगतान सप्ताह 1-2', amount: -30000 },
      { date: new Date('2024-01-23'), event: 'Additional Materials', eventHi: 'अतिरिक्त सामग्री', amount: -3000 },
    ],
    remainingBalance: 152000,
    status: 'in_progress'
  },
  {
    id: 'budget-004',
    complaintId: 'complaint-009',
    title: 'Public Toilet Repair',
    titleHi: 'सार्वजनिक शौचालय मरम्मत',
    totalAllocated: 12000,
    totalSpent: 0,
    breakdown: {
      materials: [
        { item: 'Water Tank & Pipes', itemHi: 'पानी की टंकी और पाइप', cost: 4500, quantity: 1, unit: 'set' },
        { item: 'Door Lock & Fittings', itemHi: 'दरवाजे का ताला और फिटिंग', cost: 2500, quantity: 1, unit: 'set' },
        { item: 'Cleaning & Sanitization', itemHi: 'सफाई और स्वच्छता', cost: 2000, quantity: 1, unit: 'service' },
      ],
      labor: [
        { worker: 'Ramesh Repairs Team', workerHi: 'रमेश रिपेयर्स टीम', days: 2, ratePerDay: 700, total: 1400 },
      ],
    },
    timeline: [
      { date: new Date('2024-01-22'), event: 'Budget Allocated', eventHi: 'बजट आवंटित', amount: 12000 },
    ],
    remainingBalance: 12000,
    status: 'allocated'
  },
  {
    id: 'budget-005',
    complaintId: 'complaint-004',
    title: 'Garbage Collection Service',
    titleHi: 'कचरा संग्रह सेवा',
    totalAllocated: 5000,
    totalSpent: 5000,
    breakdown: {
      materials: [],
      labor: [
        { worker: 'Safai Sewa Emergency Service', workerHi: 'सफाई सेवा आपातकालीन', days: 1, ratePerDay: 5000, total: 5000 },
      ],
    },
    timeline: [
      { date: new Date('2024-01-11'), event: 'Emergency Budget Allocated', eventHi: 'आपातकालीन बजट आवंटित', amount: 5000 },
      { date: new Date('2024-01-12'), event: 'Service Completed', eventHi: 'सेवा पूर्ण', amount: -5000 },
    ],
    remainingBalance: 0,
    status: 'completed'
  }
];

// Village overall budget summary
export const villageBudgetSummary = {
  village: 'Rampur',
  villageHi: 'रामपुर',
  financialYear: '2024-25',
  totalAllocated: 5000000, // 50 Lakhs
  totalSpent: 987500,
  categories: {
    infrastructure: { allocated: 1500000, spent: 350000 },
    water: { allocated: 800000, spent: 125000 },
    electricity: { allocated: 600000, spent: 45000 },
    education: { allocated: 1200000, spent: 250000 },
    hygiene: { allocated: 500000, spent: 150000 },
    environment: { allocated: 300000, spent: 50000 },
    other: { allocated: 100000, spent: 17500 },
  },
  fundSources: [
    { source: 'Government Grant', sourceHi: 'सरकारी अनुदान', amount: 3500000, percentage: 70 },
    { source: 'MGNREGA', sourceHi: 'मनरेगा', amount: 1000000, percentage: 20 },
    { source: 'State Development Fund', sourceHi: 'राज्य विकास कोष', amount: 500000, percentage: 10 },
  ],
  utilizationRate: 19.75, // (totalSpent / totalAllocated) * 100
  lastUpdated: new Date('2024-01-24'),
};

// Contractor performance records
export const contractorRecords = [
  {
    id: 'contractor-001',
    name: 'Shyam Plumbing Services',
    nameHi: 'श्याम प्लम्बिंग सर्विसेज',
    aadhaar: 'XXXX-XXXX-5566',
    contact: '+91-9988776655',
    specialization: 'Plumbing & Water Works',
    specializationHi: 'प्लम्बिंग और जल कार्य',
    completedProjects: 8,
    ongoingProjects: 1,
    rating: 4.2,
    totalEarned: 125000,
    joinedDate: new Date('2023-04-15'),
  },
  {
    id: 'contractor-002',
    name: 'Kumar Construction',
    nameHi: 'कुमार कंस्ट्रक्शन',
    aadhaar: 'XXXX-XXXX-1122',
    contact: '+91-9955443322',
    specialization: 'Building & Construction',
    specializationHi: 'भवन और निर्माण',
    completedProjects: 15,
    ongoingProjects: 1,
    rating: 4.5,
    totalEarned: 850000,
    joinedDate: new Date('2022-08-10'),
  },
  {
    id: 'contractor-003',
    name: 'Bijli Seva Kendra',
    nameHi: 'बिजली सेवा केंद्र',
    aadhaar: 'XXXX-XXXX-7788',
    contact: '+91-9977665544',
    specialization: 'Electrical Works',
    specializationHi: 'विद्युत कार्य',
    completedProjects: 12,
    ongoingProjects: 1,
    rating: 4.0,
    totalEarned: 320000,
    joinedDate: new Date('2023-01-20'),
  },
  {
    id: 'contractor-004',
    name: 'Safai Sewa Samiti',
    nameHi: 'सफाई सेवा समिति',
    aadhaar: 'XXXX-XXXX-9988',
    contact: '+91-9966554433',
    specialization: 'Sanitation & Waste Management',
    specializationHi: 'स्वच्छता और कचरा प्रबंधन',
    completedProjects: 25,
    ongoingProjects: 0,
    rating: 4.3,
    totalEarned: 180000,
    joinedDate: new Date('2022-11-05'),
  },
  {
    id: 'contractor-005',
    name: 'Ramesh Repairs',
    nameHi: 'रमेश रिपेयर्स',
    aadhaar: 'XXXX-XXXX-3344',
    contact: '+91-9944332211',
    specialization: 'General Repairs & Maintenance',
    specializationHi: 'सामान्य मरम्मत और रखरखाव',
    completedProjects: 18,
    ongoingProjects: 1,
    rating: 3.9,
    totalEarned: 95000,
    joinedDate: new Date('2023-03-12'),
  },
];

// Helper functions
export const getBudgetByComplaintId = (complaintId) => {
  return demoBudget.find(budget => budget.complaintId === complaintId);
};

export const getContractorById = (id) => {
  return contractorRecords.find(contractor => contractor.id === id);
};

export const getTotalMaterialsCost = (budget) => {
  if (!budget || !budget.breakdown || !budget.breakdown.materials) return 0;
  return budget.breakdown.materials.reduce((sum, material) => sum + material.cost, 0);
};

export const getTotalLaborCost = (budget) => {
  if (!budget || !budget.breakdown || !budget.breakdown.labor) return 0;
  return budget.breakdown.labor.reduce((sum, labor) => sum + labor.total, 0);
};

export const getBudgetUtilizationPercentage = (budget) => {
  if (!budget || budget.totalAllocated === 0) return 0;
  return ((budget.totalSpent / budget.totalAllocated) * 100).toFixed(2);
};

export const getVillageUtilizationRate = () => {
  return villageBudgetSummary.utilizationRate.toFixed(2);
};

export const formatCurrency = (amount, language = 'en') => {
  if (language === 'hi') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
