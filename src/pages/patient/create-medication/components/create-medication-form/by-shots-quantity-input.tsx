import { IonInput } from '@ionic/react'

interface Props {
  shotsQuantity: number
  setShotsQuantity: (quantity: number) => void
}

export function ByShotsQuantityInput({
  shotsQuantity: byShotsQuantity,
  setShotsQuantity: setByShotQuantity,
}: Props) {
  return (
    <label className="flex justify-center">
      <IonInput
        className="w-[50%]"
        type="number"
        label="Cantidad de tomas:"
        value={byShotsQuantity}
        onIonChange={e => setByShotQuantity(Number(e.detail.value))}
      ></IonInput>
    </label>
  )
}
