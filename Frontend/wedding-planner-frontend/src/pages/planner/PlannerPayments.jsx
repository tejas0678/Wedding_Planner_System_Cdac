import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Stat } from './../../components/planner/common/Stat'
import { Status } from './../../components/planner/common/Status'
import { EmptyState } from './../../components/planner/common/EmptyState'
import { mockData } from './data/mockData';

import { moneyShort, money } from './../../utiles/planner/helpers';

// ============= PAYMENTS PAGE =============
export const PlannerPayments = () => {
  const user = { id: 1 };
  const [data] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const payments = data.payments.filter(p => mine.some(w => w.wedding_id === p.wedding_id));
  const total = payments.filter(p => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Stat icon="💰" label="Total Received" value={moneyShort(total)} title={money(total)} />
        <Stat icon="💳" label="Payment Records" value={payments.length} />
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
        {payments.length > 0 ? (
          <div className="space-y-2">
            {payments.map(p => {
              const wedding = mine.find(w => w.wedding_id === p.wedding_id);
              const client = data.clients.find(c => c.client_id === wedding?.client_id);
              return (
                <div key={p.payment_id} className="flex flex-wrap justify-between items-center p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{p.payment_id}</p>
                    <p className="text-sm text-gray-600">{client?.name || 'Unknown'}</p>
                    <p className="text-sm font-bold text-pink-600">{money(p.amount)}</p>
                  </div>
                  <Status status={p.status} />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="💳" title="No payments" text="No payment records found." />
        )}
      </div>
    </DashboardLayout>
  );
};