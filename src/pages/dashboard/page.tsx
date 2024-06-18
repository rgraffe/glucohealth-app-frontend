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
  IonButton,
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
        <main className="w-full h-full flex flex-col px-4 max-w-xl m-auto">
          <IonCard routerLink={ROUTES.APP.PATIENTS.PATH} className="min-h-6">
            <img src={patientsImg}></img>
            <IonCardHeader>
              <IonCardTitle>Pacientes</IonCardTitle>
              <IonIcon icon={person} slot="end" />
            </IonCardHeader>
            <IonCardContent className="-mt-2">
              Ver la lista de pacientes, buscar a un paciente por su
              C.I., añadir nuevos pacientes y asignar
              tratamientos.
            </IonCardContent>
            <div className="flex justify-end">
              <IonButton fill="clear">Visitar sección</IonButton>
            </div>
          </IonCard>
        </main>
      </IonContent>
    </IonPage>
  )
}
