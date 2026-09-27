// AnnaSetu Rich Mock Dataset (SIH 2026 Prototype)

export const MOCK_KITCHENS = [
  {
    id: 'k1',
    name: 'Taj Palace Hotel & Convention',
    type: '5-Star Hotel Kitchen',
    location: 'Chanakyapuri, New Delhi',
    coords: { x: 48, y: 42 },
    dailyAvgSurplusKg: 65,
    monthlySavingsRs: 28400,
    forecastAccuracy: 94.2,
    activePickups: 2,
    chefInCharge: 'Chef Vikramaditya',
    fssaiLicense: '10019011005829'
  },
  {
    id: 'k2',
    name: 'IIT Delhi Main Hostel Mess',
    type: 'Institutional Mess',
    location: 'Hauz Khas, New Delhi',
    coords: { x: 35, y: 65 },
    dailyAvgSurplusKg: 120,
    monthlySavingsRs: 42100,
    forecastAccuracy: 92.8,
    activePickups: 1,
    chefInCharge: 'Manager Rajesh Kumar',
    fssaiLicense: '20018012003910'
  },
  {
    id: 'k3',
    name: 'Max Super Speciality Hospital Canteen',
    type: 'Healthcare Catering Facility',
    location: 'Saket, New Delhi',
    coords: { x: 55, y: 75 },
    dailyAvgSurplusKg: 40,
    monthlySavingsRs: 19500,
    forecastAccuracy: 95.1,
    activePickups: 0,
    chefInCharge: 'Nutrition Lead Meena Sharma',
    fssaiLicense: '10020013009412'
  },
  {
    id: 'k4',
    name: 'Grand Sapphire Banquet Hall',
    type: 'Event & Wedding Venue',
    location: 'Aerocity, New Delhi',
    coords: { x: 25, y: 50 },
    dailyAvgSurplusKg: 180,
    monthlySavingsRs: 64000,
    forecastAccuracy: 91.5,
    activePickups: 3,
    chefInCharge: 'Master Chef Sunil Grover',
    fssaiLicense: '10017014002819'
  }
];

export const MOCK_NGOS = [
  {
    id: 'ngo-1',
    name: 'Sunrise Foundation Shelter',
    category: 'Child & Community Kitchen',
    distanceKm: 1.2,
    etaMins: 8,
    mealCapacity: 250,
    neededNow: 140,
    reliabilityScore: 99,
    vehicle: 'Refrigerated EV Van',
    contactPerson: 'Anjali Deshmukh',
    phone: '+91 98765 43210',
    coords: { x: 52, y: 38 },
    address: 'Safdarjung Enclave, Sector 3, Delhi'
  },
  {
    id: 'ngo-2',
    name: 'Robin Hood Army - South Hub',
    category: 'Volunteer Food Rescuers',
    distanceKm: 2.4,
    etaMins: 14,
    mealCapacity: 400,
    neededNow: 220,
    reliabilityScore: 98,
    vehicle: 'E-Rickshaw Fleet (3 units)',
    contactPerson: 'Karan Malhotra',
    phone: '+91 98112 34567',
    coords: { x: 42, y: 48 },
    address: 'Green Park Market Rear Annex, Delhi'
  },
  {
    id: 'ngo-3',
    name: 'Feeding India by Zomato',
    category: 'Rapid Relief Network',
    distanceKm: 3.8,
    etaMins: 19,
    mealCapacity: 600,
    neededNow: 350,
    reliabilityScore: 97,
    vehicle: 'Temp-Controlled Insulated Truck',
    contactPerson: 'Siddharth Rao',
    phone: '+91 99001 12233',
    coords: { x: 62, y: 52 },
    address: 'Okhla Industrial Area Phase II, Delhi'
  },
  {
    id: 'ngo-4',
    name: 'Akshaya Patra Relief Cell',
    category: 'School & Evening Shelter',
    distanceKm: 5.1,
    etaMins: 24,
    mealCapacity: 800,
    neededNow: 500,
    reliabilityScore: 99,
    vehicle: 'Heavy Duty Insulated Van',
    contactPerson: 'Dr. Suresh Varma',
    phone: '+91 97110 99887',
    coords: { x: 30, y: 70 },
    address: 'Lajpat Nagar IV Community Center, Delhi'
  },
  {
    id: 'ngo-5',
    name: 'Grace Community Night Shelter',
    category: 'Homeless Welfare Trust',
    distanceKm: 6.5,
    etaMins: 28,
    mealCapacity: 180,
    neededNow: 110,
    reliabilityScore: 95,
    vehicle: '3-Wheel Cargo Bike',
    contactPerson: 'Sister Mary Joseph',
    phone: '+91 98998 77665',
    coords: { x: 68, y: 30 },
    address: 'Lodhi Road Night Complex, Delhi'
  }
];

