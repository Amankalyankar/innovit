// Mock API functions for GRAM-SABHA
// These simulate backend API calls with demo data
// Easy to replace with actual API calls later

import { authenticateUser, demoUsers, getUsersByRole } from '../data/demoUsers.js';
import { demoComplaints, getComplaintsByVillager, getComplaintStats } from '../data/demoComplaints.js';
import { demoBudget, contractorRecords, villageBudgetSummary } from '../data/demoBudget.js';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ============ AUTHENTICATION ============

export const login = async (username, password) => {
  await delay(800);
  const  user = authenticateUser(username, password);
  if (user) {
    // Store in localStorage (simulating session)
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const logout = async () => {
  await delay(300);
  localStorage.removeItem('currentUser');
  return { success: true };
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// ============ COMPLAINTS ============

export const fetchComplaints = async (filters = {}) => {
  await delay(600);
  let complaints = [...demoComplaints];
  
  // Apply filters
  if (filters.status) {
    complaints = complaints.filter(c => c.status === filters.status);
  }
  if (filters.category) {
    complaints = complaints.filter(c => c.category === filters.category);
  }
  if (filters.villagerId) {
    complaints = complaints.filter(c => c.submittedBy === filters.villagerId);
  }
  
  // Sort by date (newest first)
  complaints.sort((a, b) => b.createdAt - a.createdAt);
  
  return { success: true, data: complaints };
};

export const fetchComplaintById = async (id) => {
  await delay(400);
  const complaint = demoComplaints.find(c => c.id === id);
  if (complaint) {
    return { success: true, data: complaint };
  }
  return { success: false, error: 'Complaint not found' };
};

export const submitComplaint = async (complaintData) => {
  await delay(1000);
  // In real app, this would POST to backend
  const newComplaint = {
    id: `complaint-${Date.now()}`,
    ...complaintData,
    status: 'SUBMITTED',
    votes: 0,
    votedBy: [],
    createdAt: new Date(),
  };
  demoComplaints.unshift(newComplaint);
  return { success: true, data: newComplaint };
};

export const voteOnComplaint = async (complaintId, userId) => {
  await delay(500);
  const complaint = demoComplaints.find(c => c.id === complaintId);
  if (!complaint) {
    return { success: false, error: 'Complaint not found' };
  }
  
  // Check if user already voted
  if (complaint.votedBy.includes(userId)) {
    return { success: false, error: 'Already voted' };
  }
  
  // Add vote
  complaint.votes += 1;
  complaint.votedBy.push(userId);
  
  // Auto-escalate if threshold reached (50 votes)
  if (complaint.votes >= 50 && complaint.status === 'UNDER_VOTING') {
    complaint.status = 'ESCALATED';
  }
  
  return { success: true, data: complaint };
};

export const fetchComplaintStats = async () => {
  await delay(400);
  return { success: true, data: getComplaintStats() };
};

// ============ SARPANCH ACTIONS ============

export const assignContractor = async (complaintId, contractorData, budgetData) => {
  await delay(800);
  const complaint = demoComplaints.find(c => c.id === complaintId);
  if (!complaint) {
    return { success: false, error: 'Complaint not found' };
  }
  
  complaint.contractor = contractorData;
  complaint.estimatedCost = budgetData.amount;
  complaint.status = 'ASSIGNED';
  complaint.progress = {
    percentage: 0,
    updates: [
      { 
        date: new Date(), 
        message: 'Contractor assigned', 
        messageHi: 'ठेकेदार नियुक्त' 
      }
    ]
  };
  
  return { success: true, data: complaint };
};

export const updateComplaintProgress = async (complaintId, progressData) => {
  await delay(600);
  const complaint = demoComplaints.find(c => c.id === complaintId);
  if (!complaint) {
    return { success: false, error: 'Complaint not found' };
  }
  
  if (!complaint.progress) {
    complaint.progress = { percentage: 0, updates: [] };
  }
  
  complaint.progress.percentage = progressData.percentage;
  complaint.progress.updates.push({
    date: new Date(),
    message: progressData.message,
    messageHi: progressData.messageHi || progressData.message
  });
  
  if (progressData.percentage >= 100) {
    complaint.status = 'COMPLETED';
  } else if (complaint.status === 'ASSIGNED') {
    complaint.status = 'IN_PROGRESS';
  }
  
  return { success: true, data: complaint };
};

export const resolveComplaint = async (complaintId) => {
  await delay(500);
  const complaint = demoComplaints.find(c => c.id === complaintId);
  if (!complaint) {
    return { success: false, error: 'Complaint not found' };
  }
  
  complaint.status = 'RESOLVED';
  if (complaint.progress) {
    complaint.progress.percentage = 100;
  }
  
  return { success: true, data: complaint };
};

// ============ BUDGET & TRANSPARENCY ============

export const fetchBudgetData = async (complaintId) => {
  await delay(500);
  if (complaintId) {
    const budget = demoBudget.find(b => b.complaintId === complaintId);
    return { success: true, data: budget || null };
  }
  return { success: true, data: demoBudget };
};

export const fetchVillageBudgetSummary = async () => {
  await delay(600);
  return { success: true, data: villageBudgetSummary };
};

export const fetchContractors = async () => {
  await delay(400);
  return { success: true, data: contractorRecords };
};

export const fetchContractorById = async (id) => {
  await delay(300);
  const contractor = contractorRecords.find(c => c.id === id);
  if (contractor) {
    return { success: true, data: contractor };
  }
  return { success: false, error: 'Contractor not found' };
};

// ============ ADMIN ACTIONS ============

export const fetchAllUsers = async (role = null) => {
  await delay(500);
  if (role) {
    const users = getUsersByRole(role);
    return { success: true, data: users };
  }
  return { success: true, data: demoUsers };
};

export const updateUserRole = async (userId, newRole) => {
  await delay(400);
  const user = demoUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  user.role = newRole;
  return { success: true, data: user };
};

export const approveUser = async (userId) => {
  await delay(400);
  const user = demoUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  user.verified = true;
  return { success: true, data: user };
};

// ============ STATS & ANALYTICS ============

export const fetchDashboardStats = async (role, userId) => {
  await delay(700);
  
  if (role === 'villager') {
    const userComplaints = getComplaintsByVillager(userId);
    const stats = getComplaintStats();
    return {
      success: true,
      data: {
        myComplaints: userComplaints.length,
        activeVotes: userComplaints.filter(c => c.status === 'UNDER_VOTING').length,
        resolved: userComplaints.filter(c => c.status === 'RESOLVED').length,
        totalCommunityComplaints: stats.total,
        recentActivity: demoComplaints.slice(0, 5)
      }
    };
  }
  
  if (role === 'sarpanch') {
    const stats = getComplaintStats();
    return {
      success: true,
      data: {
        pendingReview: stats.byStatus.escalated + stats.byStatus.underReview,
        inProgress: stats.byStatus.assigned + stats.byStatus.inProgress,
        resolved: stats.byStatus.resolved,
        budgetUtilization: villageBudgetSummary.utilizationRate,
        criticalIssues: stats.byPriority.critical
      }
    };
  }
  
  if (role === 'admin') {
    const stats = getComplaintStats();
    return {
      success: true,
      data: {
        totalUsers: demoUsers.length,
        totalComplaints: stats.total,
        activeComplaints: stats.byStatus.escalated + stats.byStatus.inProgress,
        platformHealth: 'Good',
        villages: 1
      }
    };
  }
  
  return { success: false, error: 'Invalid role' };
};

export default {
  login,
  logout,
  getCurrentUser,
  fetchComplaints,
  fetchComplaintById,
  submitComplaint,
  voteOnComplaint,
  fetchComplaintStats,
  assignContractor,
  updateComplaintProgress,
  resolveComplaint,
  fetchBudgetData,
  fetchVillageBudgetSummary,
  fetchContractors,
  fetchContractorById,
  fetchAllUsers,
  updateUserRole,
  approveUser,
  fetchDashboardStats,
};
