export type RoleName =
  | 'SUPER_ADMIN'
  | 'MANAGEMENT'
  | 'ECOMMERCE_ADMIN'
  | 'CONTENT_MANAGER'
  | 'INVENTORY_ADMIN'
  | 'WAREHOUSE_MANAGER'
  | 'STORE_MANAGER'
  | 'PURCHASE_MANAGER'
  | 'PRODUCTION_MANAGER'
  | 'QUALITY_CONTROLLER'
  | 'STOCK_COUNTER'
  | 'CASHIER'
  | 'CUSTOMER_SUPPORT'
  | 'FINANCE'
  | 'AUDITOR'
  | 'CUSTOMER';

export interface PermissionCheck {
  action: 'READ' | 'WRITE' | 'APPROVE' | 'DELETE' | 'EXPORT';
  resource:
    | 'PRODUCTS'
    | 'INVENTORY'
    | 'ORDERS'
    | 'PURCHASING'
    | 'PRODUCTION'
    | 'POS'
    | 'CMS'
    | 'FINANCE'
    | 'USERS'
    | 'AUDIT';
}

export const ROLE_PERMISSIONS: Record<RoleName, PermissionCheck[]> = {
  SUPER_ADMIN: [
    { action: 'READ', resource: 'PRODUCTS' },
    { action: 'WRITE', resource: 'PRODUCTS' },
    { action: 'DELETE', resource: 'PRODUCTS' },
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'WRITE', resource: 'INVENTORY' },
    { action: 'APPROVE', resource: 'INVENTORY' },
    { action: 'READ', resource: 'ORDERS' },
    { action: 'WRITE', resource: 'ORDERS' },
    { action: 'READ', resource: 'PURCHASING' },
    { action: 'WRITE', resource: 'PURCHASING' },
    { action: 'APPROVE', resource: 'PURCHASING' },
    { action: 'READ', resource: 'PRODUCTION' },
    { action: 'WRITE', resource: 'PRODUCTION' },
    { action: 'READ', resource: 'POS' },
    { action: 'WRITE', resource: 'POS' },
    { action: 'READ', resource: 'CMS' },
    { action: 'WRITE', resource: 'CMS' },
    { action: 'READ', resource: 'FINANCE' },
    { action: 'WRITE', resource: 'FINANCE' },
    { action: 'EXPORT', resource: 'FINANCE' },
    { action: 'READ', resource: 'USERS' },
    { action: 'WRITE', resource: 'USERS' },
    { action: 'READ', resource: 'AUDIT' },
  ],
  MANAGEMENT: [
    { action: 'READ', resource: 'PRODUCTS' },
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'READ', resource: 'ORDERS' },
    { action: 'READ', resource: 'PURCHASING' },
    { action: 'APPROVE', resource: 'PURCHASING' },
    { action: 'READ', resource: 'PRODUCTION' },
    { action: 'READ', resource: 'FINANCE' },
    { action: 'EXPORT', resource: 'FINANCE' },
    { action: 'READ', resource: 'AUDIT' },
  ],
  ECOMMERCE_ADMIN: [
    { action: 'READ', resource: 'PRODUCTS' },
    { action: 'WRITE', resource: 'PRODUCTS' },
    { action: 'READ', resource: 'ORDERS' },
    { action: 'WRITE', resource: 'ORDERS' },
    { action: 'READ', resource: 'CMS' },
    { action: 'WRITE', resource: 'CMS' },
  ],
  CONTENT_MANAGER: [
    { action: 'READ', resource: 'PRODUCTS' },
    { action: 'WRITE', resource: 'PRODUCTS' },
    { action: 'READ', resource: 'CMS' },
    { action: 'WRITE', resource: 'CMS' },
  ],
  INVENTORY_ADMIN: [
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'WRITE', resource: 'INVENTORY' },
    { action: 'APPROVE', resource: 'INVENTORY' },
    { action: 'READ', resource: 'PRODUCTS' },
  ],
  WAREHOUSE_MANAGER: [
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'WRITE', resource: 'INVENTORY' },
    { action: 'READ', resource: 'ORDERS' },
    { action: 'WRITE', resource: 'ORDERS' },
  ],
  STORE_MANAGER: [
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'READ', resource: 'POS' },
    { action: 'WRITE', resource: 'POS' },
    { action: 'READ', resource: 'ORDERS' },
  ],
  PURCHASE_MANAGER: [
    { action: 'READ', resource: 'PURCHASING' },
    { action: 'WRITE', resource: 'PURCHASING' },
    { action: 'READ', resource: 'PRODUCTS' },
  ],
  PRODUCTION_MANAGER: [
    { action: 'READ', resource: 'PRODUCTION' },
    { action: 'WRITE', resource: 'PRODUCTION' },
    { action: 'READ', resource: 'INVENTORY' },
  ],
  QUALITY_CONTROLLER: [
    { action: 'READ', resource: 'PRODUCTION' },
    { action: 'WRITE', resource: 'PRODUCTION' },
    { action: 'READ', resource: 'INVENTORY' },
  ],
  STOCK_COUNTER: [
    { action: 'READ', resource: 'INVENTORY' },
    { action: 'WRITE', resource: 'INVENTORY' },
  ],
  CASHIER: [
    { action: 'READ', resource: 'POS' },
    { action: 'WRITE', resource: 'POS' },
    { action: 'READ', resource: 'PRODUCTS' },
  ],
  CUSTOMER_SUPPORT: [
    { action: 'READ', resource: 'ORDERS' },
    { action: 'WRITE', resource: 'ORDERS' },
    { action: 'READ', resource: 'PRODUCTS' },
  ],
  FINANCE: [
    { action: 'READ', resource: 'FINANCE' },
    { action: 'EXPORT', resource: 'FINANCE' },
    { action: 'READ', resource: 'ORDERS' },
    { action: 'READ', resource: 'PURCHASING' },
  ],
  AUDITOR: [
    { action: 'READ', resource: 'AUDIT' },
    { action: 'READ', resource: 'FINANCE' },
    { action: 'READ', resource: 'INVENTORY' },
  ],
  CUSTOMER: [
    { action: 'READ', resource: 'PRODUCTS' },
  ],
};

export function hasPermission(
  userRoles: RoleName[],
  action: PermissionCheck['action'],
  resource: PermissionCheck['resource']
): boolean {
  return userRoles.some((role) => {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.some(
      (p) => p.action === action && p.resource === resource
    );
  });
}
