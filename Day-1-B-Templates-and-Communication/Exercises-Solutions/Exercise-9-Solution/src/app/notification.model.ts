// Notification interface — defines the shape of notification data
// Note: message and sender are OPTIONAL (marked with ?).
// The sender itself has an optional avatar field.
// Students must handle these missing fields with safe navigation (?.) and nullish coalescing (??)
export interface Notification {
  id: number;
  title: string;
  message?: string;                          // Optional — might be undefined
  sender?: { name: string; avatar?: string }; // Optional — sender might be missing entirely
}
