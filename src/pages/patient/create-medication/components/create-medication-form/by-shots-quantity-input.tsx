import { IonInput } from '@ionic/react'

export function ByShotsQuantityInput() {
  return (
    <label className="flex justify-center">
      <IonInput
        className="w-[50%]"
        type="number"
        label="Cantidad de tomas:"
        value={1}
      ></IonInput>
    </label>
  )
}
