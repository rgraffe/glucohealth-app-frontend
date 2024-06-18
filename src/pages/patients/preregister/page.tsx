import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PreregisterForm } from './components/preregister-form'
import { PageHeader } from './components/page-header'

export function PatientPreregisterPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro previo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex flex-col justify-center items-center px-5 gap-8">
          <PageHeader text="Para registrar a un nuevo paciente, ingrese el correo electrónico y CI del paciente. Cuando el paciente inicie sesión en su aplicación deberá ingresar sus datos personales." />
          <PreregisterForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
