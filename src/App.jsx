import React, { useState, useMemo, useEffect } from 'react';
import { exportDayWiseSchoolVisitReport } from './utils/exportExcel';

const INITIAL_GOALS = [
  { id: 'GOAL-01', title: 'Human Resource Recruitment', expectedResult: 'Hire and onboard the required employee', finalDeadline: '2026-12-01', status: 'In Progress' },
  { id: 'GOAL-02', title: 'Keakids Operation Checking', expectedResult: 'Execute operation audit and smooth setup', finalDeadline: '2026-11-12', status: 'In Progress' },
  { id: 'GOAL-03', title: 'Published 4 job advertisements on BD Jobs for candidate sourcing.', expectedResult: 'Managed BD Jobs postings for 4 vacancies and monitored candidate applications.', finalDeadline: '2026-12-03', status: 'In Progress' },
  { id: 'GOAL-04', title: 'Payment Gateway', expectedResult: 'Payment checking', finalDeadline: '2026-11-19', status: 'In Progress' },
  { id: 'GOAL-05', title: 'Educational Content Quality Evaluation', expectedResult: 'Review Physics chapter 7 creative questions and model tests', finalDeadline: '2026-11-25', status: 'In Progress' },
  { id: 'GOAL-06', title: 'Task Management Workflow Automation', expectedResult: 'Deploy web-based dashboard replacing manual Excel trackers', finalDeadline: '2026-11-30', status: 'In Progress' },
  { id: 'GOAL-07', title: 'Different Program cost', expectedResult: 'Track daily operational expenses, printing & program costs', finalDeadline: '2026-12-10', status: 'In Progress' },
  { id: 'GOAL-08', title: 'SOE ', expectedResult: 'Improve user sign-up and conversion rate from organic search by 15–20%', finalDeadline: '2027-01-01', status: 'In Progress' },
  { id: 'GOAL-09', title: 'Add in Chat-GPT', expectedResult: 'Targeted AI Referral Traffic,Higher Conversion Rate,Brand Visibility & Recall', finalDeadline: '2027-01-01', status: 'In Progress' },
  { id: 'GOAL-010', title: 'Endorsements', expectedResult: "Students', Parents', Educators'", finalDeadline: '2026-12-31', status: 'In Progress' },
  { id: 'GOAL-011', title: 'School Visit', expectedResult: 'Free Model Test 10 Account ', finalDeadline: '2026-12-31', status: 'In Progress' },
  { id: 'GOAL-012', title: 'Presentation Cantonment School', expectedResult: 'Asst. Mowsumee Chowdhury', finalDeadline: '2026-12-25', status: 'In Progress' }
];

