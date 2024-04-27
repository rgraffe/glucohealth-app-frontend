import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
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
        <main className="w-full h-full flex flex-col justify-center items-center px-5 gap-8">
          <header className="flex flex-col w-full items-center">
            <IonText className="text-center w-4/5">
              <p>
                Para prerregistrar a un paciente solo necesitas su correo
                electrónico. Cuando el paciente inicie sesión en la aplicación
                deberá ingresar sus datos personales.
              </p>
            </IonText>
          </header>

          <PreregisterForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
