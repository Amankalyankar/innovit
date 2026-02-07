/* =====================================================
   GRAM-SABHA Authentication & Demo Data System
   ===================================================== */

// Demo Users Database
const DEMO_USERS = {
    '9876543210': {
        id: 'VLG-2024-0001',
        name: 'Ravi Kumar',
        nameHindi: 'रवि कुमार',
        role: 'villager',
        roleName: 'Villager',
        roleNameHindi: 'ग्रामवासी',
        mobile: '9876543210',
        aadhaar: '****4521',
        village: 'Rampur',
        ward: 'Ward 4',
        pin: '1234',
        avatar: 'RK',
        verified: true,
        redirectUrl: 'villager-dashboard.html'
    },
    '9876543211': {
        id: 'SAR-2024-0892',
        name: 'Ramesh Kumar',
        nameHindi: 'रमेश कुमार',
        role: 'sarpanch',
        roleName: 'Sarpanch',
        roleNameHindi: 'सरपंच',
        mobile: '9876543211',
        aadhaar: '****8892',
        village: 'Rampur',
        district: 'Jaipur',
        pin: '1234',
        avatar: 'RK',
        verified: true,
        redirectUrl: 'sarpanch-portal.html'
    },
    '9876543212': {
        id: 'ADM-2024-0012',
        name: 'Priya Sharma',
        nameHindi: 'प्रिया शर्मा',
        role: 'admin',
        roleName: 'System Administrator',
        roleNameHindi: 'सिस्टम व्यवस्थापक',
        mobile: '9876543212',
        aadhaar: '****1234',
        department: 'District HQ',
        level: 'District',
        pin: '1234',
        avatar: 'PS',
        verified: true,
        redirectUrl: 'admin-panel.html'
    }
};

// Demo Village Data
const VILLAGE_DATA = {
    name: 'Rampur',
    nameHindi: 'रामपुर',
    district: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    population: 4521,
    households: 892,
    sarpanch: 'Ramesh Kumar',
    panchayatCode: 'RJ-JP-RMP-001'
};

// Demo Issues Data
const ISSUES_DATA = [
    {
        id: 'ISS-2024-0892',
        title: 'Repair Broken Pump - Ward 4',
        titleHindi: 'वार्ड 4 में टूटा हुआ पंप ठीक करें',
        description: 'The pump near Hanuman Temple is leaking. 50 families have no water.',
        category: 'water',
        categoryName: 'Water Supply',
        status: 'reviewing',
        statusName: 'Under Review',
        priority: 'urgent',
        department: 'Water Dept',
        reportedBy: 'Ravi Kumar',
        reportedDate: '2024-02-05',
        votes: 142,
        userVoted: false,
        location: 'Near Hanuman Temple, Ward 4'
    },
    {
        id: 'ISS-2024-0845',
        title: 'New Concrete Road - School Path',
        titleHindi: 'स्कूल रास्ते पर नई कंक्रीट सड़क',
        description: 'Laying 500m of concrete road to make it easier for children during rain.',
        category: 'roads',
        categoryName: 'Roads & Paths',
        status: 'in-progress',
        statusName: 'Work In Progress',
        priority: 'medium',
        department: 'Public Works',
        reportedBy: 'Kamla Devi',
        reportedDate: '2024-01-28',
        votes: 256,
        userVoted: true,
        progress: 65,
        contractor: 'Sharma Constructions'
    },
    {
        id: 'ISS-2024-0721',
        title: 'Street Light Installation - Ward 2',
        titleHindi: 'वार्ड 2 में स्ट्रीट लाइट लगाना',
        description: 'Install 12 new LED street lights on main road.',
        category: 'electricity',
        categoryName: 'Electricity',
        status: 'approved',
        statusName: 'Approved',
        priority: 'normal',
        department: 'Electricity Dept',
        reportedBy: 'Mohan Lal',
        reportedDate: '2024-01-15',
        votes: 89,
        userVoted: true,
        estimatedCost: 42000
    }
];

// Demo Budget Data
const BUDGET_DATA = {
    totalReceived: 4280000,
    totalSpent: 3425000,
    pendingApproval: 455000,
    available: 400000,
    fiscalYear: 'FY 2024-25',
    lastUpdated: '2 hours ago',
    projects: [
        {
            id: 'PRJ-2024-1089',
            name: 'Ward 4 Water Pipeline Extension',
            sanctioned: 350000,
            released: 245000,
            spent: 212500,
            progress: 72,
            status: 'in-progress',
            contractor: 'Sharma Constructions',
            startDate: '2024-01-15',
            deadline: '2024-03-15',
            verifications: {
                photos: true,
                gps: true,
                community: false,
                audit: false
            }
        },
        {
            id: 'PRJ-2024-0892',
            name: 'Primary School Boundary Wall',
            sanctioned: 185000,
            released: 185000,
            spent: 182400,
            progress: 100,
            status: 'verified',
            contractor: 'Devi Construction',
            startDate: '2024-01-01',
            completedDate: '2024-02-28',
            verifications: {
                photos: true,
                gps: true,
                community: true,
                audit: true
            }
        }
    ]
};

