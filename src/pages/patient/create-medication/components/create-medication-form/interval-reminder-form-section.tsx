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
  initialHour: string
  setInitialHour: (hour: string) => void
  finalizationType: 'by-final-date' | 'by-shots-quantity' | null
  setFinalizationType: (type: 'by-final-date' | 'by-shots-quantity') => void
}

export function IntervalReminderFormSection({
  initialHour,
  setInitialHour,
  finalizationType,
  setFinalizationType,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="flex justify-between items-center">
          <span className="text-2xl">Hora de inicio</span>

          <IonDatetimeButton datetime="time-input">
            <IonText slot="time-target" className="flex items-center gap-2">
              Seleccionar
            </IonText>
          </IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              value={new Date().toISOString()}
              onIonChange={e =>
                setInitialHour(
                  (e.detail.value as string).split('T')[1].slice(0, 5),
                )
              }
              showDefaultButtons
              id="time-input"
              presentation="time"
            ></IonDatetime>
          </IonModal>
        </label>

        {initialHour ? (
          <IonChip className="text-lg w-fit">{initialHour}</IonChip>
        ) : (
          <h4 className="italic opacity-50 text-sm">
            No has indicado la hora de inicio.
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
          <IonSelectOption value="by-final-date">Fecha final</IonSelectOption>
          <IonSelectOption value="by-shots-quantity">
            Cantidad de tomas
          </IonSelectOption>
        </IonSelect>
      </label>
      {finalizationType === 'by-final-date' && <ByFinalDateInput />}
      {finalizationType === 'by-shots-quantity' && <ByShotsQuantityInput />}
    </>
  )
}

function ByFinalDateInput() {
  return (
    <label className="flex justify-center gap-2">
      <IonDatetimeButton datetime="final-date-picker"></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime id="final-date-picker" presentation="date"></IonDatetime>
      </IonModal>
    </label>
  )
}