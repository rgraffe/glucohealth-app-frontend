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
import { PatientsList } from './components/patients-list/patients-list'
import { ROUTES } from '~/shared/constants/routes'

const examplePatient = {
  id: 'string',
  fullName: 'Anatolia Gómez',
  email: '',
  phoneNumber: '',
  nationalId: '12345678',
  age: 35,
  weightInKg: 60,
  heightInCm: 165,
}

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

          <PatientsList
            patients={[examplePatient, examplePatient, examplePatient]}
          />

          <IonFab
            slot="fixed"
            horizontal="end"
            vertical="bottom"
            className="mb-16 mr-2"
          >
            <IonFabButton routerLink={ROUTES.APP.PATIENTS.PREREGISTER.PATH}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </main>
      </IonContent>
    </IonPage>
  )
}
