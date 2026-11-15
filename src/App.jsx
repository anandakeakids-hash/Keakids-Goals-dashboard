import React, { useState, useMemo, useEffect } from 'react';

const INITIAL_GOALS = [
  { id: 'GOAL-01', title: 'Human Resource Recruitment', expectedResult: 'Hire and onboard the required employee', finalDeadline: '2026-12-01', status: 'In Progress' },
  { id: 'GOAL-02', title: 'Keakids Operation Checking', expectedResult: 'Execute operation audit and smooth setup', finalDeadline: '2026-11-12', status: 'In Progress' },
  { id: 'GOAL-03', title: 'Published 4 job advertisements on BD Jobs for candidate sourcing.', expectedResult: 'Managed BD Jobs postings for 4 vacancies and monitored candidate applications.', finalDeadline: '2026-12-03', status: 'In Progress' },
  { id: 'GOAL-04', title: 'Payment Gateway', expectedResult: 'Payment checking', finalDeadline: '2026-11-19', status: 'In Progress' },
  { id: 'GOAL-05', title: 'Educational Content Quality Evaluation', expectedResult: 'Review Physics chapter 7 creative questions and model tests', finalDeadline: '2026-11-25', status: 'In Progress' },
  { id: 'GOAL-06', title: 'Task Management Workflow Automation', expectedResult: 'Deploy web-based dashboard replacing manual Excel trackers', finalDeadline: '2026-11-30', status: 'In Progress' },
  { id: 'GOAL-07', title: 'Different Program cost', expectedResult: 'Track daily operational expenses, printing & program costs', finalDeadline: '2026-12-10', status: 'In Progress' }
];

