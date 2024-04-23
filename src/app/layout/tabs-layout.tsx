import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { triangle, ellipse, square } from 'ionicons/icons'
import { ROUTES } from '~/shared/constants/routes'

interface Props {
  children: React.ReactNode
}

export function TabsLayout({ children }: Props) {
  return (
    <IonTabs>
      {children}

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href={ROUTES.DASHBOARD.TAB1}>
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href={ROUTES.DASHBOARD.TAB2}>
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href={ROUTES.DASHBOARD.TAB3}>
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
