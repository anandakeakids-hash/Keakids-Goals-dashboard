import React, { useState, useEffect, useMemo } from 'react';
import { 
  Target, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Plus, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Trash2, 
  Lock, 
  Layers, 
  Search, 
  Filter, 
  RefreshCw,
  FileSpreadsheet,
  BookOpen,
  Cloud,
  Wifi,
  WifiOff,
  LogOut,
  UserCheck,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  Receipt,
  Download,
  GraduationCap
} from 'lucide-react';

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

const SYSTEM_USERS = [
  { id: 'admin', password: '123', name: 'System Admin', role: 'Admin' },
  { id: 'manager', password: '123', name: 'Mithun Sir (Manager)', role: 'Manager' },
  { id: 'emp1', password: '123', name: 'HR Executive (Employee)', role: 'Employee' },
  { id: 'director', password: '123', name: 'Managing Director / Sir', role: 'Director' }
];

const INITIAL_GOALS = [
  { id: 'GOAL-01', title: 'Human Resource Recruitment', expectedResult: 'Hire and onboard required employee for sales and marketing', finalDeadline: '2026-12-01', status: 'In Progress', notes: 'Recruitment workflow.' },
  { id: 'GOAL-02', title: 'Keakids Operation Checking', expectedResult: 'Execute operation audit and smooth setup', finalDeadline: '2026-11-12', status: 'In Progress', notes: 'Operational checkup.' },
  { id: 'GOAL-03', title: 'Educational Content Quality Evaluation', expectedResult: 'Review Physics chapter 7 creative questions and model tests', finalDeadline: '2026-11-25', status: 'In Progress', notes: 'Benchmarking content.' },
  { id: 'GOAL-04', title: 'BDJobs & Newspaper Ad Campaign', expectedResult: 'Publish job notices in Chittagong region via BDJobs & dailies', finalDeadline: '2026-11-20', status: 'In Progress', notes: 'Recruitment postings.' },
  { id: 'GOAL-05', title: 'Task Management Workflow Automation', expectedResult: 'Deploy web-based dashboard replacing manual Excel trackers', finalDeadline: '2026-11-30', status: 'In Progress', notes: 'Multi-role access.' },
  { id: 'GOAL-06', title: 'Payment Gateway & Platform Bug Fixes', expectedResult: 'Resolve model test payment flow and library navigation issues', finalDeadline: '2026-11-15', status: 'In Progress', notes: 'Bug documentation.' },
  { id: 'GOAL-07', title: 'Financial Audit & Expense Management', expectedResult: 'Track daily operational expenses and revenue streams', finalDeadline: '2026-12-10', status: 'In Progress', notes: 'Expense tracking.' }
];

