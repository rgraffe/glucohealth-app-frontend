import { IonButton, IonSelect, IonSelectOption } from '@ionic/react'
import { ReminderTypeSelector } from './reminder-type-selector'
import { FixedReminderFormSection } from './fixed-reminder-form-section'
import { IntervalReminderFormSection } from './interval-reminder-form-section'
import { useFormik } from 'formik'
import { WEEK_DAYS, WEEK_DAYS_TRANSLATIONS } from '~/shared/constants/week-days'

interface FormValues {
  medication: string
  reminderType: 'fixed' | 'interval'
  initialDay: (typeof WEEK_DAYS)[number] | null
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

export function CreateMedicationForm() {
  const { values, setFieldValue, handleSubmit, handleChange } =
    useFormik<FormValues>({
      initialValues: {
        medication: '',
        reminderType: 'fixed',
        initialDay: null,
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
      onSubmit: values => {
        console.log(
          createCronExpression(values),
          JSON.stringify(values, null, 2),
        )
      },
    })

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

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-col gap-8"
    >
      <label>
        <span className="text-2xl">Medicamento</span>
        <IonSelect label="Selecciona el medicamento"></IonSelect>
      </label>

      <label>
        <span className="text-2xl block">Tipo de recordatorio</span>
        <ReminderTypeSelector
          reminderType={values.reminderType}
          setReminderType={type => setFieldValue('reminderType', type)}
        />
      </label>

      <label className="w-full">
        <span className="text-2xl">Día de inicio</span>
        <IonSelect
          onIonChange={e => setFieldValue('initialDay', e.detail.value)}
          className="w-full"
          label="Selecciona el día de inicio"
        >
          {WEEK_DAYS.map(day => (
            <IonSelectOption key={day} value={day}>
              {WEEK_DAYS_TRANSLATIONS[day]}
            </IonSelectOption>
          ))}
        </IonSelect>
      </label>

      {values.reminderType === 'fixed' && (
        <>
          <FixedReminderFormSection
            hours={values.fixedHours}
            addHour={addHour}
            removeHour={removeHour}
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
        <IonButton type="submit" className="w-[40%]">
          Guardar
        </IonButton>
      </footer>
    </form>
  )
}

const createCronExpression = (values: FormValues) => {
  if (values.reminderType === 'fixed') {
    return createFixedCronExpression(values)
  }

  return createIntervalCronExpression(values)
}

const createFixedCronExpression = (values: FormValues) => {
  const hours = values.fixedHours.map(hour => hour.split(':')[0])
  const days = values.initialDay ? [values.initialDay] : WEEK_DAYS

  return `0 0 ${hours.join(',')} * * *`
}

const createIntervalCronExpression = (values: FormValues) => {
  const [initialHour, initialMinute] = values.intervalInitialHour.split(':')
  const finalDate = values.intervalFinalDate
  const shotsQuantity = values.intervalShotsQuantity

  return `* ${initialMinute} ${initialHour} * * *`
}