const INITIAL_TASKS = [
  { id: 'T-001', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Activate BDJobs subscription', assignedTo: 'Mithun', deadline: '2026-11-05', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-002', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Collect official documents from Mithun Sir', assignedTo: 'Mithun', deadline: '2026-11-06', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-003', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Obtain budget confirmation', assignedTo: 'Finance', deadline: '2026-11-06', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-004', goalId: 'GOAL-01', phase: 'BDJobs Job Posting', task: 'Publish BDJobs job post', assignedTo: 'HR Exec', deadline: '2026-11-07', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-005', goalId: 'GOAL-01', phase: 'Newspaper Advertisement', task: 'Collect quotations from 5 newspapers', assignedTo: 'Media P', deadline: '2026-11-10', priority: 'Medium', status: 'Not Started', progress: 0 },
  { id: 'T-006', goalId: 'GOAL-01', phase: 'Newspaper Advertisement', task: 'Calculate advertisement budget and obtain approval', assignedTo: 'HR Lead', deadline: '2026-11-11', priority: 'High', status: 'Not Started', progress: 0 },
  { id: 'T-007', goalId: 'GOAL-02', phase: 'Operation Audit', task: 'Go through all operational things', assignedTo: 'Mithun', deadline: '2026-11-12', priority: 'High', status: 'In Progress', progress: 13 },
  { id: 'T-008', goalId: 'GOAL-03', phase: 'Recruitment Ads', task: 'Monitor candidate applications for 4 vacancies', assignedTo: 'HR Exec', deadline: '2026-12-03', priority: 'High', status: 'In Progress', progress: 25 },
  { id: 'T-009', goalId: 'GOAL-04', phase: 'Payment Setup', task: 'Payment gateway integration & SSL checking', assignedTo: 'Tech Lead', deadline: '2026-11-19', priority: 'High', status: 'In Progress', progress: 65 },
  { id: 'T-010', goalId: 'GOAL-05', phase: 'Content QA', task: 'Evaluate Physics chapter 7 creative questions', assignedTo: 'Content Team', deadline: '2026-11-25', priority: 'Medium', status: 'Not Started', progress: 0 },
  { id: 'T-011', goalId: 'GOAL-06', phase: 'System Setup', task: 'Deploy web-based dashboard on Vercel', assignedTo: 'Admin', deadline: '2026-11-30', priority: 'High', status: 'Completed', progress: 100 },
  { id: 'T-022', goalId: 'GOAL-07', phase: 'Printing & Logistics', task: 'Allah dan press', assignedTo: 'Ananda', deadline: '2026-11-15', priority: 'High', status: 'Completed', progress: 100 }
];

// Initial logs matching exact previous expenses: 500 + 30500 + 1750 = 32,750 BDT
const INITIAL_LOGS = [
  { taskId: 'T-001', day: 1, date: '2026-11-05', notes: 'BDJobs subscription initial fee & conveyance', hours: 4, progress: 25, transport: 200, food: 150, misc: 150 },
  { taskId: 'T-009', day: 1, date: '2026-11-10', notes: 'Payment gateway merchant registration & advance', hours: 6, progress: 65, transport: 300, food: 200, misc: 30000 },
  { taskId: 'T-022', day: 1, date: '2026-11-11', notes: '1000 pcs card-1200+ Official Seal-400\\-', hours: 8, progress: 100, transport: 100, food: 50, misc: 1600 }
];

const INITIAL_FUNDS = [
  { id: 'F-01', date: '2026-11-05', source: 'Management Operational Fund', category: 'Management Fund', amount: 35000, notes: 'Initial operational budget from Management' },
  { id: 'F-02', date: '2026-11-12', source: 'Student Model Test & Story Package', category: 'Student Collection', amount: 12500, notes: '25 students enrolled @ 500 BDT' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem('kea_goals_v3')) || INITIAL_GOALS);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('kea_tasks_v3')) || INITIAL_TASKS);
  const [dailyLogs, setDailyLogs] = useState(() => JSON.parse(localStorage.getItem('kea_logs_v3')) || INITIAL_LOGS);
  const [funds, setFunds] = useState(() => JSON.parse(localStorage.getItem('kea_funds_v3')) || INITIAL_FUNDS);

  // Filters for Task Tracker
  const [filterGoal, setFilterGoal] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Selected Goal & Task for 7-Day Operations
  const [opGoalId, setOpGoalId] = useState('GOAL-07');
  const [opTaskId, setOpTaskId] = useState('T-022');

  // Modals
  const [modalType, setModalType] = useState(null); // 'goal' | 'task' | 'fund'
  const [newGoal, setNewGoal] = useState({ title: '', expectedResult: '', finalDeadline: '2026-12-15' });
  const [newTask, setNewTask] = useState({ goalId: 'GOAL-01', phase: 'General', task: '', assignedTo: '', deadline: '2026-11-25', priority: 'High' });
  const [newFund, setNewFund] = useState({ source: '', category: 'Student Collection', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });

  useEffect(() => {
    localStorage.setItem('kea_goals_v3', JSON.stringify(goals));
    localStorage.setItem('kea_tasks_v3', JSON.stringify(tasks));
    localStorage.setItem('kea_logs_v3', JSON.stringify(dailyLogs));
    localStorage.setItem('kea_funds_v3', JSON.stringify(funds));
  }, [goals, tasks, dailyLogs, funds]);

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

  const handleAddFund = (e) => {
    e.preventDefault();
    setFunds([{ id: `F-${Date.now()}`, ...newFund, amount: Number(newFund.amount) }, ...funds]);
    setNewFund({ source: '', category: 'Student Collection', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
    setModalType(null);
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

        {/* Right Side Action Buttons: Add Money, New Goal, New Task */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setModalType('fund')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '7px 13px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
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
              <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1.5px solid #a7f3d0' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL SYSTEM EXPENSES</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '24px', fontWeight: '900', color: '#059669' }}>৳{totalSystemExpenses.toLocaleString()}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Aggregated from daily logs</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1.5px solid #bfdbfe' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL FUNDS RECEIVED</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '22px', fontWeight: '900', color: '#2563eb' }}>৳{totalFundsReceived.toLocaleString()}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Student: ৳{totalStudentMoney.toLocaleString()} | Mgmt: ৳{totalManagementMoney.toLocaleString()}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#64748b' }}>NET CASH BALANCE</p>
                <h3 style={{ margin: '6px 0 4px 0', fontSize: '22px', fontWeight: '900', color: netBalance >= 0 ? '#0f172a' : '#e11d48' }}>৳{netBalance.toLocaleString()}</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#e11d48', fontWeight: '600' }}>{overdueCount} Overdue Tasks</p>
              </div>
            </div>

            {/* ALL PRIMARY GOALS & EXPENSES OVERVIEW */}
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '14px', letterSpacing: '0.5px' }}>ALL PRIMARY GOALS & EXPENSES OVERVIEW</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
              {goals.map(goal => {
                const gExp = getGoalExpense(goal.id);
                const gPct = getGoalProgress(goal.id);
                const gSubCount = tasks.filter(t => t.goalId === goal.id).length;
                return (
                  <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '6px' }}>{goal.id}</span>
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px' }}>{goal.status}</span>
                        </div>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>{goal.title}</h4>
                        <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#64748b' }}>Expected Result: <strong style={{ color: '#334155' }}>{goal.expectedResult}</strong></p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: '#4f46e5' }}>{gPct}%</span>
                        <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>Completion Rate</p>
                      </div>
                    </div>

                    {/* Green Expense Pill Box */}
                    <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#065f46' }}>💵 Total Goal Expenses Logged:</span>
                      <span style={{ fontSize: '14px', fontWeight: '900', color: '#059669' }}>৳{gExp.toLocaleString()} BDT</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>
                      <span>{gSubCount} Sub-tasks assigned</span>
                      <span>Deadline: {goal.finalDeadline}</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '6px', borderRadius: '4px' }}>
                      <div style={{ width: `${gPct}%`, backgroundColor: '#4f46e5', height: '6px', borderRadius: '4px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: GOAL REGISTER */}
        {activeTab === 'goals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
            {goals.map(goal => (
              <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>{goal.id}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#059669' }}>Expense: ৳{getGoalExpense(goal.id).toLocaleString()}</span>
                </div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 'bold' }}>{goal.title}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#475569' }}>Expected Result: <strong>{goal.expectedResult}</strong></p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Deadline: {goal.finalDeadline}</span>
                  <button onClick={() => { setFilterGoal(goal.id); setActiveTab('tasks'); }} style={{ backgroundColor: '#eef2ff', color: '#4f46e5', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    View Tasks →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TASK TRACKER & WORKFLOW WITH FILTERS */}
        {activeTab === 'tasks' && (
          <div>
            {/* Filter Bar */}
            <div style={{ backgroundColor: 'white', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>🌪️ Filters:</span>
              <select value={filterGoal} onChange={e => setFilterGoal(e.target.value)} style={{ padding: '7px 12px', borderRadius: '8px', border: '1.5px solid #eab308', fontSize: '12px', fontWeight: '600', minWidth: '240px' }}>
                <option value="All">All Primary Goals ({goals.length})</option>
                {goals.map(g => <option key={g.id} value={g.id}>{g.id}: {g.title}</option>)}
              </select>
              <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                <option value="All">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Workflow Grid Table */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead style={{ backgroundColor: '#0f172a', color: 'white', fontSize: '11px' }}>
                  <tr>
                    <th style={{ padding: '12px 14px' }}>GOAL ID</th>
                    <th style={{ padding: '12px 14px' }}>TASK ID</th>
                    <th style={{ padding: '12px 14px' }}>PHASE</th>
                    <th style={{ padding: '12px 14px' }}>TASK DESCRIPTION</th>
                    <th style={{ padding: '12px 14px' }}>OWNER</th>
                    <th style={{ padding: '12px 14px' }}>DEADLINE</th>
                    <th style={{ padding: '12px 14px' }}>TOTAL EXPENSES</th>
                    <th style={{ padding: '12px 14px' }}>TOTAL HOURS</th>
                    <th style={{ padding: '12px 14px' }}>STATUS</th>
                    <th style={{ padding: '12px 14px' }}>PROGRESS</th>
                    <th style={{ padding: '12px 14px' }}>DAILY CARD</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map(t => {
                    const tExp = getTaskExpense(t.id);
                    const tHrs = getTaskHours(t.id);
                    const isOverdue = t.status !== 'Completed' && t.deadline < '2026-11-16';
                    return (
                      <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 14px' }}><span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', padding: '2px 7px', borderRadius: '6px', fontWeight: '700', fontSize: '11px' }}>{t.goalId}</span></td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: '#4f46e5' }}>{t.id}</td>
                        <td style={{ padding: '12px 14px' }}><span style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', color: '#475569' }}>{t.phase}</span></td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>{t.task}</td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>{t.assignedTo}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontWeight: '600' }}>{t.deadline}</div>
                          {t.status === 'Completed' ? (
                            <span style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>Completed</span>
                          ) : isOverdue ? (
                            <span style={{ backgroundColor: '#ffe4e6', color: '#e11d48', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>Overdue</span>
                          ) : (
                            <span style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>Active</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: '#059669' }}>৳{tExp.toLocaleString()}</td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>{tHrs} hrs</td>
                        <td style={{ padding: '12px 14px' }}>
                          <select
                            value={t.status}
                            onChange={e => setTasks(prev => prev.map(item => item.id === t.id ? { ...item, status: e.target.value, progress: e.target.value === 'Completed' ? 100 : item.progress } : item))}
                            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', fontWeight: '700', backgroundColor: t.status === 'Completed' ? '#dcfce7' : t.status === 'In Progress' ? '#e0f2fe' : '#f8fafc' }}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: '#4f46e5' }}>{t.progress}%</td>
                        <td style={{ padding: '12px 14px' }}>
                          <button onClick={() => open7DayForTask(t)} style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', color: '#334155' }}>
                            7-Day Card
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: 7-DAY DAILY OPERATIONS & CARDS */}
        {activeTab === 'operations' && (
          <div>
            {/* Selector Header */}
            <div style={{ backgroundColor: 'white', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#4f46e5', letterSpacing: '0.5px' }}>7-DAY WORKFLOW CARDS & EXPENSE ENGINE</span>
                <h2 style={{ margin: '4px 0', fontSize: '18px', fontWeight: '900' }}>{activeOpTask ? `${activeOpTask.id}: ${activeOpTask.task}` : 'Select a Task'}</h2>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Goal: <strong>{opGoalId}</strong> | Owner: <strong>{activeOpTask?.assignedTo}</strong></p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>SELECT GOAL</label>
                  <select
                    value={opGoalId}
                    onChange={e => {
                      setOpGoalId(e.target.value);
                      const first = tasks.find(t => t.goalId === e.target.value);
                      if (first) setOpTaskId(first.id);
                    }}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', minWidth: '220px' }}
                  >
                    {goals.map(g => <option key={g.id} value={g.id}>{g.id}: {g.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>SELECT TASK</label>
                  <select value={opTaskId} onChange={e => setOpTaskId(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', minWidth: '220px' }}>
                    {opGoalTasks.map(t => <option key={t.id} value={t.id}>{t.id}: {t.task}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 3 Summary Stat Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TOTAL HOURS LOGGED</span>
                <h3 style={{ margin: '6px 0 0 0', fontSize: '20px', fontWeight: '900' }}>{getTaskHours(opTaskId)} Hours</h3>
              </div>
              <div style={{ backgroundColor: '#ecfdf5', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #a7f3d0' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#065f46' }}>TOTAL TASK EXPENSES</span>
                <h3 style={{ margin: '6px 0 0 0', fontSize: '20px', fontWeight: '900', color: '#059669' }}>৳{getTaskExpense(opTaskId).toLocaleString()} BDT</h3>
              </div>
              <div style={{ backgroundColor: 'white', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b' }}>TASK PROGRESS</span>
                <h3 style={{ margin: '6px 0 0 0', fontSize: '20px', fontWeight: '900', color: '#4f46e5' }}>{activeOpTask?.progress || 0}%</h3>
              </div>
            </div>

            {/* 7 Day Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
              {[1, 2, 3, 4, 5, 6, 7].map(dayNum => {
                const log = dailyLogs.find(l => l.taskId === opTaskId && l.day === dayNum) || { notes: '', hours: 0, progress: 0, transport: 0, food: 0, misc: 0, date: '' };
                const dayTotal = Number(log.transport || 0) + Number(log.food || 0) + Number(log.misc || 0);
                return (
                  <div key={dayNum} style={{ backgroundColor: 'white', padding: '18px', borderRadius: '14px', border: dayTotal > 0 || log.notes ? '1.5px solid #10b981' : '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '900', color: '#4f46e5' }}>DAY {dayNum} CARD</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{log.date || 'Not Logged'}</span>
                    </div>

                    <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>WORK OUTPUT / NOTES</label>
                    <textarea
                      rows="2"
                      placeholder={`Log Day ${dayNum} output...`}
                      value={log.notes}
                      onChange={e => handleUpdateDayLog(dayNum, 'notes', e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', marginBottom: '10px', boxSizing: 'border-box' }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '9px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>HOURS WORKED</label>
                        <input type="number" min="0" value={log.hours} onChange={e => handleUpdateDayLog(dayNum, 'hours', Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '9px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>PROGRESS %</label>
                        <input type="number" min="0" max="100" value={log.progress} onChange={e => handleUpdateDayLog(dayNum, 'progress', Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', color: '#4f46e5', boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#059669' }}>DAY {dayNum} EXPENSES (৳)</span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a' }}>৳{dayTotal}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                        <div>
                          <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>Transport</span>
                          <input type="number" min="0" value={log.transport} onChange={e => handleUpdateDayLog(dayNum, 'transport', Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>Food Bill</span>
                          <input type="number" min="0" value={log.food} onChange={e => handleUpdateDayLog(dayNum, 'food', Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>Other/Print</span>
                          <input type="number" min="0" value={log.misc} onChange={e => handleUpdateDayLog(dayNum, 'misc', Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT & MANAGEMENT FUNDS */}
        {activeTab === 'funds' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '800' }}>Student Collections & Management Funds Ledger</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                  Total Received: <strong style={{ color: '#2563eb' }}>৳{totalFundsReceived.toLocaleString()}</strong> | Total Spent: <strong style={{ color: '#e11d48' }}>৳{totalSystemExpenses.toLocaleString()}</strong> | Remaining Cash: <strong style={{ color: '#059669' }}>৳{netBalance.toLocaleString()}</strong>
                </p>
              </div>
              <button onClick={() => setModalType('fund')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
                + Add Money / Student Sale
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead style={{ backgroundColor: '#0f172a', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px 14px' }}>DATE</th>
                  <th style={{ padding: '12px 14px' }}>SOURCE / DESCRIPTION</th>
                  <th style={{ padding: '12px 14px' }}>CATEGORY</th>
                  <th style={{ padding: '12px 14px' }}>NOTES</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>AMOUNT (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {funds.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px' }}>{f.date}</td>
                    <td style={{ padding: '12px 14px', fontWeight: '700' }}>{f.source}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ backgroundColor: f.category === 'Student Collection' ? '#dcfce7' : '#dbeafe', color: f.category === 'Student Collection' ? '#166534' : '#1e40af', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                        {f.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{f.notes}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '800', color: '#059669' }}>+ ৳{Number(f.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: SOP */}
        {activeTab === 'sop' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>Operating Rules & Standard Operating Procedures (SOP)</h2>
            <ul style={{ fontSize: '13px', color: '#334155', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li><strong>Daily Expense Logging:</strong> All transport, food bills, printing, and program costs must be entered inside the respective Task's <strong>7-Day Daily Operations Card</strong>.</li>
              <li><strong>Funds & Student Sales:</strong> Any money received from Student Package Sales or Management Budget allocations must be logged via <strong>+ Add Money / Sale</strong>.</li>
              <li><strong>Automated Cash Balance:</strong> Net Cash Balance is automatically calculated as <code>(Student Collections + Management Funds) - Total System Expenses</code>.</li>
            </ul>
          </div>
        )}
      </main>

      {/* MODALS */}
      {modalType && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '14px', width: '420px', maxWidth: '92%' }}>
            {modalType === 'goal' && (
              <form onSubmit={handleAddGoal}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '16px' }}>+ Create New Primary Goal</h3>
                <input required placeholder="Goal Title" value={newGoal.title} onChange={e => setNewGoal({ ...newGoal, title: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input required placeholder="Expected Result" value={newGoal.expectedResult} onChange={e => setNewGoal({ ...newGoal, expectedResult: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input type="date" required value={newGoal.finalDeadline} onChange={e => setNewGoal({ ...newGoal, finalDeadline: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setModalType(null)} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#0f172a', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Save Goal</button>
                </div>
              </form>
            )}

            {modalType === 'task' && (
              <form onSubmit={handleAddTask}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '16px' }}>+ Create New Sub-Task</h3>
                <select value={newTask.goalId} onChange={e => setNewTask({ ...newTask, goalId: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  {goals.map(g => <option key={g.id} value={g.id}>{g.id}: {g.title}</option>)}
                </select>
                <input required placeholder="Phase (e.g. BDJobs / Printing)" value={newTask.phase} onChange={e => setNewTask({ ...newTask, phase: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input required placeholder="Task Description" value={newTask.task} onChange={e => setNewTask({ ...newTask, task: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input required placeholder="Assigned Owner (e.g. Mithun / Ananda)" value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input type="date" required value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setModalType(null)} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Save Task</button>
                </div>
              </form>
            )}

            {modalType === 'fund' && (
              <form onSubmit={handleAddFund}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '16px' }}>+ Add Money / Student Sale</h3>
                <select value={newFund.category} onChange={e => setNewFund({ ...newFund, category: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  <option value="Student Collection">Student Collection (From Students)</option>
                  <option value="Management Fund">Management Fund (From Management)</option>
                </select>
                <input required placeholder="Source (e.g. 10 Students Model Test / Office Fund)" value={newFund.source} onChange={e => setNewFund({ ...newFund, source: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input type="number" min="1" required placeholder="Amount (BDT)" value={newFund.amount} onChange={e => setNewFund({ ...newFund, amount: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <input placeholder="Notes (optional)" value={newFund.notes} onChange={e => setNewFund({ ...newFund, notes: e.target.value })} style={{ width: '100%', padding: '9px', marginBottom: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setModalType(null)} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#059669', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Save Money</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