const INITIAL_TASKS = [
  { id: 'T-001', goalId: 'GOAL-01', phase: 'Recruitment', task: 'Activate BDJobs subscription', assignedTo: 'Mithun Sir / HR Admin', startDate: '2026-11-05', deadline: '2026-11-05', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Confirm payment receipt', blocker: '', evidence: '' },
  { id: 'T-002', goalId: 'GOAL-01', phase: 'Recruitment', task: 'Collect official documents from Mithun Sir', assignedTo: 'Mithun Sir', startDate: '2026-11-05', deadline: '2026-11-06', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Receive signed requisition', blocker: '', evidence: '' },
  { id: 'T-003', goalId: 'GOAL-01', phase: 'Recruitment', task: 'Obtain budget confirmation', assignedTo: 'Finance', startDate: '2026-11-05', deadline: '2026-11-06', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Get email authorization', blocker: '', evidence: '' },
  { id: 'T-004', goalId: 'GOAL-01', phase: 'Recruitment', task: 'Publish BDJobs job post', assignedTo: 'HR Executive', startDate: '2026-11-06', deadline: '2026-11-07', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Make post live', blocker: '', evidence: '' },
  { id: 'T-005', goalId: 'GOAL-02', phase: 'Audit', task: 'Go through all operational things', assignedTo: 'Mithun Sir', startDate: '2026-11-04', deadline: '2026-11-06', closingDate: '', priority: 'High', status: 'In Progress', progress: 25, nextAction: 'Audit inventory', blocker: '', evidence: '' },
  { id: 'T-006', goalId: 'GOAL-02', phase: 'Audit', task: 'Verify workflow log save option', assignedTo: 'IT Support', startDate: '2026-11-04', deadline: '2026-11-08', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Ensure daily logs persist', blocker: '', evidence: '' },
  { id: 'T-007', goalId: 'GOAL-02', phase: 'Audit', task: 'Review team operational checklists', assignedTo: 'Manager', startDate: '2026-11-05', deadline: '2026-11-12', closingDate: '', priority: 'Medium', status: 'Not Started', progress: 0, nextAction: 'Checklist review', blocker: '', evidence: '' },
  { id: 'T-008', goalId: 'GOAL-03', phase: 'Content', task: 'Evaluate Physics chapter 7 creative questions', assignedTo: 'Content Team', startDate: '2026-11-08', deadline: '2026-11-15', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Review NCTB syllabus', blocker: '', evidence: '' },
  { id: 'T-009', goalId: 'GOAL-03', phase: 'Content', task: 'Benchmark against competing educational apps', assignedTo: 'Evaluation Lead', startDate: '2026-11-10', deadline: '2026-11-20', closingDate: '', priority: 'Medium', status: 'Not Started', progress: 0, nextAction: 'Prepare comparison matrix', blocker: '', evidence: '' },
  { id: 'T-010', goalId: 'GOAL-03', phase: 'Content', task: 'Publish model test story library updates', assignedTo: 'Content Admin', startDate: '2026-11-12', deadline: '2026-11-25', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Upload story library', blocker: '', evidence: '' },
  { id: 'T-011', goalId: 'GOAL-04', phase: 'Media', task: 'Collect quotations from 5 newspapers', assignedTo: 'Media Procurement', startDate: '2026-11-08', deadline: '2026-11-10', closingDate: '', priority: 'Medium', status: 'Not Started', progress: 0, nextAction: 'Contact dailies', blocker: '', evidence: '' },
  { id: 'T-012', goalId: 'GOAL-04', phase: 'Media', task: 'Calculate advertisement budget and obtain approval', assignedTo: 'HR Lead', startDate: '2026-11-10', deadline: '2026-11-11', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Submit budget matrix', blocker: '', evidence: '' },
  { id: 'T-013', goalId: 'GOAL-04', phase: 'Media', task: 'Create advertisement format', assignedTo: 'Graphics Designer', startDate: '2026-11-11', deadline: '2026-11-12', closingDate: '', priority: 'Medium', status: 'Not Started', progress: 0, nextAction: 'Design banner artwork', blocker: '', evidence: '' },
  { id: 'T-014', goalId: 'GOAL-04', phase: 'Media', task: 'Publish local newspaper advertisement in Chittagong', assignedTo: 'Media Coordinator', startDate: '2026-11-12', deadline: '2026-11-20', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Confirm ad release', blocker: '', evidence: '' },
  { id: 'T-015', goalId: 'GOAL-05', phase: 'System', task: 'Design web-based task management workflow', assignedTo: 'Tech Lead', startDate: '2026-11-01', deadline: '2026-11-10', closingDate: '', priority: 'High', status: 'Completed', progress: 100, nextAction: 'Deploy UI', blocker: '', evidence: '' },
  { id: 'T-016', goalId: 'GOAL-05', phase: 'System', task: 'Implement role-based access control', assignedTo: 'Developer', startDate: '2026-11-05', deadline: '2026-11-20', closingDate: '', priority: 'High', status: 'In Progress', progress: 50, nextAction: 'Test views', blocker: '', evidence: '' },
  { id: 'T-017', goalId: 'GOAL-05', phase: 'System', task: 'Integrate Firebase cloud sync', assignedTo: 'Developer', startDate: '2026-11-10', deadline: '2026-11-30', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Setup Firestore', blocker: '', evidence: '' },
  { id: 'T-018', goalId: 'GOAL-06', phase: 'Bugs', task: 'Document model test payment flow failures', assignedTo: 'Support Team', startDate: '2026-11-02', deadline: '2026-11-10', closingDate: '', priority: 'High', status: 'In Progress', progress: 70, nextAction: 'Log error codes', blocker: '', evidence: '' },
  { id: 'T-019', goalId: 'GOAL-06', phase: 'Bugs', task: 'Fix library navigation bugs on mobile app', assignedTo: 'App Developer', startDate: '2026-11-05', deadline: '2026-11-15', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Patch routing', blocker: '', evidence: '' },
  { id: 'T-020', goalId: 'GOAL-07', phase: 'Finance', task: 'Setup daily operational expense logging', assignedTo: 'HR Admin', startDate: '2026-11-04', deadline: '2026-11-08', closingDate: '', priority: 'High', status: 'Completed', progress: 100, nextAction: 'Test 7-day cards', blocker: '', evidence: '' },
  { id: 'T-021', goalId: 'GOAL-07', phase: 'Finance', task: 'Track transport and food allowances', assignedTo: 'Finance Lead', startDate: '2026-11-05', deadline: '2026-11-25', closingDate: '', priority: 'Medium', status: 'In Progress', progress: 30, nextAction: 'Review receipts', blocker: '', evidence: '' },
  { id: 'T-022', goalId: 'GOAL-07', phase: 'Finance', task: 'Generate monthly profit and loss summary', assignedTo: 'Director', startDate: '2026-11-20', deadline: '2026-12-10', closingDate: '', priority: 'High', status: 'Not Started', progress: 0, nextAction: 'Compile report', blocker: '', evidence: '' }
];

const INITIAL_DAILY_LOGS = [
  { id: 'LOG-T-001-D1', taskId: 'T-001', dayNumber: 1, date: '2026-11-05', employeeName: 'HR Admin', hoursSpent: 4, completedToday: 'Initiated BDJobs subscription payment request.', progressPct: 30, transportExp: 150, foodExp: 200, allowanceExp: 100, miscExp: 50, blocker: 'Awaiting Mithun Sir authorization', nextAction: 'Follow up on approval' }
];

const INITIAL_REVENUE_RECORDS = [];

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_auth_user');
    return saved ? JSON.parse(saved) : SYSTEM_USERS[0];
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [fbConfig, setFbConfig] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_fb_config');
    return saved ? JSON.parse(saved) : null;
  });
  const [dbInstance, setDbInstance] = useState(null);
  const [cloudStatus, setCloudStatus] = useState('Local Mode (Offline)');
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_daily_logs');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_LOGS;
  });
  const [revenueRecords, setRevenueRecords] = useState(() => {
    const saved = localStorage.getItem('adv_wtm_revenue');
    return saved ? JSON.parse(saved) : INITIAL_REVENUE_RECORDS;
  });

  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
  const [newRevenue, setNewRevenue] = useState({ date: new Date().toISOString().split('T')[0], source: 'Student Package Sale', packageName: 'Standard Model Test & Story Library', studentsCount: 1, unitPrice: 500, discount: 0, notes: '' });
  const [selectedGoalIdForWorkflow, setSelectedGoalIdForWorkflow] = useState('GOAL-01');
  const [selectedTaskIdForWorkflow, setSelectedTaskIdForWorkflow] = useState('T-001');
  const [goalFilter, setGoalFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isFirebaseConfigModalOpen, setIsFirebaseConfigModalOpen] = useState(false);
  const [configInput, setConfigInput] = useState({ apiKey: '', projectId: '' });

  const [newTask, setNewTask] = useState({ goalId: 'GOAL-01', phase: 'General Workflow', task: '', assignedTo: '', startDate: '', deadline: '', priority: 'High', nextAction: '' });
  const [newGoal, setNewGoal] = useState({ title: '', expectedResult: '', finalDeadline: '', notes: '' });

  const handleLogout = () => { localStorage.removeItem('adv_wtm_auth_user'); window.location.reload(); };

  useEffect(() => {
    if (fbConfig && fbConfig.projectId) {
      try {
        const app = initializeApp(fbConfig);
        const db = getFirestore(app);
        setDbInstance(db);
        setCloudStatus('Realtime Cloud Connected');
        onSnapshot(collection(db, 'goals'), (s) => { const l = []; s.forEach(d => l.push(d.data())); if (l.length > 0) setGoals(l); });
        onSnapshot(collection(db, 'tasks'), (s) => { const l = []; s.forEach(d => l.push(d.data())); if (l.length > 0) setTasks(l); });
        onSnapshot(collection(db, 'daily_logs'), (s) => { const l = []; s.forEach(d => l.push(d.data())); if (l.length > 0) setDailyLogs(l); });
        onSnapshot(collection(db, 'revenue'), (s) => { const l = []; s.forEach(d => l.push(d.data())); if (l.length > 0) setRevenueRecords(l); });
      } catch (err) { setCloudStatus('Firebase Failed'); }
    }
  }, [fbConfig]);

  useEffect(() => {
    if (!dbInstance) {
      localStorage.setItem('adv_wtm_goals', JSON.stringify(goals));
      localStorage.setItem('adv_wtm_tasks', JSON.stringify(tasks));
      localStorage.setItem('adv_wtm_daily_logs', JSON.stringify(dailyLogs));
      localStorage.setItem('adv_wtm_revenue', JSON.stringify(revenueRecords));
    }
  }, [goals, tasks, dailyLogs, revenueRecords, dbInstance]);

  const getGoalProgressPct = (goalId) => {
    const gt = tasks.filter(t => t.goalId === goalId);
    if (gt.length === 0) return 0;
    const sum = gt.reduce((acc, t) => acc + (Number(t.progress) || 0), 0);
    return Math.round(sum / gt.length);
  };

  const getTaskTotalExpense = (taskId) => {
    const tl = dailyLogs.filter(l => l.taskId === taskId);
    return tl.reduce((sum, l) => sum + (Number(l.transportExp) || 0) + (Number(l.foodExp) || 0) + (Number(l.allowanceExp) || 0) + (Number(l.miscExp) || 0), 0);
  };

  const getGoalTotalExpense = (goalId) => {
    const tIds = tasks.filter(t => t.goalId === goalId).map(t => t.id);
    const gl = dailyLogs.filter(l => tIds.includes(l.taskId));
    return gl.reduce((sum, l) => sum + (Number(l.transportExp) || 0) + (Number(l.foodExp) || 0) + (Number(l.allowanceExp) || 0) + (Number(l.miscExp) || 0), 0);
  };

  const totalRevenue = useMemo(() => revenueRecords.reduce((sum, r) => sum + ((Number(r.studentsCount) || 0) * (Number(r.unitPrice) || 0) - (Number(r.discount) || 0)), 0), [revenueRecords]);
  const totalStudentsEnrolled = useMemo(() => revenueRecords.reduce((sum, r) => sum + (Number(r.studentsCount) || 0), 0), [revenueRecords]);
  const totalSystemExpenses = useMemo(() => dailyLogs.reduce((sum, l) => sum + (Number(l.transportExp) || 0) + (Number(l.foodExp) || 0) + (Number(l.allowanceExp) || 0) + (Number(l.miscExp) || 0), 0), [dailyLogs]);

  const handleUpdateTaskField = (taskId, field, value) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updated = { ...t, [field]: value };
      if (field === 'progress' && Number(value) >= 100) { updated.status = 'Completed'; updated.closingDate = new Date().toISOString().split('T')[0]; }
      if (dbInstance) updateDoc(doc(dbInstance, 'tasks', taskId), updated);
      return updated;
    }));
  };

  const workflowTasksForGoal = useMemo(() => tasks.filter(t => t.goalId === selectedGoalIdForWorkflow), [tasks, selectedGoalIdForWorkflow]);
  const activeWorkflowTask = useMemo(() => tasks.find(t => t.id === selectedTaskIdForWorkflow) || tasks[0], [tasks, selectedTaskIdForWorkflow]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white"><FileSpreadsheet className="w-5 h-5" /></div>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                KEA Kids Executive Dashboard
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border ${dbInstance ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                  {dbInstance ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />} {cloudStatus}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">7 Goals | Task Management, Revenue & Daily Operations System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsFirebaseConfigModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-indigo-400" /> Cloud Config
            </button>
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold">
              {currentUser.name} ({currentUser.role})
            </div>
            <button onClick={handleLogout} className="p-2 bg-slate-800 hover:bg-rose-900 text-slate-300 rounded-xl text-xs"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
          <nav className="flex space-x-2 py-2">
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
              { id: 'goals', label: 'Goal Register', icon: Target },
              { id: 'tasks', label: 'Task Tracker', icon: Layers },
              { id: 'revenue', label: 'Student & Revenue', icon: GraduationCap },
              { id: 'daily-workflow', label: '7-Day Operations', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="flex items-center space-x-2 py-2">
            <button onClick={() => setIsRevenueModalOpen(true)} className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">+ New Student</button>
            <button onClick={() => setIsTaskModalOpen(true)} className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">+ New Task</button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">Primary Goals</p>
                <h3 className="text-2xl font-black text-indigo-600 mt-1">{goals.length} Goals</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">Total Sub-Tasks</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{tasks.length}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">Students Enrolled</p>
                <h3 className="text-2xl font-black text-indigo-600 mt-1">{totalStudentsEnrolled}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">Total Revenue</p>
                <h3 className="text-2xl font-black text-emerald-600 mt-1">৳{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">System Expenses</p>
                <h3 className="text-2xl font-black text-rose-600 mt-1">৳{totalSystemExpenses.toLocaleString()}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map(goal => {
                const progressPct = getGoalProgressPct(goal.id);
                return (
                  <div key={goal.id} className="bg-white rounded-2xl border p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">{goal.id}</span>
                      <span className="text-xl font-black text-indigo-600">{progressPct}%</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900">{goal.title}</h3>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(goal => (
              <div key={goal.id} className="bg-white rounded-2xl border p-6 space-y-3">
                <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg">{goal.id}</span>
                <h3 className="text-base font-bold text-slate-900">{goal.title}</h3>
                <p className="text-xs text-slate-600">Expected Result: <strong>{goal.expectedResult}</strong></p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-white text-[11px] uppercase">
                <tr>
                  <th className="p-3">Goal</th>
                  <th className="p-3">Task ID</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                {tasks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold">{t.goalId}</td>
                    <td className="p-3 font-bold text-indigo-700">{t.id}</td>
                    <td className="p-3">{t.task}</td>
                    <td className="p-3">{t.assignedTo}</td>
                    <td className="p-3 font-semibold">{t.status}</td>
                    <td className="p-3 font-black text-indigo-600">{t.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900">Student & Revenue Records</h2>
                <p className="text-xs text-slate-500">Total Revenue: ৳{totalRevenue.toLocaleString()} | Students: {totalStudentsEnrolled}</p>
              </div>
              <button onClick={() => setIsRevenueModalOpen(true)} className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl">+ Add Sale</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Package Name</th>
                    <th className="p-3 text-center">Students</th>
                    <th className="p-3 text-right">Net Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {revenueRecords.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-slate-400">No revenue records added yet.</td></tr>
                  ) : (
                    revenueRecords.map(r => (
                      <tr key={r.id}>
                        <td className="p-3">{r.date}</td>
                        <td className="p-3 font-semibold">{r.packageName}</td>
                        <td className="p-3 text-center font-bold">{r.studentsCount}</td>
                        <td className="p-3 text-right font-extrabold text-emerald-700">৳{((r.studentsCount * r.unitPrice) - r.discount).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'daily-workflow' && (
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-base font-bold text-slate-900">7-Day Operations & Expense Engine</h2>
            <p className="text-xs text-slate-600">Select task from Tasks tab or manage operational logs seamlessly.</p>
          </div>
        )}
      </main>

      {/* MODALS */}
      {isRevenueModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">Add Student Package Sale</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const rec = { id: `REV-${Date.now()}`, ...newRevenue };
              setRevenueRecords(prev => [rec, ...prev]);
              if (dbInstance) setDoc(doc(dbInstance, 'revenue', rec.id), rec);
              setIsRevenueModalOpen(false);
            }} className="space-y-3">
              <input type="date" required value={newRevenue.date} onChange={e => setNewRevenue({ ...newRevenue, date: e.target.value })} className="w-full p-2 border rounded-xl" />
              <input type="text" required placeholder="Package Name" value={newRevenue.packageName} onChange={e => setNewRevenue({ ...newRevenue, packageName: e.target.value })} className="w-full p-2 border rounded-xl" />
              <input type="number" min="1" required placeholder="Students Count" value={newRevenue.studentsCount} onChange={e => setNewRevenue({ ...newRevenue, studentsCount: Number(e.target.value) })} className="w-full p-2 border rounded-xl" />
              <input type="number" min="0" required placeholder="Unit Price (BDT)" value={newRevenue.unitPrice} onChange={e => setNewRevenue({ ...newRevenue, unitPrice: Number(e.target.value) })} className="w-full p-2 border rounded-xl" />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsRevenueModalOpen(false)} className="px-3 py-1.5 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFirebaseConfigModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">Firebase Cloud Config</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem('adv_wtm_fb_config', JSON.stringify(configInput));
              setFbConfig(configInput);
              setIsFirebaseConfigModalOpen(false);
            }} className="space-y-3">
              <input type="text" placeholder="apiKey" value={configInput.apiKey} onChange={e => setConfigInput({ ...configInput, apiKey: e.target.value })} className="w-full p-2 border rounded-xl" />
              <input type="text" placeholder="projectId" value={configInput.projectId} onChange={e => setConfigInput({ ...configInput, projectId: e.target.value })} className="w-full p-2 border rounded-xl" />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsFirebaseConfigModalOpen(false)} className="px-3 py-1.5 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl">Save Keys</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
