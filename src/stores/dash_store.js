// dash_stores.js
import { derived, writable } from 'svelte/store';

export const tableData = writable([]);
export const selectedCategory = writable('total');

export const requestCounts = derived(tableData, ($tableData) => {
  return {
    total: $tableData.length,
    approved: $tableData.filter((request) => request.Status === 'approved').length,
    inProgress: $tableData.filter((request) => request.Status === 'in progress')
      .length,
    pending: $tableData.filter((request) => request.Status === 'pending')
        .length,
    completed: $tableData.filter((request) => request.Status === 'complete')
      .length,
    assigned: $tableData.filter((request) => request.Status === 'assigned')
        .length,
    reviewStage: $tableData.filter((request) => request.Status === 'review stage')
        .length,
  };
});
