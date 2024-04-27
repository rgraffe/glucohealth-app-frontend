import { IonText } from '@ionic/react'

export function PageHeader() {
  return (
    <header className="flex flex-col w-full items-center">
      <IonText className="text-center w-4/5">
        <p>
          Para prerregistrar a un paciente solo necesitas su correo electrónico.
          Cuando el paciente inicie sesión en la aplicación deberá ingresar sus
          datos personales.
        </p>
      </IonText>
    </header>
  )
}
