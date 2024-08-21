export type Status = 'done' | 'pending' | 'rejected';

export const statusTranslations: Record<Status, { label: string; className: string }> = {
  done: { label: 'Выполнен', className: 'status-done' },
  'pending': { label: 'Готовится', className: 'status-in-process' },
  rejected: { label: 'Отменен', className: 'status-rejected' },
};

