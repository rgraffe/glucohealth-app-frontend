import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PreregisterForm } from './components/preregister-form'

export function PatientPreregisterPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro previo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex justify-center items-center px-5">
          <PreregisterForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
