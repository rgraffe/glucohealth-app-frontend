import { IonChip } from '@ionic/react'

interface Props {
  reminderType: 'fixed' | 'interval'
  setReminderType: (type: 'fixed' | 'interval') => void
}

export function ReminderTypeSelector({ reminderType, setReminderType }: Props) {
  return (
    <>
      <IonChip
        onClick={() => setReminderType('fixed')}
        color={reminderType === 'fixed' ? 'primary' : 'medium'}
        className="h-14 w-[40%] justify-center"
      >
        Hora fija
      </IonChip>

      <IonChip
        onClick={() => setReminderType('interval')}
        color={reminderType === 'interval' ? 'primary' : 'medium'}
        className="h-14 w-[40%] justify-center"
      >
        Intervalo
      </IonChip>
    </>
  )
}
