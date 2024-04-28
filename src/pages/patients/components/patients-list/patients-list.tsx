import { IonList } from '@ionic/react'
import { PatientListItem } from './patient-list-item'
import { getPaginatedPatients } from '~/features/patients/services/get-paginated'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'

export function PatientsList() {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEYS.PATIENTS_LIST],
    queryFn: getPaginatedPatients,
  })

  if (isPending || isFetching) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error dad...</h1>
  }

  return (
    <IonList className="overflow-y-scroll max-w-xl flex flex-col gap-5 w-full">
      {data.items.length ? (
        data.items.map(p => <PatientListItem key={p.id} patient={p} />)
      ) : (
        <h5 className="text-center">No hay pacientes registrados.</h5>
      )}
    </IonList>
  )
}