export const MOCK_BIO_PROCESSORS = [
  {
    id: 'bio-1',
    name: 'GreenEnergy Bio-CNG Hub #4',
    type: 'Anaerobic Bio-CNG & Bio-Fertilizer Plant',
    distanceKm: 8.4,
    capacityTonnesDay: 25,
    co2ePerKg: 2.5, // 2.5kg CO2e avoided per kg food waste diverted
    biomassPayoutRate: 2.2, // ₹2.2 / kg payout to kitchen
    address: 'Okhla Waste Management Complex',
    status: 'ACTIVE_ACCEPTING'
  },
  {
    id: 'bio-2',
    name: 'EcoCompost Organic Farming Co-op',
    type: 'Aerobic High-Speed Composting Facility',
    distanceKm: 11.2,
    capacityTonnesDay: 15,
    co2ePerKg: 1.8,
    biomassPayoutRate: 1.5,
    address: 'Najafgarh Agricultural Belt',
    status: 'ACTIVE_ACCEPTING'
  },
  {
    id: 'bio-3',
    name: 'Black Soldier Fly Protein Farm (BSFL)',
    type: 'Insect Protein & Livestock Feed Facility',
    distanceKm: 14.0,
    capacityTonnesDay: 10,
    co2ePerKg: 3.1,
    biomassPayoutRate: 3.0,
    address: 'Greater Noida Eco-Tech Zone 4',
    status: 'ACTIVE_ACCEPTING'
  }
];

