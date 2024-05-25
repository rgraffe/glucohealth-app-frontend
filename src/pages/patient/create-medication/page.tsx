import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
} from '@ionic/react'
import { CreateMedicationForm } from './components/create-medication-form/create-medication-form'
import { useLocation } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getTreatmentById } from '~/features/treatments/services/get-by-id'
import { QUERY_KEYS } from '~/features/treatments/constants'

export function PatientCreateMedicationPage() {
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const treatmentId = searchParams.get('treatment-id')

  if (!treatmentId) {
    //TODO: Redirection
    return <></>
  }

  const { data, isSuccess } = useQuery({
    enabled: !!treatmentId,
    queryFn: () => getTreatmentById(treatmentId),
    queryKey: [QUERY_KEYS.TREATMENT_DATA],
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear medicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="flex flex-col gap-5 px-5 pt-12 max-w-2xl mx-auto">
          {!isSuccess ? (
            <div className="w-full h-full flex justify-center items-center">
              <IonSpinner />
            </div>
          ) : (
            <CreateMedicationForm treatment={data} />
          )}
        </main>
      </IonContent>
    </IonPage>
  )
}
