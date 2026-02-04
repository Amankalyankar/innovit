// Demo complaints/issues data for GRAM-SABHA

export const issueCategories = [
  { 
    id: 'water', 
    name: 'Water', 
    nameHi: 'पानी',
    icon: '💧',
    description: 'Water supply, quality, and irrigation issues',
    descriptionHi: 'जल आपूर्ति, गुणवत्ता और सिंचाई के मुद्दे'
  },
  { 
    id: 'environment', 
    name: 'Environment', 
    nameHi: 'पर्यावरण',
    icon: '🌳',
    description: 'Environmental conservation, pollution, tree plantation',
    descriptionHi: 'पर्यावरण संरक्षण, प्रदूषण, वृक्षारोपण'
  },
  { 
    id: 'electricity', 
    name: 'Electricity', 
    nameHi: 'बिजली',
    icon: '⚡',
    description: 'Power supply, outages, new connections',
    descriptionHi: 'बिजली आपूर्ति, कटौती, नए कनेक्शन'
  },
  { 
    id: 'network', 
    name: 'Network & WiFi', 
    nameHi: 'नेटवर्क और वाईफाई',
    icon: '📶',
    description: 'Mobile network, internet connectivity issues',
    descriptionHi: 'मोबाइल नेटवर्क, इंटरनेट कनेक्टिविटी के मुद्दे'
  },
  { 
    id: 'noise', 
    name: 'Noise', 
    nameHi: 'शोर',
    icon: '🔊',
    description: 'Noise pollution and disturbance complaints',
    descriptionHi: 'ध्वनि प्रदूषण और गड़बड़ी की शिकायतें'
  },
  { 
    id: 'education', 
    name: 'Education', 
    nameHi: 'शिक्षा',
    icon: '📚',
    description: 'School facilities, teacher availability, resources',
    descriptionHi: 'स्कूल की सुविधाएं, शिक्षकों की उपलब्धता, संसाधन'
  },
  { 
    id: 'hygiene', 
    name: 'Hygiene & Sanitation', 
    nameHi: 'स्वच्छता',
    icon: '🧹',
    description: 'Cleanliness, waste management, public toilets',
    descriptionHi: 'सफाई, कचरा प्रबंधन, सार्वजनिक शौचालय'
  },
  { 
    id: 'infrastructure', 
    name: 'Infrastructure', 
    nameHi: 'बुनियादी ढांचा',
    icon: '🏗️',
    description: 'Roads, buildings, public facilities',
    descriptionHi: 'सड़कें, इमारतें, सार्वजनिक सुविधाएं'
  },
];

export const complaintStatuses = {
  SUBMITTED: { name: 'Submitted', nameHi: 'प्रस्तुत', color: '#A8A29E' },
  UNDER_VOTING: { name: 'Under Voting', nameHi: 'मतदान में', color: '#D97642' },
  ESCALATED: { name: 'Escalated', nameHi: 'बढ़ाया गया', color: '#C9A961' },
  UNDER_REVIEW: { name: 'Under Review', nameHi: 'समीक्षाधीन', color: '#6B9976' },
  ASSIGNED: { name: 'Assigned', nameHi: 'सौंपा गया', color: '#4A7C59' },
  IN_PROGRESS: { name: 'In Progress', nameHi: 'प्रगति में', color: '#2E5A3C' },
  COMPLETED: { name: 'Completed', nameHi: 'पूर्ण', color: '#4A7C59' },
  RESOLVED: { name: 'Resolved', nameHi: 'हल हो गया', color: '#4A7C59' },
};

