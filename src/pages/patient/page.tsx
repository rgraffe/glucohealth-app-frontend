import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonChip,
  useIonLoading,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router'
import { QUERY_KEYS } from '~/features/patients/constants'
import { getPatientById } from '~/features/patients/services/get-by-id'
import { TreatmentList } from './components/treatment-list/treatment-list'
import { add } from 'ionicons/icons'
import { ROUTES } from '~/shared/constants/routes'

export function PatientPage() {
  const [present, dismiss] = useIonLoading()

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const id = searchParams.get('id')

  const { data, isPending, isFetching, isError } = useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.PATIENT_DATA],
    queryFn: async () => {
      present()
      try {
        const patient = await getPatientById(id!)
        return patient
      } catch (e) {
        throw e
      } finally {
        dismiss()
      }
    },
  })

  if (!id) {
    //TODO: REDIRECT
    return <h1>Error...</h1>
  }

  if (isPending || isFetching) return null

  if (isError) return <h1>Error...</h1>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Paciente</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <main className="flex flex-col w-full h-full pt-7 px-4 items-center max-w-3xl m-auto">
            <IonText className="text-center flex flex-col gap-2 text-balance">
              {data.fullName ? (
                <h1 className="font-semibold my-0 text-3xl">{data.fullName}</h1>
              ) : (
                <h1 className="font-semibold my-0 text-3xl opacity-50">
                  Nombre sin registrar.
                </h1>
              )}
              <h2 className="text-xl my-0">NUI - {data.nationalId}</h2>
            </IonText>

            {data.age ? (
              <IonChip className="w-[fit-content] mt-5 text-lg">
                {data.age} años
              </IonChip>
            ) : (
              <IonChip className="w-[fit-content] mt-5 text-lg text-opacity-50">
                Edad sin registrar.
              </IonChip>
            )}

            <section className="flex w-full justify-evenly">
              <div>
                <IonText className="text-center">
                  <h3>Peso</h3>
                  {data.weightInKg ? (
                    <p>{data.weightInKg}</p>
                  ) : (
                    <p className="opacity-50">Sin registrar.</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText className="text-center">
                  <h3>Altura</h3>
                  {data.heightInCm ? (
                    <p>{data.heightInCm}</p>
                  ) : (
                    <p className="opacity-50">Sin registrar.</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText>
                  <h3>IMC</h3>
                  {data.bmi ? (
                    <p>{data.bmi.toFixed(1)}</p>
                  ) : (
                    <p className="opacity-50">Sin registrar.</p>
                  )}
                </IonText>
              </div>
            </section>

            <section className="w-full mt-6">
              <IonText className="text-left">
                <h2 className="text-3xl font-bold">Tratamiento</h2>
              </IonText>
              {/*  <p className="opacity-50">Este paciente no tiene tratamiento.</p> */}
              <TreatmentList />
            </section>
          </main>

          <IonFab className="fixed bottom-5 right-6">
            <IonFabButton
              routerLink={ROUTES.APP.PATIENT.CREATE_MEDICATION.PATH}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  )
}
