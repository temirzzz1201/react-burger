export type Status = 'done' | 'in process' | 'rejected';

export const statusTranslations: Record<Status, { label: string; className: string }> = {
  done: { label: 'Выполнен', className: 'status-done' },
  'in process': { label: 'Готовится', className: 'status-in-process' },
  rejected: { label: 'Отменен', className: 'status-rejected' },
};

