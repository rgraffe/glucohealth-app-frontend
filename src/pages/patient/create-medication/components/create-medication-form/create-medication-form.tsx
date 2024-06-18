import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonModal,
  IonSpinner,
  useIonLoading,
} from '@ionic/react'
import { ReminderTypeSelector } from './reminder-type-selector'
import { FixedReminderFormSection } from './fixed-reminder-form-section'
import { IntervalReminderFormSection } from './interval-reminder-form-section'
import { useFormik } from 'formik'
import Typeahead from '../typeahead/typeahead'
import { useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaginatedMedicaments } from '~/features/medicaments/services/get-paginated'
import { QUERY_KEYS } from '~/features/medicaments/constants'
import { QUERY_KEYS as PATIENTS_QUERY_KEYS } from '~/features/patients/constants'
import { Treatment } from '~/shared/types/treatment'
import { createMedicationFormValuesSchema } from './form-values-schema'
import { updateTreatment } from '~/features/treatments/services/update'
import { constructUpdateTreatmentDto } from './construct-dto'
import { useHistory } from 'react-router'

export interface CreateMedicationFormValues {
  medicamentId: number | null
  dose: string
  reminderType: 'fixed' | 'interval'
  initialDate: Date
  hasFinalization: boolean
  fixedHours: string[]
  fixedFinalizationType: 'by-duration' | 'by-shots-quantity' | null
  fixedDurationQuantity: number
  fixedDurationUnit: 'hours' | 'days' | 'weeks'
  fixedShotsQuantity: number
  intervalInitialHour: string
  intervalFinalizationType: 'by-final-date' | 'by-shots-quantity' | null
  intervalFinalDate: Date
  intervalShotsQuantity: number
}

