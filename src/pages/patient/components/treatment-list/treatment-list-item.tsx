import { IonButton, IonIcon, IonText } from '@ionic/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { pencil, trash } from 'ionicons/icons'
import { QUERY_KEYS } from '~/features/medicaments/constants'
import { getMedicamentById } from '~/features/medicaments/services/get-by-id'
import injector_icon_svg from '~/shared/assets/injector-icon.svg'
import { TreatmentMedicament } from '~/shared/types/treatment'

interface Props {
  treatmentMedicament: TreatmentMedicament
}

export function TreatmentMedicamentsListItem({ treatmentMedicament }: Props) {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.MEDICAMENT_INFO],
    queryFn: () => getMedicamentById(treatmentMedicament.medicamentId + ''),
  })

  return (
    <li>
      <header>
        <IonText className="flex items-center">
          <ul className="text-md font-thin my-0 w-[30%] text-center">
            {treatmentMedicament.takingSchedules.map(ts => (
              <li>{ts.takingSchedule}</li>
            ))}
          </ul>
          <h3 className="text-2xl my-0">{data?.tradeName}</h3>

          <div className="flex justify-end flex-grow gap-3">
            <IonIcon
              className="hover:cursor-pointer"
              icon={pencil}
              size="large"
            />
            <IonIcon
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
          {/* TODO: AMOUNT OF MEDICAMENT */}
          <h5 className="my-0">{}</h5>
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
      <footer className="w-full flex justify-end px-5">
        <IonButton size="small" className="w-[70%]">
          Ver cumplimiento
        </IonButton>
      </footer>
    </li>
  )
}
