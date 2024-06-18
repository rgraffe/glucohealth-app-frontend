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
    PATIENT: {
      PATH: '/app/patient',
      CREATE_MEDICATION: { PATH: '/app/patient/create-medication' },
      FULLFILMENT: { PATH: '/app/patient/fullfilment' },
    },
    SETTINGS: { PATH: '/app/settings' },
  },
}
