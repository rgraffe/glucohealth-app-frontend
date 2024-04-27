import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
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

/* Theme variables */
import './theme/variables.css'

import { TabsLayout } from './layout/tabs-layout'
import { DashboardPage, LoginPage, PatientsPage, SettingsPage } from '~/pages'
import { ROUTES } from '~/shared/constants/routes'

setupIonicReact()

export const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.APP.ROOT}>
          <TabsLayout>
            <IonRouterOutlet>
              <Route
                path={ROUTES.APP.DASHBOARD.ROOT}
                component={DashboardPage}
              />
              <Route path={ROUTES.APP.PATIENTS.ROOT} component={PatientsPage} />
              <Route path={ROUTES.APP.SETTINGS.ROOT} component={SettingsPage} />

              <Redirect
                exact
                from={ROUTES.APP.ROOT}
                to={ROUTES.APP.DASHBOARD.ROOT}
              />
            </IonRouterOutlet>
          </TabsLayout>
        </Route>

        <Redirect exact from={ROUTES.ROOT} to={ROUTES.LOGIN} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)
