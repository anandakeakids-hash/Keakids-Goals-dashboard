import React, { useState, useMemo } from 'react';

const SYSTEM_USERS = [
  { id: 'admin', password: '123', name: 'System Admin', role: 'Admin' },
  { id: 'manager', password: '123', name: 'Mithun Sir (Manager)', role: 'Manager' },
  { id: 'emp1', password: '123', name: 'HR Executive (Employee)', role: 'Employee' },
  { id: 'director', password: '123', name: 'Managing Director / Sir', role: 'Director' }
];

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
  const [currentUser] = useState(SYSTEM_USERS[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals] = useState(INITIAL_GOALS);
  const [tasks] = useState(INITIAL_TASKS);
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({ packageName: 'Standard Model Test', studentsCount: 1, unitPrice: 500, date: '2026-11-16' });

  const totalRevenue = useMemo(() => revenueRecords.reduce((sum, r) => sum + (r.studentsCount * r.unitPrice), 0), [revenueRecords]);
  const totalStudents = useMemo(() => revenueRecords.reduce((sum, r) => sum + Number(r.studentsCount), 0), [revenueRecords]);

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            KEA Kids Executive Dashboard 
            <span style={{ fontSize: '11px', backgroundColor: '#3b82f6', padding: '3px 10px', borderRadius: '12px' }}>Live Mode</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>7 Goals | Task Management, Revenue & Daily Operations System</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
            {currentUser.name} ({currentUser.role})
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '10px 0' }}>
          {[
            { id: 'dashboard', label: 'Executive Dashboard' },
            { id: 'goals', label: 'Goal Register' },
            { id: 'tasks', label: 'Task Tracker' },
            { id: 'revenue', label: 'Student & Revenue' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1px solid #6366f1' : '1px solid transparent',
                backgroundColor: activeTab === tab.id ? '#eef2ff' : 'transparent',
                color: activeTab === tab.id ? '#4f46e5' : '#64748b',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
        >
          + New Student Sale
        </button>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 20px' }}>
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #4f46e5' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>PRIMARY GOALS</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#1e293b' }}>{goals.length} Goals</h3>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>TOTAL TASKS</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#1e293b' }}>{tasks.length} Tasks</h3>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>STUDENTS ENROLLED</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#10b981' }}>{totalStudents}</h3>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>TOTAL REVENUE</p>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#f59e0b' }}>৳{totalRevenue.toLocaleString()}</h3>
              </div>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Core Goal Progress Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {goals.map(goal => (
                <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '6px' }}>{goal.id}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '12px 0 8px 0' }}>{goal.title}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>{goal.expectedResult}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                    <span>Status: {goal.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {goals.map(goal => (
              <div key={goal.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '6px' }}>{goal.id}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '12px 0 8px 0' }}>{goal.title}</h3>
                <p style={{ fontSize: '13px', color: '#475569' }}><strong>Expected Result:</strong> {goal.expectedResult}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Deadline: {goal.finalDeadline}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
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

        {activeTab === 'revenue' && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Student & Revenue Records</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Total Enrolled Students: {totalStudents} | Total Revenue: ৳{totalRevenue.toLocaleString()}</p>
            {revenueRecords.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>No student records added yet. Click "+ New Student Sale" above to add records.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ backgroundColor: '#0f172a', color: 'white' }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                    <th style={{ padding: '12px 16px' }}>Package Name</th>
                    <th style={{ padding: '12px 16px' }}>Students</th>
                    <th style={{ padding: '12px 16px' }}>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRecords.map((r, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>{r.date}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{r.packageName}</td>
                      <td style={{ padding: '12px 16px' }}>{r.studentsCount}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#10b981' }}>৳{(r.studentsCount * r.unitPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '400px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Add Student Sale</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setRevenueRecords(prev => [newSale, ...prev]);
              setIsModalOpen(false);
            }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Package Name</label>
                <input type="text" value={newSale.packageName} onChange={e => setNewSale({...newSale, packageName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Students Count</label>
                <input type="number" min="1" value={newSale.studentsCount} onChange={e => setNewSale({...newSale, studentsCount: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Unit Price (BDT)</label>
                <input type="number" min="0" value={newSale.unitPrice} onChange={e => setNewSale({...newSale, unitPrice: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
