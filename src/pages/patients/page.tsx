import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonIcon,
  IonSearchbar,
  IonFab,
  IonFabButton,
} from '@ionic/react'
import { add } from 'ionicons/icons'
import { ROUTES } from '~/shared/constants/routes'
import { PatientsList } from './components/patients-list/patients-list'

export function PatientsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex flex-col items-center pt-4">
          <header className="w-full flex flex-col items-center justify-center">
            <IonText className="text-center">
              <h1 className="text-3xl">Pacientes</h1>
            </IonText>
            <div className="w-full mt-5 flex flex-col items-center max-w-xl px-8">
              <p className="text-lg">Busque a un paciente</p>
              <IonSearchbar placeholder="Número único de identificación"></IonSearchbar>
            </div>
          </header>
          <div className="w-full mt-4 mb-6 h-[1px] bg-black dark:bg-white" />

          <PatientsList />

          <IonFab className="fixed bottom-5 right-6">
            <IonFabButton routerLink={ROUTES.APP.PATIENTS.PREREGISTER.PATH}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </main>
      </IonContent>
    </IonPage>
  )
}
