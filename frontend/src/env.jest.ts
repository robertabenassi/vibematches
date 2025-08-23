
export function getViteApiUrl(): string {
  // Avoid import.meta in Jest environment
    return process.env.VITE_API_URL || 'test-url';
}
