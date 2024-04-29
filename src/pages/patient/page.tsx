import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router'
import { QUERY_KEYS } from '~/features/patients/constants'
import { getPatientById } from '~/features/patients/services/get-by-id'
import ExploreContainer from '~/shared/components/ExploreContainer'

export function PatientPage() {
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const id = searchParams.get('id')

  if (!id) {
    //TODO: REDIRECT
    return <h1>Error...</h1>
  }

  const { data, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEYS.PATIENT_DATA],
    queryFn: () => getPatientById(id),
  })

  if (isFetching) return <h1>Cargando...</h1>

  if (isError) return <h1>Error...</h1>

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{JSON.stringify(data)}</IonContent>
    </IonPage>
  )
}