export const demoComplaints = [
  {
    id: 'complaint-001',
    title: 'Broken Hand Pump in Ward 1',
    titleHi: 'वार्ड 1 में टूटा हैंडपंप',
    description: 'The main hand pump in Ward 1 has been broken for 3 days. Over 50 families are affected and need to walk 1km for water.',
    descriptionHi: 'वार्ड 1 का मुख्य हैंडपंप 3 दिनों से टूटा है। 50 से अधिक परिवार प्रभावित हैं और पानी के लिए 1 किमी चलना पड़ता है।',
    category: 'water',
    status: 'IN_PROGRESS',
    submittedBy: 'villager-001',
    submittedByName: 'Ramesh Yadav',
    village: 'Rampur',
    mohalla: 'Ward 1',
    createdAt: new Date('2024-01-15'),
    votes: 47,
    votedBy: ['villager-001', 'villager-003', 'villager-006', 'villager-009'],
    priority: 'high',
    estimatedCost: 15000,
    contractor: {
      name: 'Shyam Plumbing Services',
      nameHi: 'श्याम प्लम्बिंग सर्विसेज',
      contact: '+91-9988776655',
      aadhaar: 'XXXX-XXXX-5566'
    },
    progress: {
      percentage: 65,
      updates: [
        { date: new Date('2024-01-16'), message: 'Contractor assigned', messageHi: 'ठेकेदार नियुक्त' },
        { date: new Date('2024-01-17'), message: 'Parts ordered', messageHi: 'पुर्जे मंगवाए' },
        { date: new Date('2024-01-19'), message: 'Work started - pump disassembled', messageHi: 'काम शुरू - पंप खोला गया' },
      ]
    }
  },
  {
    id: 'complaint-002',
    title: 'Potholes on Main Village Road',
    titleHi: 'मुख्य गांव की सड़क पर गड्ढे',
    description: 'Multiple large potholes on the main road near school. Dangerous for children and causing vehicle accidents.',
    descriptionHi: 'स्कूल के पास मुख्य सड़क पर कई बड़े गड्ढे। बच्चों के लिए खतरनाक और वाहन दुर्घटनाओं का कारण।',
    category: 'infrastructure',
    status: 'ESCALATED',
    submittedBy: 'villager-002',
    submittedByName: 'Geeta Sharma',
    village: 'Rampur',
    mohalla: 'Ward 2',
    createdAt: new Date('2024-01-18'),
    votes: 82,
    votedBy: ['villager-002', 'villager-004', 'villager-005', 'villager-008', 'villager-010'],
    priority: 'critical',
    estimatedCost: 85000,
    contractor: null,
    progress: null
  },
  {
    id: 'complaint-003',
    title: 'No Street Lights in Ward 3',
    titleHi: 'वार्ड 3 में कोई स्ट्रीट लाइट नहीं',
    description: 'All 8 street lights in Ward 3 are not working. Safety concern for women and elderly at night.',
    descriptionHi: 'वार्ड 3 में सभी 8 स्ट्रीट लाइट काम नहीं कर रही हैं। रात में महिलाओं और बुजुर्गों के लिए सुरक्षा चिंता।',
    category: 'electricity',
    status: 'ASSIGNED',
    submittedBy: 'villager-004',
    submittedByName: 'Priya Singh',
    village: 'Rampur',
    mohalla: 'Ward 3',
    createdAt: new Date('2024-01-20'),
    votes: 56,
    votedBy: ['villager-004', 'villager-007', 'villager-010'],
    priority: 'high',
    estimatedCost: 32000,
    contractor: {
      name: 'Bijli Seva Kendra',
      nameHi: 'बिजली सेवा केंद्र',
      contact: '+91-9977665544',
      aadhaar: 'XXXX-XXXX-7788'
    },
    progress: {
      percentage: 20,
      updates: [
        { date: new Date('2024-01-21'), message: 'Contractor assigned', messageHi: 'ठेकेदार नियुक्त' },
        { date: new Date('2024-01-22'), message: 'Site inspection completed', messageHi: 'साइट निरीक्षण पूरा' },
      ]
    }
  },
  {
    id: 'complaint-004',
    title: 'Garbage Not Collected for Week',
    titleHi: 'एक सप्ताह से कचरा एकत्र नहीं',
    description: 'Municipal garbage collection vehicle has not come for 7 days. Waste piling up near community center.',
    descriptionHi: 'नगरपालिका कचरा संग्रह वाहन 7 दिनों से नहीं आया। सामुदायिक केंद्र के पास कचरा जमा।',
    category: 'hygiene',
    status: 'RESOLVED',
    submittedBy: 'villager-005',
    submittedByName: 'Mohan Das',
    village: 'Rampur',
    mohalla: 'Ward 2',
    createdAt: new Date('2024-01-10'),
    votes: 38,
    votedBy: ['villager-005', 'villager-008'],
    priority: 'high',
    estimatedCost: 5000,
    contractor: {
      name: 'Safai Sewa Samiti',
      nameHi: 'सफाई सेवा समिति',
      contact: '+91-9966554433',
      aadhaar: 'XXXX-XXXX-9988'
    },
    progress: {
      percentage: 100,
      updates: [
        { date: new Date('2024-01-11'), message: 'Issue escalated to municipality', messageHi: 'नगरपालिका को मुद्दा प्रेषित' },
        { date: new Date('2024-01-12'), message: 'Garbage collected, regular schedule resumed', messageHi: 'कचरा एकत्र, नियमित कार्यक्रम फिर से शुरू' },
      ]
    }
  },
  {
    id: 'complaint-005',
    title: 'Poor Mobile Network Coverage',
    titleHi: 'कमजोर मोबाइल नेटवर्क कवरेज',
    description: 'Very weak mobile signal in Ward 1. Cannot make calls or use internet. Affecting business and emergencies.',
    descriptionHi: 'वार्ड 1 में बहुत कमजोर मोबाइल सिग्नल। कॉल या इंटरनेट नहीं चल पाता। व्यवसाय और आपातकाल को प्रभावित।',
    category: 'network',
    status: 'UNDER_VOTING',
    submittedBy: 'villager-006',
    submittedByName: 'Anita Verma',
    village: 'Rampur',
    mohalla: 'Ward 1',
    createdAt: new Date('2024-01-22'),
    votes: 23,
    votedBy: ['villager-006', 'villager-009'],
    priority: 'medium',
    estimatedCost: 0, // Requires telecom company intervention
    contractor: null,
    progress: null
  },
  {
    id: 'complaint-006',
    title: 'School Building Needs Repair',
    titleHi: 'स्कूल भवन की मरम्मत चाहिए',
    description: 'Primary school roof leaking during rain. Walls have cracks. Unsafe for 120 students.',
    descriptionHi: 'प्राथमिक विद्यालय की छत बारिश में टपकती है। दीवारों में दरारें। 120 छात्रों के लिए असुरक्षित।',
    category: 'education',
    status: 'IN_PROGRESS',
    submittedBy: 'villager-002',
    submittedByName: 'Geeta Sharma',
    village: 'Rampur',
    mohalla: 'Ward 2',
    createdAt: new Date('2024-01-12'),
    votes: 91,
    votedBy: ['villager-001', 'villager-002', 'villager-003', 'villager-004', 'villager-008', 'villager-010'],
    priority: 'critical',
    estimatedCost: 250000,
    contractor: {
      name: 'Kumar Construction',
      nameHi: 'कुमार कंस्ट्रक्शन',
      contact: '+91-9955443322',
      aadhaar: 'XXXX-XXXX-1122'
    },
    progress: {
      percentage: 40,
      updates: [
        { date: new Date('2024-01-14'), message: 'Budget approved from education fund', messageHi: 'शिक्षा कोष से बजट मंजूर' },
        { date: new Date('2024-01-16'), message: 'Contractor selected and work started', messageHi: 'ठेकेदार चुना और काम शुरू' },
        { date: new Date('2024-01-20'), message: 'Roof repair 50% complete', messageHi: 'छत मरम्मत 50% पूर्ण' },
      ]
    }
  },
  {
    id: 'complaint-007',
    title: 'Loudspeaker Noise Pollution',
    titleHi: 'लाउडस्पीकर ध्वनि प्रदूषण',
    description: 'Temple loudspeaker used at high volume early morning (4 AM). Disturbing sleep of elderly and children.',
    descriptionHi: 'मंदिर का लाउडस्पीकर सुबह 4 बजे तेज़ आवाज़ में। बुजुर्गों और बच्चों की नींद में खलल।',
    category: 'noise',
    status: 'UNDER_VOTING',
    submittedBy: 'villager-007',
    submittedByName: 'Lakhan Kumar',
    village: 'Rampur',
    mohalla: 'Ward 3',
    createdAt: new Date('2024-01-23'),
    votes: 18,
    votedBy: ['villager-007'],
    priority: 'medium',
    estimatedCost: 0,
    contractor: null,
    progress: null
  },
  {
    id: 'complaint-008',
    title: 'Illegal Tree Cutting',
    titleHi: 'अवैध पेड़ कटाई',
    description: '5 large trees cut near village pond without permission. Environmental damage and loss of shade.',
    descriptionHi: 'गांव के तालाब के पास 5 बड़े पेड़ बिना अनुमति काटे गए। पर्यावरण क्षति और छाया की हानि।',
    category: 'environment',
    status: 'ESCALATED',
    submittedBy: 'villager-010',
    submittedByName: 'Kavita Gupta',
    village: 'Rampur',
    mohalla: 'Ward 3',
    createdAt: new Date('2024-01-19'),
    votes: 64,
    votedBy: ['villager-001', 'villager-007', 'villager-009', 'villager-010'],
    priority: 'high',
    estimatedCost: 25000, // For new plantation
    contractor: null,
    progress: null
  },
  {
    id: 'complaint-009',
    title: 'Public Toilet Not Functional',
    titleHi: 'सार्वजनिक शौचालय काम नहीं कर रहा',
    description: 'Community toilet near bus stop has no water supply. Lock broken. Needs immediate repair.',
    descriptionHi: 'बस स्टॉप के पास सामुदायिक शौचालय में पानी की आपूर्ति नहीं। ताला टूटा। तत्काल मरम्मत चाहिए।',
    category: 'hygiene',
    status: 'ASSIGNED',
    submittedBy: 'villager-008',
    submittedByName: 'Rekha Devi',
    village: 'Rampur',
    mohalla: 'Ward 2',
    createdAt: new Date('2024-01-21'),
    votes: 41,
    votedBy: ['villager-005', 'villager-008'],
    priority: 'high',
    estimatedCost: 12000,
    contractor: {
      name: 'Ramesh Repairs',
      nameHi: 'रमेश रिपेयर्स',
      contact: '+91-9944332211',
      aadhaar: 'XXXX-XXXX-3344'
    },
    progress: {
      percentage: 10,
      updates: [
        { date: new Date('2024-01-22'), message: 'Contractor assigned for assessment', messageHi: 'मूल्यांकन के लिए ठेकेदार नियुक्त' },
      ]
    }
  },
  {
    id: 'complaint-010',
    title: 'Frequent Power Cuts',
    titleHi: 'बार-बार बिजली कटौती',
    description: 'Power outages 4-5 times daily in Ward 1. Each lasting 1-2 hours. Affecting businesses and students.',
    descriptionHi: 'वार्ड 1 में दिन में 4-5 बार बिजली कटौती। प्रत्येक 1-2 घंटे। व्यवसाय और छात्रों को प्रभावित।',
    category: 'electricity',
    status: 'UNDER_VOTING',
    submittedBy: 'villager-003',
    submittedByName: 'Suresh Patel',
    village: 'Rampur',
    mohalla: 'Ward 1',
    createdAt: new Date('2024-01-24'),
    votes: 35,
    votedBy: ['villager-001', 'villager-003', 'villager-006'],
    priority: 'high',
    estimatedCost: 0, // Electrical department issue
    contractor: null,
    progress: null
  }
];

