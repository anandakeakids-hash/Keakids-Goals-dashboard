import React, { useState, useMemo } from 'react';

const INITIAL_GOALS = [
  { id: 'GOAL-01', title: 'Human Resource Recruitment', expectedResult: 'Hire and onboard required employee for sales and marketing', finalDeadline: '2026-12-01', status: 'In Progress' },
  { id: 'GOAL-02', title: 'Keakids Operation Checking', expectedResult: 'Execute operation audit and smooth setup', finalDeadline: '2026-11-12', status: 'In Progress' },
  { id: 'GOAL-03', title: 'Educational Content Quality Evaluation', expectedResult: 'Review Physics chapter 7 creative questions and model tests', finalDeadline: '2026-11-25', status: 'In Progress' },
  { id: 'GOAL-04', title: 'BDJobs & Newspaper Ad Campaign', expectedResult: 'Publish job notices in Chittagong region via BDJobs & dailies', finalDeadline: '2026-11-20', status: 'In Progress' },
  { id: 'GOAL-05', title: 'Task Management Workflow Automation', expectedResult: 'Deploy web-based dashboard replacing manual Excel trackers', finalDeadline: '2026-11-30', status: 'In Progress' },
  { id: 'GOAL-06', title: 'Payment Gateway & Platform Bug Fixes', expectedResult: 'Resolve model test payment flow and library navigation issues', finalDeadline: '2026-11-15', status: 'In Progress' },
  { id: 'GOAL-07', title: 'Financial Audit & Expense Management', expectedResult: 'Track daily operational expenses and revenue streams', finalDeadline: '2026-12-10', status: 'In Progress' }
];

