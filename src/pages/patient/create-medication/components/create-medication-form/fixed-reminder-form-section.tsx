import {
  IonDatetimeButton,
  IonText,
  IonIcon,
  IonModal,
  IonDatetime,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonCheckbox,
} from '@ionic/react'
import { add, removeCircle } from 'ionicons/icons'
import { ByShotsQuantityInput } from './by-shots-quantity-input'

interface Props {
  hours: string[]
  addHour: (hour: string) => void
  removeHour: (hour: string) => void
  hasFinalization: boolean
  setHasFinalization: (has: boolean) => void
  finalizationType: 'by-duration' | 'by-shots-quantity' | null
  setFinalizationType: (type: 'by-duration' | 'by-shots-quantity') => void
  durationQuantity: number
  setDurationQuantity: (quantity: number) => void
  durationUnit: 'hours' | 'days' | 'weeks'
  setDurationUnit: (unit: 'hours' | 'days' | 'weeks') => void
  shotsQuantity: number
  setShotsQuantity: (quantity: number) => void
}

export function FixedReminderFormSection({
  hours,
  addHour,
  removeHour,
  hasFinalization,
  setHasFinalization,
  finalizationType,
  setFinalizationType,
  durationQuantity,
  setDurationQuantity,
  durationUnit,
  setDurationUnit,
  shotsQuantity,
  setShotsQuantity,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="flex justify-between items-center">
          <span className="text-xl font-bold block">Hora</span>

          <IonDatetimeButton datetime="hour-input">
            <IonText slot="time-target" className="flex items-center gap-2">
              <IonIcon icon={add} />
              Añadir
            </IonText>
          </IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              value={new Date().toISOString()}
              onIonChange={e => addHour(e.detail.value as string)}
              showDefaultButtons
              id="hour-input"
              presentation="time"
            ></IonDatetime>
          </IonModal>
        </label>

        {hours.length ? (
          <ul className="flex flex-wrap gap-2 justify-center">
            {hours.map(h => (
              <li key={h}>
                <IonChip className="text-lg">
                  {h}{' '}
                  <IonIcon icon={removeCircle} onClick={() => removeHour(h)} />
                </IonChip>
              </li>
            ))}
          </ul>
        ) : (
          <h4 className="italic opacity-50 text-sm">
            No has registrado ninguna hora.
          </h4>
        )}
      </div>

      <IonCheckbox
        checked={hasFinalization}
        onIonChange={e => setHasFinalization(e.detail.checked)}
        className="text-lg italic"
        justify="start"
      >
        Tiene finalización
      </IonCheckbox>

      {hasFinalization && (
        <>
          <label>
            <span className="text-xl font-bold block">Finalización</span>
            <IonSelect
              label="Por"
              onIonChange={e => {
                setFinalizationType(e.detail.value)
              }}
            >
              <IonSelectOption value="by-duration">Duración</IonSelectOption>
              <IonSelectOption value="by-shots-quantity">
                Cantidad de tomas
              </IonSelectOption>
            </IonSelect>
          </label>
          {finalizationType === 'by-duration' && (
            <ByDurationInput
              durationQuantity={durationQuantity}
              durationUnit={durationUnit}
              setDurationQuantity={setDurationQuantity}
              setDurationUnit={setDurationUnit}
            />
          )}
          {finalizationType === 'by-shots-quantity' && (
            <ByShotsQuantityInput
              shotsQuantity={shotsQuantity}
              setShotsQuantity={setShotsQuantity}
            />
          )}
        </>
      )}
    </>
  )
}

function ByDurationInput({
  durationQuantity,
  setDurationQuantity,
  durationUnit,
  setDurationUnit,
}: ByDurationInputProps) {
  return (
    <label className="flex justify-center gap-2">
      <IonInput
        className="w-[20%]"
        type="number"
        value={durationQuantity}
        onIonChange={e => setDurationQuantity(Number(e.detail.value))}
      ></IonInput>
      <IonSelect
        className="w-[20%]"
        value={durationUnit}
        onIonChange={e => setDurationUnit(e.detail.value)}
      >
        <IonSelectOption value="hours">Horas</IonSelectOption>
        <IonSelectOption value="days">Días</IonSelectOption>
        <IonSelectOption value="weeks">Semanas</IonSelectOption>
      </IonSelect>
    </label>
  )
}

interface ByDurationInputProps {
  durationQuantity: number
  setDurationQuantity: (quantity: number) => void
  durationUnit: 'hours' | 'days' | 'weeks'
  setDurationUnit: (unit: 'hours' | 'days' | 'weeks') => void
}