export function CreateMedicationForm({ treatment }: { treatment: Treatment }) {
  const history = useHistory()

  const queryClient = useQueryClient()

  const [present, dismiss] = useIonLoading()

  const { values, setFieldValue, handleSubmit, handleChange, isValid } =
    useFormik<CreateMedicationFormValues>({
      initialValues: {
        medicamentId: null,
        dose: '',
        reminderType: 'fixed',
        initialDate: new Date(),
        hasFinalization: true,
        fixedHours: [],
        fixedFinalizationType: null,
        fixedDurationQuantity: 0,
        fixedDurationUnit: 'days',
        fixedShotsQuantity: 0,
        intervalInitialHour: '',
        intervalFinalizationType: null,
        intervalFinalDate: new Date(),
        intervalShotsQuantity: 0,
      },
      validateOnMount: true,
      validationSchema: createMedicationFormValuesSchema,
      onSubmit: async values => {
        try {
          present()

          await updateTreatment(
            treatment.id,
            constructUpdateTreatmentDto(treatment, values),
          )

          await queryClient.invalidateQueries({
            queryKey: [PATIENTS_QUERY_KEYS.PATIENT_DATA],
          })

          history.goBack()
        } catch (e) {
          console.error(e)
        } finally {
          dismiss()
        }
      },
    })

  const { data } = useQuery({
    queryFn: () => getPaginatedMedicaments({ pageIndex: 1, itemsPerPage: 500 }),
    queryKey: [QUERY_KEYS.MEDICAMENTS_LIST],
  })

  const medicamentSelectionModal = useRef<HTMLIonModalElement>(null)

  function addHour(hour: string) {
    hour = hour.split('T')[1].slice(0, 5)

    if (values.fixedHours.includes(hour)) return

    setFieldValue('fixedHours', [...values.fixedHours, hour])
  }

  function removeHour(hour: string) {
    setFieldValue(
      'fixedHours',
      values.fixedHours.filter(h => h !== hour),
    )
  }

  function medicamentSelectionChanged(medicamentId: number) {
    setFieldValue('medicamentId', medicamentId)
    medicamentSelectionModal.current?.dismiss()
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-col gap-8"
    >
      <label className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold block">Medicamento</span>
          {values.medicamentId !== null ? (
            <span className="text-xl">
              {data?.items.find(m => m.id === values.medicamentId)?.tradeName}
            </span>
          ) : (
            <span className="text-md italic opacity-70">No seleccionado</span>
          )}
        </div>
        {data !== undefined ? (
          <>
            <IonButton className="w-full h-[50px]" id="select-medicament">
              Seleccionar medicamento
            </IonButton>
            <IonModal
              trigger="select-medicament"
              ref={medicamentSelectionModal}
            >
              <Typeahead
                items={data.items.map(m => ({
                  text: m.tradeName,
                  value: m.id,
                }))}
                selectedItem={values.medicamentId}
                title="Medicamentos"
                onSelectionChange={medicamentSelectionChanged}
                onSelectionCancel={() =>
                  medicamentSelectionModal.current?.dismiss()
                }
              ></Typeahead>
            </IonModal>
          </>
        ) : (
          <>
            <IonButton className="w-full opacity-60 h-[50px]">
              <IonSpinner slot="" />
            </IonButton>
          </>
        )}
      </label>

      <label>
        <span className="text-2xl block">Dosis de la medicación</span>
        <IonInput
          onIonChange={e => setFieldValue('dose', e.detail.value)}
          placeholder="500 mg"
        ></IonInput>
      </label>

      <label>
        <span className="text-xl font-bold block">Tipo de recordatorio</span>
        <ReminderTypeSelector
          reminderType={values.reminderType}
          setReminderType={type => setFieldValue('reminderType', type)}
        />
      </label>

      <label className="w-full flex justify-between">
        <span className="text-xl font-bold block">Fecha de inicio</span>
        <label className="flex justify-center gap-2">
          <IonDatetimeButton datetime="initial-date-picker"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              value={values.initialDate.toISOString()}
              onIonChange={e =>
                setFieldValue('initialDate', new Date(e.detail.value as string))
              }
              id="initial-date-picker"
              presentation="date"
            ></IonDatetime>
          </IonModal>
        </label>
      </label>

      {values.reminderType === 'fixed' && (
        <>
          <FixedReminderFormSection
            hours={values.fixedHours}
            addHour={addHour}
            removeHour={removeHour}
            hasFinalization={values.hasFinalization}
            setHasFinalization={has => setFieldValue('hasFinalization', has)}
            finalizationType={values.fixedFinalizationType}
            setFinalizationType={type =>
              setFieldValue('fixedFinalizationType', type)
            }
            durationQuantity={values.fixedDurationQuantity}
            setDurationQuantity={quantity =>
              setFieldValue('fixedDurationQuantity', quantity)
            }
            durationUnit={values.fixedDurationUnit}
            setDurationUnit={unit => setFieldValue('fixedDurationUnit', unit)}
            shotsQuantity={values.fixedShotsQuantity}
            setShotsQuantity={quantity =>
              setFieldValue('fixedShotsQuantity', quantity)
            }
          />
        </>
      )}

      {values.reminderType === 'interval' && (
        <IntervalReminderFormSection
          initialHour={values.intervalInitialHour}
          setInitialHour={hour => setFieldValue('intervalInitialHour', hour)}
          hasFinalization={values.hasFinalization}
          setHasFinalization={has => setFieldValue('hasFinalization', has)}
          finalizationType={values.intervalFinalizationType}
          setFinalizationType={type =>
            setFieldValue('intervalFinalizationType', type)
          }
          finalDate={values.intervalFinalDate}
          setFinalDate={date => setFieldValue('intervalFinalDate', date)}
          shotsQuantity={values.intervalShotsQuantity}
          setShotsQuantity={quantity =>
            setFieldValue('intervalShotsQuantity', quantity)
          }
        />
      )}

      <footer className="w-full flex justify-end">
        <IonButton
          type="submit"
          className={`w-[40%] ${isValid ? 'opacity-100' : 'opacity-60'}`}
        >
          Guardar
        </IonButton>
      </footer>
    </form>
  )
}
