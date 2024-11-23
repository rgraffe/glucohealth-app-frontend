import { IonChip } from '@ionic/react'

interface Props {
  reminderType: 'fixed' | 'interval'
  setReminderType: (type: 'fixed') => void
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
    </>
  )
}