export const INITIAL_SURPLUS_ITEMS = [
  {
    id: 'SUR-8942',
    timestamp: 'Today, 13:45 PM',
    kitchenId: 'k1',
    kitchenName: 'Taj Palace Hotel & Convention',
    foodType: 'Paneer Butter Masala & Steamed Basmati Rice',
    category: 'Cooked Gravy & Staples',
    quantityKg: 38,
    estimatedPlates: 125,
    prepTime: 'Today, 11:30 AM',
    ambientTemp: '24°C',
    hotHoldTemp: '68°C',
    photoUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    freshnessScore: 94,
    verdict: 'EDIBLE',
    status: 'Edible-Matched',
    assignedNgo: 'Sunrise Foundation Shelter',
    matchedEta: '8 mins',
    fssaiDecayMinutesRemaining: 165, // ~2h 45m
    auditHash: '0x8f9a2b1c4e5d6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    qrCodeRef: 'AS-2026-FSSAI-89421',
    co2OffsetKg: 95.0
  },
  {
    id: 'SUR-8943',
    timestamp: 'Today, 14:10 PM',
    kitchenId: 'k1',
    kitchenName: 'Taj Palace Hotel & Convention',
    foodType: 'Dal Makhani & Tandoori Roti Batch',
    category: 'Lentils & Breads',
    quantityKg: 22,
    estimatedPlates: 75,
    prepTime: 'Today, 12:00 PM',
    ambientTemp: '26°C',
    hotHoldTemp: '65°C',
    photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    freshnessScore: 91,
    verdict: 'EDIBLE',
    status: 'Edible-Matched',
    assignedNgo: 'Robin Hood Army - South Hub',
    matchedEta: '14 mins',
    fssaiDecayMinutesRemaining: 180,
    auditHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    qrCodeRef: 'AS-2026-FSSAI-89422',
    co2OffsetKg: 55.0
  },
  {
    id: 'SUR-8940',
    timestamp: 'Today, 12:15 PM',
    kitchenId: 'k1',
    kitchenName: 'Taj Palace Hotel & Convention',
    foodType: 'Cut Melon & Dairy Dessert (High Risk Temp Excursion)',
    category: 'Perishable Dairy & Fruits',
    quantityKg: 28,
    estimatedPlates: 90,
    prepTime: 'Today, 07:30 AM',
    ambientTemp: '33°C',
    hotHoldTemp: '18°C (Cold chain broken)',
    photoUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    freshnessScore: 38,
    verdict: 'SPOILED',
    status: 'Spoiled-Routed',
    assignedProcessor: 'GreenEnergy Bio-CNG Hub #4',
    matchedEta: 'Collected for Bio-CNG',
    fssaiDecayMinutesRemaining: 0,
    auditHash: '0x99887766554433221100aabbccddeeff00112233',
    qrCodeRef: 'AS-2026-SWM-89400',
    co2OffsetKg: 70.0
  },
  {
    id: 'SUR-8938',
    timestamp: 'Yesterday, 22:30 PM',
    kitchenId: 'k4',
    kitchenName: 'Grand Sapphire Banquet Hall',
    foodType: 'Chicken Biryani & Mirchi Ka Salan',
    category: 'Cooked Non-Veg Staples',
    quantityKg: 85,
    estimatedPlates: 280,
    prepTime: 'Yesterday, 19:00 PM',
    ambientTemp: '22°C',
    hotHoldTemp: '70°C',
    photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    freshnessScore: 96,
    verdict: 'EDIBLE',
    status: 'Picked Up',
    assignedNgo: 'Feeding India by Zomato',
    matchedEta: 'Delivered',
    fssaiDecayMinutesRemaining: 0,
    auditHash: '0xaa11bb22cc33dd44ee55ff660011223344556677',
    qrCodeRef: 'AS-2026-FSSAI-89388',
    co2OffsetKg: 212.5
  }
];

export const FORECAST_CHART_DATA = [
  { day: 'Mon', date: 'Sep 21', actualPlates: 180, predictedPlates: 175, savedRs: 4800, context: 'Normal Business' },
  { day: 'Tue', date: 'Sep 22', actualPlates: 210, predictedPlates: 205, savedRs: 5600, context: 'Corporate Summit' },
  { day: 'Wed', date: 'Sep 23', actualPlates: 145, predictedPlates: 150, savedRs: 3900, context: 'Monsoon Rain Deficit' },
  { day: 'Thu', date: 'Sep 24', actualPlates: 260, predictedPlates: 252, savedRs: 7100, context: '2 Banquet Weddings' },
  { day: 'Fri', date: 'Sep 25', actualPlates: 195, predictedPlates: 198, savedRs: 5200, context: 'Weekend Spike' },
  { day: 'Sat', date: 'Sep 26', actualPlates: 310, predictedPlates: 300, savedRs: 8400, context: 'Mega Wedding Expo' },
  { day: 'Sun (Today)', date: 'Sep 27', actualPlates: 140, predictedPlates: 138, savedRs: 3800, context: 'AI Predicted Optimisation' }
];

