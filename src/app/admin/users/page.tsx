import React from 'react';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function AdminUsersPage() {
  let users: any[] = [
    {
      id: 'usr-1',
      name: 'Nafis Al Safayet',
      mobile: '+880 1712-345678',
      email: 'nafis@fukustudio.com',
      isActive: true,
      roles: [{ roleId: 'r1', role: { name: 'SUPER_ADMIN' } }],
    },
    {
      id: 'usr-2',
      name: 'Gulshan Head Cashier',
      mobile: '+880 1819-998877',
      email: 'cashier.gulshan@fukustudio.com',
      isActive: true,
      roles: [{ roleId: 'r2', role: { name: 'POS_CASHIER' } }],
    },
    {
      id: 'usr-3',
      name: 'Tejgaon Fulfillment Lead',
      mobile: '+880 1911-334455',
      email: 'warehouse@fukustudio.com',
      isActive: true,
      roles: [{ roleId: 'r3', role: { name: 'WAREHOUSE_MANAGER' } }],
    },
  ];

  let auditLogs: any[] = [];

  try {
    const dbUsers = await db.user.findMany({
      include: {
        roles: { include: { role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (dbUsers && dbUsers.length > 0) users = dbUsers;

    const dbLogs = await db.auditLog.findMany({
      take: 15,
      orderBy: { createdAt: 'desc' },
    });
    if (dbLogs && dbLogs.length > 0) auditLogs = dbLogs;
  } catch (err) {
    console.warn('Using fallback users data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Security &amp; RBAC Control
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            User Accounts &amp; Staff Roles ({users.length})
          </h1>
        </div>
      </div>

      {/* Users & Roles Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto mb-10 shadow-sm">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-mono text-xs font-bold text-black uppercase">
          Authorized Staff Users &amp; Assigned Roles
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Staff Name</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned RBAC Roles</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {users.map((usr) => (
              <tr key={usr.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-bold text-black uppercase">{usr.name}</td>
                <td className="p-4 font-mono font-bold text-black">{usr.mobile}</td>
                <td className="p-4 font-mono text-neutral-500">{usr.email || 'N/A'}</td>
                <td className="p-4 flex gap-1 flex-wrap">
                  {usr.roles?.map((r: any) => (
                    <span key={r.roleId} className="px-2 py-0.5 bg-black text-white font-mono text-[10px] uppercase font-bold">
                      {r.role?.name || 'STAFF'}
                    </span>
                  ))}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
