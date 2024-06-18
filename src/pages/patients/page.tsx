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
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main>
          <header
            slot="fixed"
            className={`pt-10 pb-5 ${isDarkMode ? 'bg-bg-datetime-customized-color-dark' : 'bg-bg-datetime-customized-color-light'}`}
          >
            <span className="ml-4 font-bold text-lg">Buscar paciente</span>
            <IonText className="">
              <IonSearchbar
                mode="ios"
                placeholder="Cédula de identidad"
              ></IonSearchbar>
            </IonText>
          </header>
          <h1 className="ml-4 text-xl font-bold">Lista de Pacientes</h1>
          <section className="w-full h-full flex flex-col items-center">
            <PatientsList />

            <IonFab className="fixed bottom-5 right-6">
              <IonFabButton routerLink={ROUTES.APP.PATIENTS.PREREGISTER.PATH}>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
          </section>
        </main>
      </IonContent>
    </IonPage>
  )
}
