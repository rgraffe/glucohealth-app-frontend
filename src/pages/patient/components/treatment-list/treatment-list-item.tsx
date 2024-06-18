import { IonButton, IonCard, IonIcon, IonText } from '@ionic/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { pencil, trash } from 'ionicons/icons'
import { QUERY_KEYS } from '~/features/medicaments/constants'
import { getMedicamentById } from '~/features/medicaments/services/get-by-id'
import injector_icon_svg from '~/shared/assets/injector-icon.svg'
import { TreatmentMedicament } from '~/shared/types/treatment'

interface Props {
  treatmentMedicament: TreatmentMedicament
  deleteMedicament: (medicamentId: number) => void
}

export function TreatmentMedicamentsListItem({
  treatmentMedicament,
  deleteMedicament,
}: Props) {
  const { data } = useQuery({
    queryKey: [
      `${QUERY_KEYS.MEDICAMENT_INFO}-${treatmentMedicament.medicamentId}`,
    ],
    queryFn: () => getMedicamentById(treatmentMedicament.medicamentId + ''),
  })

  return (
    <IonCard className="pb-4 pt-2">
      <header>
        <IonText className="flex items-center">
          <div className="w-[30%]"></div>
          <h3 className="text-2xl my-0">{data?.tradeName}</h3>

          <div className="flex justify-end flex-grow pr-5 pt-3">
            <IonIcon
              onClick={() => deleteMedicament(treatmentMedicament.medicamentId)}
              className="hover:cursor-pointer"
              icon={trash}
              size="large"
            />
          </div>
        </IonText>
      </header>
      <section className="flex items-center">
        <IonIcon src={injector_icon_svg} className="h-[40px] w-[30%]" />
        <IonText className="flex flex-col gap-3">
          <h5 className="my-0">{treatmentMedicament.dose}</h5>
          <p>
            Periodo:{' '}
            {treatmentMedicament.takingSchedulesStartingTimestamp.split('T')[0]}{' '}
            -{' '}
            {treatmentMedicament.takingSchedulesEndingTimestamp?.split(
              'T',
            )[0] ?? 'Indefinido'}
          </p>
        </IonText>
      </section>
    </IonCard>
  )
}
