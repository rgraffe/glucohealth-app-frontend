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
} from '@ionic/react'
import { add, removeCircle } from 'ionicons/icons'
import { ByShotsQuantityInput } from './by-shots-quantity-input'

interface Props {
  hours: string[]
  addHour: (hour: string) => void
  removeHour: (hour: string) => void
  finalizationType: 'by-duration' | 'by-shots-quantity' | null
  setFinalizationType: (type: 'by-duration' | 'by-shots-quantity') => void
}

export function FixedReminderFormSection({
  hours,
  addHour,
  removeHour,
  finalizationType,
  setFinalizationType,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="flex justify-between items-center">
          <span className="text-2xl">Hora</span>

          <IonDatetimeButton datetime="time-input">
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
              id="time-input"
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

      <label>
        <span className="text-2xl">Finalización</span>
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
      {finalizationType === 'by-duration' && <ByDurationInput />}
      {finalizationType === 'by-shots-quantity' && <ByShotsQuantityInput />}
    </>
  )
}

function ByDurationInput() {
  return (
    <label className="flex justify-center gap-2">
      <IonInput className="w-[20%]" type="number" value={1}></IonInput>
      <IonSelect className="w-[20%]" value="hours">
        <IonSelectOption value="hours">Horas</IonSelectOption>
        <IonSelectOption value="days">Días</IonSelectOption>
        <IonSelectOption value="weeks">Semanas</IonSelectOption>
      </IonSelect>
    </label>
  )
}
