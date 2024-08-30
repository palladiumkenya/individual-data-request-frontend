// stores.js
import { writable } from 'svelte/store';

export const tableData = writable([]);
export const currentStage = writable('all');
