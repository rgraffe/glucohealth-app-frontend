import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react'
import { Patient } from '~/shared/types/patient'
import avatar_svg from '~/shared/assets/avatar.svg'
import { ROUTES } from '~/shared/constants/routes'

interface Props {
  patient: Patient
}

export function PatientListItem({ patient }: Props) {
  return (
    <IonCard className="flex flex-row px-5 pt-3" mode="ios">
      <IonAvatar className="w-14 h-14 mr-5">
        <img alt="" src={avatar_svg} />
      </IonAvatar>
      <div>
        <IonLabel>
          <h2>{patient.fullName}</h2>
          <h3>CI - {patient.nationalId}</h3>
        </IonLabel>

        <div className="flex justify-center">
          <IonButton
            routerLink={`${ROUTES.APP.PATIENT.PATH}?id=${patient.id}`}
            className="mb-4 mt-4 w-52"
            fill="outline"
          >
            Ver Información
          </IonButton>
        </div>
      </div>
    </IonCard>
  )
}
