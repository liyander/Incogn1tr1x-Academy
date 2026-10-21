const emptyResult = async () => [[]]
export const pool = { query: emptyResult, execute: emptyResult }
export async function testConnection() { return true }
export async function initializeDatabaseIfNeeded() { return true }
