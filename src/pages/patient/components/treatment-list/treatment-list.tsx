import { TreatmentMedicament } from '~/shared/types/treatment'
import { TreatmentMedicamentsListItem } from './treatment-list-item'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTreatment } from '~/features/treatments/services/update'
import { UpdateTreatmentDto } from '~/features/treatments/dto/update'
import { useIonAlert, useIonLoading } from '@ionic/react'
import { QUERY_KEYS } from '~/features/patients/constants'

interface Props {
  treatmentId: number
  treatmentMedicaments: TreatmentMedicament[]
}

export function TreatmentMedicamentsList({
  treatmentId,
  treatmentMedicaments: medicaments,
}: Props) {
  const [presentAlert] = useIonAlert()
  const [presentLoading, dismissLoading] = useIonLoading()

  const queryClient = useQueryClient()

  const deleteMedicamentMutation = useMutation({
    mutationFn: (medicamentId: number) => {
      const dto = constructUpdateTreatmentDto(medicaments, medicamentId)
      return updateTreatment(treatmentId, dto)
    },
    onMutate: () => {
      presentLoading()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENT_DATA] })
    },
    onError: e => {
      presentAlert(e.message)
    },
    onSettled: () => {
      dismissLoading()
    },
  })

  function executeDeleteMutation(medicamentId: number) {
    deleteMedicamentMutation.mutate(medicamentId)
  }

  return (
    <ul>
      {medicaments.map(m => (
        <TreatmentMedicamentsListItem
          key={m.medicamentId}
          treatmentMedicament={m}
          deleteMedicament={executeDeleteMutation}
        />
      ))}
    </ul>
  )
}

function constructUpdateTreatmentDto(
  treatmentMedicaments: TreatmentMedicament[],
  medicamentToDeleteId: number,
): UpdateTreatmentDto {
  return {
    medicaments: treatmentMedicaments.filter(
      m => m.medicamentId !== medicamentToDeleteId,
    ),
  }
}
