export const ROUTES = {
  ROOT: '/',
  LOGIN: { PATH: '/login' },
  APP: {
    PATH: '/app',
    DASHBOARD: { PATH: '/app/dashboard' },
    PATIENTS: {
      PATH: '/app/patients',
      PREREGISTER: { PATH: '/app/patients/preregister' },
    },
    SETTINGS: { PATH: '/app/settings' },
  },
}
