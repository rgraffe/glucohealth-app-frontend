import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { home, person, settings } from 'ionicons/icons'
import { ROUTES } from '~/shared/constants/routes'

interface Props {
  children: React.ReactNode
}

export function TabsLayout({ children }: Props) {
  return (
    <IonTabs>
      {children}

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href={ROUTES.APP.DASHBOARD.PATH}>
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Panel</IonLabel>
        </IonTabButton>
        <IonTabButton tab="patients" href={ROUTES.APP.PATIENTS.PATH}>
          <IonIcon aria-hidden="true" icon={person} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href={ROUTES.APP.SETTINGS.PATH}>
          <IonIcon aria-hidden="true" icon={settings} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
