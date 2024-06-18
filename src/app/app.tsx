import { Redirect, Route, useHistory } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonRouter,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import './theme/tailwind.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

import './theme/theme.css'

import { TabsLayout } from './layout/tabs-layout'
import {
  DashboardPage,
  LoginPage,
  PatientsPage,
  PatientPreregisterPage,
  SettingsPage,
  PatientPreregisterLoginDataPage,
  PatientPage,
  PatientCreateMedicationPage,
} from '~/pages'
import { ROUTES } from '~/shared/constants/routes'
import Providers from './providers'
import { loginFromLocalStorage } from '~/features/auth/model/auth'
import { PatientFullfilmentPage } from '~/pages/patient/fulfillment/page'

setupIonicReact()

export const App: React.FC = () => {
  try {
    loginFromLocalStorage()
    if (location.pathname === ROUTES.LOGIN.PATH) location.href = ROUTES.APP.PATH
  } catch (e) {
    if (location.pathname !== ROUTES.LOGIN.PATH)
      location.href = ROUTES.LOGIN.PATH
  }

  return (
    <Providers>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path={ROUTES.LOGIN.PATH} component={LoginPage} />
            <Route path={ROUTES.APP.PATH}>
              <TabsLayout>
                <IonRouterOutlet>
                  <Route
                    exact
                    path={ROUTES.APP.DASHBOARD.PATH}
                    component={DashboardPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENTS.PATH}
                    component={PatientsPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENTS.PREREGISTER.PATH}
                    component={PatientPreregisterPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENTS.PREREGISTER.LOGIN_DATA.PATH}
                    component={PatientPreregisterLoginDataPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.SETTINGS.PATH}
                    component={SettingsPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENT.CREATE_MEDICATION.PATH}
                    component={PatientCreateMedicationPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENT.FULLFILMENT.PATH}
                    component={PatientFullfilmentPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENT.PATH}
                    component={PatientPage}
                  />

                  <Redirect
                    exact
                    from={ROUTES.APP.PATH}
                    to={ROUTES.APP.DASHBOARD.PATH}
                  />
                </IonRouterOutlet>
              </TabsLayout>
            </Route>

            <Redirect exact from={ROUTES.ROOT} to={ROUTES.LOGIN.PATH} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Providers>
  )
}
