import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
import { Patient } from '~/shared/types'
import avatar_svg from '~/shared/assets/avatar.svg'
import { ROUTES } from '~/shared/constants/routes'

interface Props {
  patient: Patient
}

export function PatientListItem({ patient }: Props) {
  return (
    <IonItem className="w-full justify-center max-w-xl pb-5 px-5">
      <IonAvatar className="mr-4 w-20 h-20">
        <img alt="" src={avatar_svg} />
      </IonAvatar>
      <div className="w-full flex flex-col">
        <IonLabel>
          <h2>{patient.fullName}</h2>
          <h3>NUI - {patient.nationalId}</h3>
        </IonLabel>
        <IonButton
          href={`${ROUTES.APP.PATIENT.PATH}?id=${patient.id}`}
          className="mb-10"
        >
          Ver Información
        </IonButton>
      </div>
    </IonItem>
  )
}
