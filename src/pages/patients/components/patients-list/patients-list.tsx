import { IonList } from '@ionic/react'
import { Patient } from '~/shared/types'
import { PatientListItem } from './patient-list-item'

interface Props {
  patients: Patient[]
}

export function PatientsList({ patients }: Props) {
  return (
    <IonList className="overflow-y-scroll max-w-xl flex flex-col gap-5 w-full">
      {patients.map(p => (
        <PatientListItem key={p.id} patient={p} />
      ))}
    </IonList>
  )
}
