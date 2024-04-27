import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import ExploreContainer from '~/shared/components/ExploreContainer'

export function SettingsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Configuración</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Settings page" />
      </IonContent>
    </IonPage>
  )
}