// Helper functions
export const getComplaintById = (id) => {
  return demoComplaints.find(complaint => complaint.id === id);
};

export const getComplaintsByStatus = (status) => {
  return demoComplaints.filter(complaint => complaint.status === status);
};

export const getComplaintsByCategory = (category) => {
  return demoComplaints.filter(complaint => complaint.category === category);
};

export const getComplaintsByVillager = (villagerId) => {
  return demoComplaints.filter(complaint => complaint.submittedBy === villagerId);
};

export const getCategoryIcon = (categoryId) => {
  const category = issueCategories.find(cat => cat.id === categoryId);
  return category ? category.icon : '📋';
};

export const getCategoryName = (categoryId, language = 'en') => {
  const category = issueCategories.find(cat => cat.id === categoryId);
  if (!category) return categoryId;
  return language === 'hi' ? category.nameHi : category.name;
};

export const getStatusColor = (status) => {
  return complaintStatuses[status]?.color || '#A8A29E';
};

export const getStatusName = (status, language = 'en') => {
  const statusObj = complaintStatuses[status];
  if (!statusObj) return status;
  return language === 'hi' ? statusObj.nameHi : statusObj.name;
};

// Count complaints by various criteria
export const getComplaintStats = () => {
  return {
    total: demoComplaints.length,
    byStatus: {
      submitted: getComplaintsByStatus('SUBMITTED').length,
      underVoting: getComplaintsByStatus('UNDER_VOTING').length,
      escalated: getComplaintsByStatus('ESCALATED').length,
      underReview: getComplaintsByStatus('UNDER_REVIEW').length,
      assigned: getComplaintsByStatus('ASSIGNED').length,
      inProgress: getComplaintsByStatus('IN_PROGRESS').length,
      completed: getComplaintsByStatus('COMPLETED').length,
      resolved: getComplaintsByStatus('RESOLVED').length,
    },
    byPriority: {
      critical: demoComplaints.filter(c => c.priority === 'critical').length,
      high: demoComplaints.filter(c => c.priority === 'high').length,
      medium: demoComplaints.filter(c => c.priority === 'medium').length,
      low: demoComplaints.filter(c => c.priority === 'low').length,
    }
  };
};
