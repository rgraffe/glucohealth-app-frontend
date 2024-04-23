import { IonPage, IonContent } from '@ionic/react'

import { LoginForm } from './components/login-form'

export function LoginPage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginForm />
      </IonContent>
    </IonPage>
  )
}
