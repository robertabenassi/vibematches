
// Use env.jest.ts in Jest, otherwise use Vite env
let getViteApiUrl: () => string;
if (typeof process !== 'undefined' && process.env && process.env.JEST_WORKER_ID !== undefined) {
  // Dynamically require env.jest in Jest
  // @ts-ignore
  getViteApiUrl = require('./env.jest').getViteApiUrl;
} else {
  getViteApiUrl = function (): string {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    return 'test-url';
  };
}
export { getViteApiUrl };