// Demo Activity/Transaction Data
const ACTIVITY_DATA = [
    {
        id: 'ACT-001',
        type: 'payment',
        title: 'Payment Released to Contractor',
        description: '₹85,000 released to Sharma Constructions for pipeline work',
        timestamp: 'Today, 11:30 AM',
        reference: 'PFMS Ref: #PF2024-89012',
        icon: 'payments'
    },
    {
        id: 'ACT-002',
        type: 'approval',
        title: 'Sarpanch Approval Received',
        description: 'Street lighting project for Ward 2 approved for fund release',
        timestamp: 'Yesterday, 4:15 PM',
        reference: 'Approved by: Ramesh Kumar (Sarpanch)',
        icon: 'task_alt'
    },
    {
        id: 'ACT-003',
        type: 'verification',
        title: 'Work Verification Complete',
        description: 'School boundary wall project passed all verification checks',
        timestamp: '2 days ago',
        reference: 'AI + Community Verification',
        icon: 'verified'
    }
];

// Session Management
const SESSION_KEY = 'gram_sabha_session';

function saveSession(user) {
    const session = {
        ...user,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    
    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
        clearSession();
        return null;
    }
    
    return session;
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
    return getSession() !== null;
}

function getCurrentUser() {
    return getSession();
}

function requireAuth(allowedRoles = null) {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their correct dashboard
        window.location.href = user.redirectUrl;
        return null;
    }
    
    return user;
}

function logout() {
    clearSession();
    window.location.href = 'index.html';
}

// Role Detection
function detectRole(userId) {
    const roleDetection = document.getElementById('roleDetection');
    const roleIcon = document.getElementById('roleIcon');
    const roleName = document.getElementById('roleName');
    const roleDesc = document.getElementById('roleDesc');
    
    if (!roleDetection) return;
    
    const user = DEMO_USERS[userId];
    
    if (user) {
        roleDetection.className = `role-detection show ${user.role}`;
        
        const icons = {
            villager: 'person',
            sarpanch: 'gavel',
            admin: 'admin_panel_settings',
            csc: 'storefront'
        };
        
        const redirectPages = {
            villager: 'Villager Dashboard',
            sarpanch: 'Sarpanch Portal',
            admin: 'Admin Panel',
            csc: 'CSC Portal'
        };
        
        roleIcon.textContent = icons[user.role];
        roleName.textContent = `${user.roleName} Account Detected`;
        roleDesc.textContent = `You'll be redirected to ${redirectPages[user.role]}`;
    } else {
        roleDetection.classList.remove('show');
    }
}

// Demo Auto-fill
function fillDemo(mobile, pin, role) {
    document.getElementById('userId').value = mobile;
    document.getElementById('password').value = pin;
    detectRole(mobile);
}

// Password Toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = 'visibility';
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value.trim();
    const password = document.getElementById('password').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const userIdError = document.getElementById('userIdError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset errors
    userIdError.classList.remove('show');
    passwordError.classList.remove('show');
    document.getElementById('userId').classList.remove('error');
    document.getElementById('password').classList.remove('error');
    
    // Validate
    if (userId.length < 10) {
        document.getElementById('userId').classList.add('error');
        userIdError.classList.add('show');
        return;
    }
    
    const user = DEMO_USERS[userId];
    
    if (!user) {
        document.getElementById('userId').classList.add('error');
        userIdError.textContent = 'User not found. Please check your credentials.';
        userIdError.classList.add('show');
        return;
    }
    
    if (password !== user.pin) {
        document.getElementById('password').classList.add('error');
        passwordError.classList.add('show');
        return;
    }
    
    // Show loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save session
        saveSession(user);
        
        // Redirect to appropriate dashboard
        window.location.href = user.redirectUrl;
    }, 1500);
}

// Biometric Login Handler
function handleBiometric() {
    showNotification('Biometric authentication is simulated. Logging in as Villager...', 'info');
    
    setTimeout(() => {
        const user = DEMO_USERS['9876543210']; // Default to villager
        saveSession(user);
        window.location.href = user.redirectUrl;
    }, 2000);
}

// Notification System (if not loaded)
if (typeof showNotification !== 'function') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#1e293b'};
            color: white;
            border-radius: 0.75rem;
            font-weight: 600;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Format Currency Helper
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Format Date Helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Get Time Greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
}

// Export for use in other pages
window.GramSabha = {
    DEMO_USERS,
    VILLAGE_DATA,
    ISSUES_DATA,
    BUDGET_DATA,
    ACTIVITY_DATA,
    saveSession,
    getSession,
    clearSession,
    isLoggedIn,
    getCurrentUser,
    requireAuth,
    logout,
    detectRole,
    fillDemo,
    formatCurrency,
    formatDate,
    getGreeting,
    showNotification
};

// Login method toggle
document.addEventListener('DOMContentLoaded', function() {
    const methodBtns = document.querySelectorAll('.login-method-btn');
    
    methodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            methodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.dataset.method;
            const input = document.getElementById('userId');
            const icon = document.querySelector('.form-icon');
            
            if (method === 'aadhaar') {
                input.placeholder = 'Enter 12-digit Aadhaar number';
                input.maxLength = 12;
                icon.textContent = 'badge';
            } else {
                input.placeholder = 'Enter mobile or Aadhaar number';
                input.maxLength = 12;
                icon.textContent = 'phone_android';
            }
        });
    });
});

console.log('🏛️ GRAM-SABHA Auth System Loaded');
console.log('📋 Demo Users:', Object.keys(DEMO_USERS).join(', '));
