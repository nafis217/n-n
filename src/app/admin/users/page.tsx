import React from 'react';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    include: {
      roles: { include: { role: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const auditLogs = await db.auditLog.findMany({
    take: 15,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Security &amp; RBAC Control
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            User Accounts &amp; Audit Logs
          </h1>
        </div>
      </div>

      {/* Users & Roles Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Authorized Staff Users &amp; Assigned Roles
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
              <th className="p-4">Staff Name</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned RBAC Roles</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
            {users.map((usr) => (
              <tr key={usr.id} className="hover:bg-white transition-colors">
                <td className="p-4 font-bold text-primary uppercase">{usr.name}</td>
                <td className="p-4 font-bold">{usr.mobile}</td>
                <td className="p-4">{usr.email || 'N/A'}</td>
                <td className="p-4 flex gap-1 flex-wrap">
                  {usr.roles.map((r) => (
                    <span key={r.roleId} className="px-2 py-0.5 bg-primary text-on-primary font-label-caps text-[10px] uppercase font-bold">
                      {r.role.name}
                    </span>
                  ))}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-label-caps text-[10px] font-bold uppercase">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Immutable Audit Log History */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Platform Security Audit Log (Last 15 Actions)
        </h3>
        <div className="flex flex-col divide-y divide-outline-variant">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
              <div>
                <span className="font-bold text-primary uppercase">{log.action}</span> — {log.entityName} ({log.entityId})
                {log.reason && <p className="text-[11px] text-secondary">Reason: {log.reason}</p>}
              </div>
              <span className="font-label-caps text-[11px] text-outline">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
