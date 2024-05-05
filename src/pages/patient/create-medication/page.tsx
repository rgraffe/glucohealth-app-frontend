import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { CreateMedicationForm } from './components/create-medication-form/create-medication-form'

export function PatientCreateMedicationPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear medicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="flex flex-col gap-5 px-5 pt-12 max-w-2xl mx-auto">
          <CreateMedicationForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
