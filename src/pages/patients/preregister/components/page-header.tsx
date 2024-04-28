import { IonText } from '@ionic/react'

interface Props {
  text: string
}

export function PageHeader({ text }: Props) {
  return (
    <header className="flex flex-col w-full items-center">
      <IonText className="text-center w-4/5">
        <p>{text}</p>
      </IonText>
    </header>
  )
}
