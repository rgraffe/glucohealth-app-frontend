import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import ExploreContainer from '~/shared/components/ExploreContainer'

export function DashboardPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Panel</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Dashboard page" />
      </IonContent>
    </IonPage>
  )
}
