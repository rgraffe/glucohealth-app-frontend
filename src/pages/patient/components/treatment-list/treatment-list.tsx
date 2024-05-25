import { Treatment, TreatmentMedicament } from '~/shared/types/treatment'
import { TreatmentMedicamentsListItem } from './treatment-list-item'

interface Props {
  treatmentMedicaments: TreatmentMedicament[]
}

export function TreatmentMedicamentsList({
  treatmentMedicaments: medicaments,
}: Props) {
  return (
    <ul>
      {medicaments.map(m => (
        <TreatmentMedicamentsListItem
          key={m.medicamentId}
          treatmentMedicament={m}
        />
      ))}
    </ul>
  )
}
