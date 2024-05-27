import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { logout } from '~/features/auth/model/auth'
import { useStore } from '~/shared/store/store'

export function SettingsPage() {
  const history = useHistory()

  const user = useStore(store => store.user)

  function logoutAndRedirect() {
    logout()
    history.push('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de enfermero</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex flex-col px-4 pb-5 justify-between items-center">
          <section>
            <h1 className="text-xl opacity-70">Información personal</h1>
            <ul className="text-xl text-center">
              <li className="text-4xl">{user?.fullName}</li>
              <li className="text-2xl">CI - {user?.nationalId}</li>
              <li className="text-xl">{user?.email}</li>
              <li className="text-xl">{user?.phoneNumber}</li>
            </ul>
          </section>
          <IonButton onClick={logoutAndRedirect} className="w-full">
            Cerrar sesión
          </IonButton>
        </main>
      </IonContent>
    </IonPage>
  )
}
