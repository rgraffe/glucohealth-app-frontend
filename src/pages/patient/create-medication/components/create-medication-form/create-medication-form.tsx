import { IonButton, IonSelect, IonSelectOption } from '@ionic/react'
import { useState } from 'react'
import { ReminderTypeSelector } from './reminder-type-selector'
import { FixedReminderFormSection } from './fixed-reminder-form-section'
import { IntervalReminderFormSection } from './interval-reminder-form-section'

export function CreateMedicationForm() {
  const [reminderType, setReminderType] = useState<'fixed' | 'interval'>(
    'fixed',
  )
  const [fixedHours, setFixedHours] = useState<string[]>([])
  const [fixedFinalizationType, setFixedFinalizationType] = useState<
    'by-duration' | 'by-shots-quantity' | null
  >(null)

  const [intervalInitialHour, setIntervalInitalHour] = useState('')
  const [intervalFinalizationType, setIntervalFinalizationType] = useState<
    'by-final-date' | 'by-shots-quantity' | null
  >(null)

  function addHour(hour: string) {
    hour = hour.split('T')[1].slice(0, 5)

    if (fixedHours.includes(hour)) return

    setFixedHours([...fixedHours, hour])
  }

  function removeHour(hour: string) {
    setFixedHours(fixedHours.filter(h => h !== hour))
  }

  return (
    <form className="flex flex-col gap-8">
      <label>
        <span className="text-2xl">Medicamento</span>
        <IonSelect label="Selecciona el medicamento"></IonSelect>
      </label>

      <label>
        <span className="text-2xl block">Tipo de recordatorio</span>
        <ReminderTypeSelector
          reminderType={reminderType}
          setReminderType={setReminderType}
        />
      </label>

      <label className="w-full">
        <span className="text-2xl">Día de inicio</span>
        <IonSelect className="w-full" label="Selecciona el día de inicio">
          {[
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo',
          ].map(day => (
            <IonSelectOption key={day} value={day}>
              {day}
            </IonSelectOption>
          ))}
        </IonSelect>
      </label>

      {reminderType === 'fixed' && (
        <>
          <FixedReminderFormSection
            hours={fixedHours}
            addHour={addHour}
            removeHour={removeHour}
            finalizationType={fixedFinalizationType}
            setFinalizationType={setFixedFinalizationType}
          />
        </>
      )}

      {reminderType === 'interval' && (
        <IntervalReminderFormSection
          initialHour={intervalInitialHour}
          setInitialHour={setIntervalInitalHour}
          finalizationType={intervalFinalizationType}
          setFinalizationType={setIntervalFinalizationType}
        />
      )}

      <footer className="w-full flex justify-end">
        <IonButton className="w-[40%]">Guardar</IonButton>
      </footer>
    </form>
  )
}