const INITIAL_TASKS = [
  { id: 'T-001', goalId: 'GOAL-01', task: 'Activate BDJobs subscription', assignedTo: 'Mithun Sir / HR Admin', deadline: '2026-11-05', status: 'Not Started', progress: 0 },
  { id: 'T-002', goalId: 'GOAL-01', task: 'Collect official documents from Mithun Sir', assignedTo: 'Mithun Sir', deadline: '2026-11-06', status: 'Not Started', progress: 0 },
  { id: 'T-003', goalId: 'GOAL-02', task: 'Go through all operational things', assignedTo: 'Mithun Sir', deadline: '2026-11-06', status: 'In Progress', progress: 25 },
  { id: 'T-004', goalId: 'GOAL-05', task: 'Design web-based task management workflow', assignedTo: 'Tech Lead', deadline: '2026-11-10', status: 'Completed', progress: 100 },
  { id: 'T-005', goalId: 'GOAL-07', task: 'Setup daily operational expense logging', assignedTo: 'HR Admin', deadline: '2026-11-08', status: 'Completed', progress: 100 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals] = useState(INITIAL_GOALS);
  const [tasks] = useState(INITIAL_TASKS);
  
  // Funding & Revenue records (Student sales + Management funds)
  const [fundsRecords, setFundsRecords] = useState([
    { id: 'F-1', source: 'Student Package Sale', category: 'Student Collection', amount: 5000, date: '2026-11-10', notes: 'Standard Model Test batch 1' },
    { id: 'F-2', source: 'Management Fund Allocation', category: 'Management Fund', amount: 30000, date: '2026-11-05', notes: 'Initial operational budget from Director' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFund, setNewFund] = useState({ source: '', category: 'Student Collection', amount: 1000, date: new Date().toISOString().split('T')[0], notes: '' });

  // Calculations
  const totalStudentCollection = useMemo(() => fundsRecords.filter(f => f.category === 'Student Collection').reduce((sum, f) => sum + Number(f.amount), 0), [fundsRecords]);
  const totalManagementFunds = useMemo(() => fundsRecords.filter(f => f.category === 'Management Fund').reduce((sum, f) => sum + Number(f.amount), 0), [fundsRecords]);
  const totalFundsBalance = totalStudentCollection + totalManagementFunds;

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* Top Dark Header */}
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Advanced Goal & Task System 
            <span style={{ fontSize: '10px', backgroundColor: '#d97706', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>Cloud Synced</span>
          </h1>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Multi-Goal Expense & Daily Operational System</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
            System Admin (Admin)
          </span>
        </div>
      </header>

      {/* Alert Bar */}
      <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 24px', fontSize: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>⚠️ AUTOMATED ALERT: Active goals and operational tasks require immediate tracking!</span>
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>View Details →</span>
      </div>

      {/* Navigation Bar & Action Buttons */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Executive Dashboard' },
            { id: 'goals', label: 'Goal Register' },
            { id: 'tasks', label: 'Task Tracker & Workflow' },
            { id: 'operations', label: '7-Day Daily Operations & Cards' },
            { id: 'funds', label: 'Student & Management Funds' },
            { id: 'sop', label: 'Operating Rules (SOP)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1px solid #4f46e5' : '1px solid #e2e8f0',
                backgroundColor: activeTab === tab.id ? '#eef2ff' : 'white',
                color: activeTab === tab.id ? '#4f46e5' : '#475569',
                fontWeight: activeTab === tab.id ? 'bold' : '500',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
            + Add Money / Sale
          </button>
          <button style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
            + New Goal
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px' }}>
        {activeTab === 'dashboard' && (
          <div>
            {/* Top 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>ACTIVE PRIMARY GOALS</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#4f46e5' }}>{goals.length} Goals</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Multi-Goal Tracking</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>TOTAL SUB-TASKS</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{tasks.length} Tasks</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#10b981' }}>Active workflow tracking</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>STUDENT COLLECTION</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '22px', fontWeight: '900', color: '#10b981' }}>৳{totalStudentCollection.toLocaleString()}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>From student packages</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>MANAGEMENT FUNDS</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '22px', fontWeight: '900', color: '#3b82f6' }}>৳{totalManagementFunds.toLocaleString()}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Allocated budget</p>
              </div>
            </div>

            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>All Primary Goals & Progress Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {goals.map(goal => (
                <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '3px 8px', borderRadius: '6px' }}>{goal.id}</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '10px 0 6px 0' }}>{goal.title}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0' }}>{goal.expectedResult}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Deadline: {goal.finalDeadline}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {goals.map(goal => (
              <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '3px 8px', borderRadius: '6px' }}>{goal.id}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '10px 0 6px 0' }}>{goal.title}</h3>
                <p style={{ fontSize: '12px', color: '#475569' }}><strong>Expected Result:</strong> {goal.expectedResult}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>Status: {goal.status} | Deadline: {goal.finalDeadline}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead style={{ backgroundColor: '#0f172a', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px 16px' }}>Goal ID</th>
                  <th style={{ padding: '12px 16px' }}>Task ID</th>
                  <th style={{ padding: '12px 16px' }}>Description</th>
                  <th style={{ padding: '12px 16px' }}>Assigned To</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{t.goalId}</td>
                    <td style={{ padding: '12px 16px', color: '#4f46e5', fontWeight: 'bold' }}>{t.id}</td>
                    <td style={{ padding: '12px 16px' }}>{t.task}</td>
                    <td style={{ padding: '12px 16px' }}>{t.assignedTo}</td>
                    <td style={{ padding: '12px 16px' }}>{t.status}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#10b981' }}>{t.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'operations' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>7-Day Workflow Cards & Expense Engine</h2>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Track daily operational logs, transport, food bills, and progress per task seamlessly.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {['Day 1 Card', 'Day 2 Card', 'Day 3 Card', 'Day 4 Card'].map((day, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold', color: '#4f46e5' }}>{day}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>Work Output / Notes:</p>
                  <input type="text" placeholder="Log progress notes..." style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '8px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span>Hours: 8</span>
                    <span style={{ fontWeight: 'bold', color: '#10b981' }}>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'funds' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Student Collections & Management Funds</h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Total Balance: ৳{totalFundsBalance.toLocaleString()} (Student: ৳{totalStudentCollection.toLocaleString()} | Management: ৳{totalManagementFunds.toLocaleString()})</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                + Add Money / Sale
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead style={{ backgroundColor: '#0f172a', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Source / Description</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Amount (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {fundsRecords.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>{f.date}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{f.source}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: f.category === 'Student Collection' ? '#dcfce7' : '#dbeafe', color: f.category === 'Student Collection' ? '#166534' : '#1e40af', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                        {f.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#10b981' }}>৳{Number(f.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sop' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Operating Rules & Standard Operating Procedures (SOP)</h2>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              1. All team members must log their daily operational tasks and expenses via the 7-Day Operations tab.<br/>
              2. Student collections and management funding must be updated instantly using the "+ Add Money / Sale" button.<br/>
              3. Deadlines and goal statuses are monitored automatically to ensure 100% project accountability.
            </p>
          </div>
        )}
      </main>

      {/* Add Money / Student Sale Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '420px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Add Money / Student Sale Record</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setFundsRecords(prev => [newFund, ...prev]);
              setIsModalOpen(false);
            }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Category</label>
                <select value={newFund.category} onChange={e => setNewFund({...newFund, category: e.target.value})} style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="Student Collection">Student Collection (From Students)</option>
                  <option value="Management Fund">Management Fund (From Management/Director)</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Source / Description</label>
                <input type="text" required placeholder="e.g. Model Test Package / Monthly Budget" value={newFund.source} onChange={e => setNewFund({...newFund, source: e.target.value})} style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Amount (BDT)</label>
                <input type="number" min="1" required value={newFund.amount} onChange={e => setNewFund({...newFund, amount: Number(e.target.value)})} style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