export const MASTER_AUDIT_TRAIL = [
  {
    id: 'AUD-9011',
    timestamp: '2026-09-27 13:48:12 IST',
    kitchenName: 'Taj Palace Hotel & Convention',
    recipient: 'Sunrise Foundation Shelter (NGO)',
    foodType: 'Paneer Butter Masala & Rice (38 kg)',
    verdict: 'EDIBLE (Score: 94/100)',
    tempLog: 'Hot Hold 68°C',
    fssaiStatus: 'COMPLIANT (Sec 16 FSSAI-2019)',
    qrRef: 'AS-2026-FSSAI-89421',
    hash: '0x8f9a...8a9b'
  },
  {
    id: 'AUD-9010',
    timestamp: '2026-09-27 12:18:04 IST',
    kitchenName: 'Taj Palace Hotel & Convention',
    recipient: 'GreenEnergy Bio-CNG Hub #4',
    foodType: 'Cut Melon & Dessert (28 kg)',
    verdict: 'SPOILED (Score: 38/100)',
    tempLog: 'Ambient 33°C (Cold Chain Violation)',
    fssaiStatus: 'DIVERTED SWM-2016 RULES',
    qrRef: 'AS-2026-SWM-89400',
    hash: '0x9988...2333'
  },
  {
    id: 'AUD-9009',
    timestamp: '2026-09-26 22:45:50 IST',
    kitchenName: 'Grand Sapphire Banquet Hall',
    recipient: 'Feeding India by Zomato (NGO)',
    foodType: 'Chicken Biryani & Salan (85 kg)',
    verdict: 'EDIBLE (Score: 96/100)',
    tempLog: 'Hot Hold 70°C',
    fssaiStatus: 'COMPLIANT (Sec 16 FSSAI-2019)',
    qrRef: 'AS-2026-FSSAI-89388',
    hash: '0xaa11...6677'
  },
  {
    id: 'AUD-9008',
    timestamp: '2026-09-26 15:30:11 IST',
    kitchenName: 'IIT Delhi Main Hostel Mess',
    recipient: 'Robin Hood Army - South Hub',
    foodType: 'Rajma Chawal Batch (60 kg)',
    verdict: 'EDIBLE (Score: 92/100)',
    tempLog: 'Hot Hold 66°C',
    fssaiStatus: 'COMPLIANT (Sec 16 FSSAI-2019)',
    qrRef: 'AS-2026-FSSAI-89370',
    hash: '0x7766...1122'
  },
  {
    id: 'AUD-9007',
    timestamp: '2026-09-26 11:20:45 IST',
    kitchenName: 'Max Super Speciality Hospital',
    recipient: 'Black Soldier Fly Protein Farm',
    foodType: 'Vegetable Trimmings & Peel Waste (45 kg)',
    verdict: 'SPOILED (Score: 22/100)',
    tempLog: 'Prep Scrap Waste',
    fssaiStatus: 'DIVERTED SWM-2016 RULES',
    qrRef: 'AS-2026-SWM-89355',
    hash: '0x5544...9988'
  }
];

export const BEFORE_AFTER_COMPARISON = [
  {
    metric: 'Surplus Planning',
    traditional: 'Manual gut-feel estimation by kitchen staff based on past day sales',
    annasetu: 'AI Demand Forecast (>92% accuracy) trained on weather, events & calendar'
  },
  {
    metric: 'Food Quality Verification',
    traditional: 'Subjective smell & sight check by individual workers with zero log',
    annasetu: 'AI Vision & Thermal Scan grading against FSSAI 2-4 hr decay window'
  },
  {
    metric: 'NGO Matching Latency',
    traditional: 'Ad-hoc phone calls to local contacts; takes 2–4 hours (food often spoils)',
    annasetu: '<200ms Automated Geo-Matching to nearby verified NGOs with capacity'
  },
  {
    metric: 'Spoiled Waste Handling',
    traditional: 'Dumped into municipal wet waste; incurs ₹5,000–25,000/day SWM fines',
    annasetu: 'Automated diversion to Bio-CNG / BSFL; earns ₹1.5–3.0/kg biomass credit'
  },
  {
    metric: 'Compliance & Liability',
    traditional: 'No paper trail; high legal risk of food poisoning claims or audit fines',
    annasetu: '100% Digital FSSAI-2019 & SWM-2016 cryptographic QR handoff audit trail'
  }
];
