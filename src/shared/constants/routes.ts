export const ROUTES = {
  ROOT: '/',
  LOGIN: { PATH: '/login' },
  APP: {
    PATH: '/app',
    DASHBOARD: { PATH: '/app/dashboard' },
    PATIENTS: {
      PATH: '/app/patients',
      PREREGISTER: {
        PATH: '/app/patients/preregister',
        LOGIN_DATA: { PATH: '/app/patients/preregister/login-data' },
      },
    },
    SETTINGS: { PATH: '/app/settings' },
  },
}