const INITIAL_TASKS = [
  { id: 'T-001', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Activate BDJobs subscription', assignedTo: 'Mithun', deadline: '2026-11-05', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-002', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Collect official documents from Mithun Sir', assignedTo: 'Mithun', deadline: '2026-11-06', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-003', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Obtain budget confirmation', assignedTo: 'Finance', deadline: '2026-11-06', priority: 'High', status: 'In Progress', progress: 0 },
  { id: 'T-004', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Publish BDJobs job post', assignedTo: 'HR Exec', deadline: '2026-11-07', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-005', goalId: 'GOAL-01', phase: 'Newspaper Advertisement', task: 'Collect quotations from 5 newspapers', assignedTo: 'Media P', deadline: '2026-11-10', priority: 'Medium', status: 'Completed', progress: 100 },
  { id: 'T-006', goalId: 'GOAL-01', phase: 'Newspaper Advertisement', task: 'Calculate advertisement budget and obtain approval', assignedTo: 'HR Lead', deadline: '2026-11-11', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-007', goalId: 'GOAL-02', phase: 'Operation Audit', task: 'Go through all operational things', assignedTo: 'Mithun', deadline: '2026-11-12', priority: 'High', status: 'In Progress', progress: 13 },
  { id: 'T-008', goalId: 'GOAL-03', phase: 'Recruitment Ads', task: 'Monitor candidate applications for 4 vacancies', assignedTo: 'HR Exec', deadline: '2026-12-03', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-009', goalId: 'GOAL-04', phase: 'Payment Setup', task: 'Payment gateway integration & SSL checking', assignedTo: 'Tech Lead', deadline: '2026-11-19', priority: 'High', status: 'In Progress', progress: 65 },
  { id: 'T-010', goalId: 'GOAL-05', phase: 'Content QA', task: 'Evaluate Physics chapter 7 creative questions', assignedTo: 'Content Team', deadline: '2026-11-25', priority: 'Medium', status: 'In Progress', progress: 65 },
  { id: 'T-011', goalId: 'GOAL-06', phase: 'System Setup', task: 'Deploy web-based dashboard on Vercel', assignedTo: 'Admin', deadline: '2026-11-30', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-022', goalId: 'GOAL-07', phase: 'Printing & Logistics', task: 'Allah dan press', assignedTo: 'Ananda', deadline: '2026-11-15', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-025', goalId: 'GOAL-04', phase: 'Bank Transfer details', task: 'Cash Inflows', assignedTo: 'Mithun Sir and Ananda', deadline: '2026-11-16', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-026', goalId: 'GOAL-05', phase: 'Science Subjects Previous Question', task: 'tansen Sir - Text book Collection', assignedTo: 'Ananda', deadline: '2026-11-16', priority: 'High', status: 'In Progress', progress: 50 },
  { id: 'T-027', goalId: 'GOAL-07', phase: 'Sms Provider', task: 'sms purpose', assignedTo: 'Mithun Sir', deadline: '2026-11-15', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-028', goalId: 'GOAL-011', phase: 'School List in CTG', task: '50 school List', assignedTo: 'Ananda', deadline: '2026-11-18', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-029', goalId: 'GOAL-09', phase: 'General', task: 'Advertisement on Chat-GPT', assignedTo: 'Mithun Sir', deadline: '2026-11-25', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-030', goalId: 'GOAL-08', phase: 'General', task: 'Optimization', assignedTo: 'Mithun Sir', deadline: '2026-11-25', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-031', goalId: 'GOAL-012', phase: 'General', task: 'Biology ', assignedTo: 'Mithun Sir And Ananda', deadline: '2026-11-22', priority: 'High', status: 'Not Started', progress: 0 }
];

const INITIAL_LOGS = [
  { taskId: 'T-001', day: 1, date: '2026-11-05', notes: 'BDJobs subscription initial fee & conveyance', hours: 4, progress: 25, transport: 200, food: 150, misc: 150 },
  { taskId: 'T-009', day: 1, date: '2026-11-10', notes: 'Payment gateway merchant registration & advance', hours: 6, progress: 65, transport: 300, food: 200, misc: 30000 },
  { taskId: 'T-022', day: 1, date: '2026-11-11', notes: '1000 pcs card-1200+ Official Seal-400\\-', hours: 8, progress: 100, transport: 100, food: 50, misc: 1600 },
  { taskId: 'T-004', day: 1, date: '2026-11-15', notes: 'Sales & Digital Marketing Officer- Milon Vai', hours: 16, progress: 25, transport: 0, food: 0, misc: 4095 },
  { taskId: 'T-006', day: 1, date: '2026-11-15', notes: 'Dainik Azadi- 2"/2" advertisement for 11.15.2026 back page Color', hours: 8, progress: 100, transport: 100, food: 0, misc: 13600 },
  { taskId: 'T-008', day: 1, date: '2026-11-15', notes: '11/15/2026- 16 candidates ', hours: 2, progress: 0, transport: 0, food: 0, misc: 0 },
  { taskId: 'T-008', day: 2, date: '2026-11-15', notes: '11/16/2026-', hours: 0, progress: 0, transport: 0, food: 0, misc: 0 },
  { taskId: 'T-027', day: 1, date: '2026-11-15', notes: 'sms provider person money - 11/15/2026', hours: 0.5, progress: 100, transport: 0, food: 0, misc: 500 },
  { taskId: 'T-010', day: 1, date: '2026-11-15', notes: 'Ananda', hours: 0.5, progress: 65, transport: 0, food: 0, misc: 0 },
  { taskId: 'T-026', day: 1, date: '2026-11-15', notes: 'physics model question scan purpose', hours: 8, progress: 50, transport: 0, food: 0, misc: 400 }
];

const INITIAL_FUNDS = [
  { id: 'F-01', date: '2026-11-15', source: 'Management Operational Fund', category: 'Management Fund', amount: 45000, notes: 'Initial operational budget from Management' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem('kea_goals_v4')) || INITIAL_GOALS);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('kea_tasks_v4')) || INITIAL_TASKS);
  const [dailyLogs, setDailyLogs] = useState(() => JSON.parse(localStorage.getItem('kea_logs_v4')) || INITIAL_LOGS);
  const [funds, setFunds] = useState(() => JSON.parse(localStorage.getItem('kea_funds_v4')) || INITIAL_FUNDS);
  const [remarksByTask, setRemarksByTask] = useState(() => JSON.parse(localStorage.getItem('kea_remarks_v1')) || {});

  // Filters
  const [filterGoal, setFilterGoal] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // 7-Day Operations Selection
  const [opGoalId, setOpGoalId] = useState('GOAL-07');
  const [opTaskId, setOpTaskId] = useState('T-022');

  // Modals & Editing State
  const [modalType, setModalType] = useState(null); // 'goal' | 'task' | 'fund'
  const [editingFundId, setEditingFundId] = useState(null);

  const [newGoal, setNewGoal] = useState({ title: '', expectedResult: '', finalDeadline: '2026-12-15' });
  const [newTask, setNewTask] = useState({ goalId: 'GOAL-01', phase: 'General', task: '', assignedTo: '', deadline: '2026-11-25', priority: 'High' });
  const [fundForm, setFundForm] = useState({ source: '', category: 'Student Collection', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });

  useEffect(() => {
    localStorage.setItem('kea_goals_v4', JSON.stringify(goals));
    localStorage.setItem('kea_tasks_v4', JSON.stringify(tasks));
    localStorage.setItem('kea_logs_v4', JSON.stringify(dailyLogs));
    localStorage.setItem('kea_funds_v4', JSON.stringify(funds));
    localStorage.setItem('kea_remarks_v1', JSON.stringify(remarksByTask));
  }, [goals, tasks, dailyLogs, funds, remarksByTask]);

  // Calculations
  const getTaskExpense = (taskId) => dailyLogs.filter(l => l.taskId === taskId).reduce((s, l) => s + Number(l.transport || 0) + Number(l.food || 0) + Number(l.misc || 0), 0);
  const getTaskHours = (taskId) => dailyLogs.filter(l => l.taskId === taskId).reduce((s, l) => s + Number(l.hours || 0), 0);
  const getGoalExpense = (goalId) => {
    const tIds = tasks.filter(t => t.goalId === goalId).map(t => t.id);
    return dailyLogs.filter(l => tIds.includes(l.taskId)).reduce((s, l) => s + Number(l.transport || 0) + Number(l.food || 0) + Number(l.misc || 0), 0);
  };
  const getGoalProgress = (goalId) => {
    const gt = tasks.filter(t => t.goalId === goalId);
    if (!gt.length) return 0;
    return Math.round(gt.reduce((s, t) => s + Number(t.progress || 0), 0) / gt.length);
  };

  const totalSystemExpenses = useMemo(() => dailyLogs.reduce((s, l) => s + Number(l.transport || 0) + Number(l.food || 0) + Number(l.misc || 0), 0), [dailyLogs]);
  const totalStudentMoney = useMemo(() => funds.filter(f => f.category === 'Student Collection').reduce((s, f) => s + Number(f.amount || 0), 0), [funds]);
  const totalManagementMoney = useMemo(() => funds.filter(f => f.category === 'Management Fund').reduce((s, f) => s + Number(f.amount || 0), 0), [funds]);
  const totalFundsReceived = totalStudentMoney + totalManagementMoney;
  const netBalance = totalFundsReceived - totalSystemExpenses;

  const overdueCount = useMemo(() => tasks.filter(t => t.status !== 'Completed' && t.deadline < '2026-11-16').length, [tasks]);
  const completedCount = useMemo(() => tasks.filter(t => t.status === 'Completed').length, [tasks]);
  const inProgressCount = useMemo(() => tasks.filter(t => t.status === 'In Progress').length, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filterGoal !== 'All' && t.goalId !== filterGoal) return false;
      if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
      if (filterStatus !== 'All' && t.status !== filterStatus) return false;
      return true;
    });
  }, [tasks, filterGoal, filterPriority, filterStatus]);

  // Day-wise columns (Day 1 to Day 7) + Total Cost + Remarks
  const handleExportFilteredTasks = () => {
    const rowsForExport = filteredTasks.map(t => {
      const taskLogs = dailyLogs.filter(l => l.taskId === t.id);
      const dayColumns = {};

      for (let d = 1; d <= 7; d++) {
        const dayLog = taskLogs.find(l => Number(l.day) === d);
        const dayCost = dayLog
          ? Number(dayLog.transport || 0) + Number(dayLog.food || 0) + Number(dayLog.misc || 0)
          : 0;
        const workText = dayLog?.notes
          ? (dayLog.date ? `${dayLog.notes} (${dayLog.date})` : dayLog.notes)
          : '';

        dayColumns[`Day ${d} Work`] = workText;
        dayColumns[`Day ${d} Cost (৳)`] = dayCost;
      }

      return {
        'Goal ID': t.goalId,
        'Task ID': t.id,
        'Phase': t.phase,
        'School / Task Description': t.task,
        'Owner': t.assignedTo,
        'Deadline': t.deadline,
        'Status': t.status,
        'Progress (%)': t.progress ?? 0,
        'Total Hours': getTaskHours(t.id),
        'Total Expenses (৳)': getTaskExpense(t.id),
        ...dayColumns,
        'Remarks': remarksByTask[t.id] || ''
      };
    });

    exportDayWiseSchoolVisitReport(rowsForExport, remarksByTask);
  };

  // Handlers
  const handleAddGoal = (e) => {
    e.preventDefault();
    const id = `GOAL-0${goals.length + 1}`;
    setGoals([...goals, { id, ...newGoal, status: 'In Progress' }]);
    setNewGoal({ title: '', expectedResult: '', finalDeadline: '2026-12-15' });
    setModalType(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const id = `T-0${tasks.length + 13}`;
    setTasks([...tasks, { id, ...newTask, status: 'Not Started', progress: 0 }]);
    setNewTask({ goalId: 'GOAL-01', phase: 'General', task: '', assignedTo: '', deadline: '2026-11-25', priority: 'High' });
    setModalType(null);
  };

  const openAddFundModal = () => {
    setEditingFundId(null);
    setFundForm({ source: '', category: 'Student Collection', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
    setModalType('fund');
  };

  const openEditFundModal = (fund) => {
    setEditingFundId(fund.id);
    setFundForm({ source: fund.source, category: fund.category, amount: fund.amount, date: fund.date, notes: fund.notes || '' });
    setModalType('fund');
  };

  const handleSaveFund = (e) => {
    e.preventDefault();
    if (editingFundId) {
      setFunds(prev => prev.map(f => f.id === editingFundId ? { ...f, ...fundForm, amount: Number(fundForm.amount) } : f));
    } else {
      setFunds([{ id: `F-${Date.now()}`, ...fundForm, amount: Number(fundForm.amount) }, ...funds]);
    }
    setEditingFundId(null);
    setModalType(null);
  };

  const handleDeleteFund = (id) => {
    if (window.confirm('আপনি কি এই টাকার হিসাবটি ডিলিট করতে চান?')) {
      setFunds(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleUpdateDayLog = (dayNum, field, value) => {
    setDailyLogs(prev => {
      const idx = prev.findIndex(l => l.taskId === opTaskId && l.day === dayNum);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx] = { ...updated[idx], [field]: value, date: updated[idx].date || new Date().toISOString().split('T')[0] };
      } else {
        updated = [...prev, { taskId: opTaskId, day: dayNum, date: new Date().toISOString().split('T')[0], notes: '', hours: 0, progress: 0, transport: 0, food: 0, misc: 0, [field]: value }];
      }
      if (field === 'progress') {
        setTasks(ts => ts.map(t => t.id === opTaskId ? { ...t, progress: Number(value), status: Number(value) >= 100 ? 'Completed' : Number(value) > 0 ? 'In Progress' : 'Not Started' } : t));
      }
      return updated;
    });
  };

  const open7DayForTask = (task) => {
    setOpGoalId(task.goalId);
    setOpTaskId(task.id);
    setActiveTab('operations');
  };

  const opGoalTasks = useMemo(() => tasks.filter(t => t.goalId === opGoalId), [tasks, opGoalId]);
  const activeOpTask = useMemo(() => tasks.find(t => t.id === opTaskId) || opGoalTasks[0], [tasks, opTaskId, opGoalTasks]);

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#0f172a' }}>

      {/* Dark Navy Top Header */}
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#4f46e5', padding: '8px 10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px' }}>📋</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Advanced Goal & Task System</h1>
              <span style={{ backgroundColor: '#78350f', color: '#fcd34d', border: '1px solid #b45309', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>● Local Storage Mode</span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Multi-Goal Expense, Revenue & Daily Operational System</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
            👤 System Admin <span style={{ backgroundColor: '#312e81', color: '#a5b4fc', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', marginLeft: '4px' }}>Admin</span>
          </span>
        </div>
      </header>

      {/* Automated Red Alert Banner */}
      <div style={{ backgroundColor: '#e11d48', color: 'white', padding: '8px 24px', fontSize: '12px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>⚠️ AUTOMATED ALERT: {overdueCount} overdue task(s) requiring immediate attention!</span>
        <span onClick={() => { setFilterStatus('All'); setActiveTab('tasks'); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Filter Delayed Tasks →</span>
      </div>

      {/* Navigation Bar & Action Buttons */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: '📊 Executive Dashboard' },
            { id: 'goals', label: '🎯 Goal Register' },
            { id: 'tasks', label: '📑 Task Tracker & Workflow' },
            { id: 'operations', label: '📈 7-Day Daily Operations & Cards' },
            { id: 'funds', label: '💰 Student & Management Funds' },
            { id: 'sop', label: '📖 Operating Rules (SOP)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '7px 13px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1.5px solid #eab308' : '1px solid #e2e8f0',
                backgroundColor: activeTab === tab.id ? '#fefce8' : 'white',
                color: activeTab === tab.id ? '#1e293b' : '#475569',
                fontWeight: activeTab === tab.id ? '700' : '500',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={openAddFundModal} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '7px 13px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
            + Add Money / Sale
          </button>
          <button onClick={() => setModalType('goal')} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '7px 13px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
            + New Goal
          </button>
          <button onClick={() => setModalType('task')} style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '7px 13px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
            + New Task
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '1320px', margin: '20px auto', padding: '0 20px' }}>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Top KPI Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>ACTIVE PRIMARY GOALS</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '24px', fontWeight: '900', color: '#4f46e5' }}>{goals.length} Goals</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Multi-Goal Tracking</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL SUB-TASKS</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{tasks.length}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#059669', fontWeight: '600' }}>{completedCount} Done / {inProgressCount} In Progress</p>
              </div>
              <div onClick={() => setActiveTab('operations')} title="Click to log daily expenses" style={{ cursor: 'pointer', backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1.5px solid #a7f3d0' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL SYSTEM EXPENSES ✎</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '24px', fontWeight: '900', color: '#059669' }}>৳{totalSystemExpenses.toLocaleString()}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Click to edit daily logs</p>
              </div>
              <div onClick={() => setActiveTab('funds')} title="Click to edit or manage funds" style={{ cursor: 'pointer', backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1.5px solid #bfdbfe' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL FUNDS RECEIVED ✎</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '22px', fontWeight: '900', color: '#2563eb' }}>৳{totalFundsReceived.toLocaleString()}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Student:
