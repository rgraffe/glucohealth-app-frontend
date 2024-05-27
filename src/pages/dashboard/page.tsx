import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
} from '@ionic/react'
import { person } from 'ionicons/icons'
import { ROUTES } from '~/shared/constants/routes'
import patientsImg from '~/shared/assets/patients-image.avif'

export function DashboardPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex flex-col px-4">
          <IonCard routerLink={ROUTES.APP.PATIENTS.PATH} className="min-h-6">
            <img src={patientsImg}></img>
            <IonCardHeader>
              <IonCardTitle>Pacientes</IonCardTitle>
              <IonCardSubtitle>Visitar sección</IonCardSubtitle>
              <IonIcon icon={person} slot="end" />
            </IonCardHeader>
            <IonCardContent className="-mt-2">
              Podrás ver la lista de pacientes y buscar a un paciente por su
              C.I. Además de poder añadir a nuevos pacientes y asignarle
              tratamientos a los ya existentes.
            </IonCardContent>
          </IonCard>
        </main>
      </IonContent>
    </IonPage>
  )
}
