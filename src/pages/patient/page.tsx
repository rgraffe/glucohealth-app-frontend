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
  IonButton,
} from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router'
import { QUERY_KEYS } from '~/features/patients/constants'
import { getPatientById } from '~/features/patients/services/get-by-id'
import { TreatmentMedicamentsList } from './components/treatment-list/treatment-list'
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
      try {
        present()
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
    return <></>
  }

  if (isPending || isFetching) return null

  if (isError) return <></>

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
                <h1 className="font-semibold my-0 text-2xl">{data.fullName}</h1>
              ) : (
                <h1 className="font-semibold my-0 text-2xl opacity-50">
                  Nombre sin registrar.
                </h1>
              )}
              <h2 className="text-lg mt-0 text-text-color-step-400">
                CI - {data.nationalId}
              </h2>
            </IonText>

            {data.age ? (
              <IonChip className="w-[fit-content] font-bold" color="primary">
                {data.age} años
              </IonChip>
            ) : (
              <IonChip className="w-[fit-content] font-bold text-opacity-50">
                Edad sin registrar
              </IonChip>
            )}

            <section className="flex w-full justify-evenly">
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    Peso
                  </h2>
                  {data.weightInKg ? (
                    <p className="text-xl font-bold">{data.weightInKg} kg</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    Altura
                  </h2>
                  {data.heightInCm ? (
                    <p className="text-xl font-bold">{data.heightInCm} cm</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    IMC
                  </h2>
                  {data.bmi ? (
                    <p className="text-xl font-bold">{data.bmi.toFixed(1)}</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
            </section>

            <section className="w-full mt-6">
              <div className="flex justify-between">
                <IonText className="text-left">
                  <h2 className="ml-4 text-xl font-bold">Tratamiento</h2>
                </IonText>
                <IonButton
                  size="small"
                  routerLink={`${ROUTES.APP.PATIENT.FULLFILMENT.PATH}?id=${id}`}
                >
                  Ver cumplimiento
                </IonButton>
              </div>
              {data.treatment?.medicaments?.length > 0 ? (
                <TreatmentMedicamentsList
                  treatmentMedicaments={data.treatment.medicaments}
                />
              ) : (
                <p className="ml-4 opacity-50">
                  Este paciente no tiene tratamiento asignado.
                </p>
              )}
            </section>
          </main>

          <IonFab className="fixed bottom-5 right-6">
            <IonFabButton
              routerLink={`${ROUTES.APP.PATIENT.CREATE_MEDICATION.PATH}?treatment-id=${data.treatment.id}`}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  )
}
