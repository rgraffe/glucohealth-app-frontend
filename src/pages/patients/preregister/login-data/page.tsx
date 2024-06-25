import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonInput,
  IonIcon,
  IonButton,
  IonTextarea,
} from '@ionic/react'
import { PageHeader } from '../components/page-header'
import { key, mail } from 'ionicons/icons'
import { useParams, useLocation } from 'react-router'
import { decrypt } from '~/shared/utils/aes-encryption'
import { ROUTES } from '~/shared/constants/routes'

export function PatientPreregisterLoginDataPage() {
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const encryptedEmail = searchParams.get('e')
  const encryptedPassword = searchParams.get('p')

  if (!encryptedEmail || !encryptedPassword) {
    //TODO: REDIRECT
    return <h1>Error</h1>
  }

  const email = decrypt(encryptedEmail)
  const password = decrypt(encryptedPassword)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro previo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="w-full h-full flex flex-col justify-center items-center px-5 gap-8">
          <h3 className="ml-4 text-xl font-bold">
            Inicio de sesión del usuario
          </h3>

          <section>
            <div className="flex items-center">
              <IonIcon icon={mail} className="w-20 h-8" />
              <IonInput
                label="Correo electrónico"
                labelPlacement="stacked"
                value={email}
                disabled={true}
              />
            </div>
            <div className="flex items-center">
              <IonIcon icon={key} className="w-20 h-8" />
              <IonInput
                label="Contraseña (Provisional)"
                labelPlacement="stacked"
                value={password}
                disabled={true}
              />
            </div>
          </section>

          <section className="flex justify-center items-center w-full mt-5">
            <p className="text-center">
              Estos datos también serán enviados al correo electrónico del
              usuario.
            </p>
          </section>

          <IonButton routerLink={ROUTES.APP.PATIENTS.PATH}>
            Volver a lista de pacientes
          </IonButton>
        </main>
      </IonContent>
    </IonPage>
  )
}
