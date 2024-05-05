import { IonButton, IonIcon, IonText } from '@ionic/react'
import { pencil, trash } from 'ionicons/icons'
import injector_icon_svg from '~/shared/assets/injector-icon.svg'

export function TreatmentListItem() {
  return (
    <li>
      <header>
        <IonText className="flex items-center">
          <h4 className="text-md font-thin my-0 w-[30%] text-center">
            09:30 am
          </h4>
          <h3 className="text-2xl my-0">Metformina</h3>

          <div className="flex justify-end flex-grow gap-3">
            <IonIcon icon={pencil} size="large" />
            <IonIcon icon={trash} size="large" />
          </div>
        </IonText>
      </header>
      <section className="flex items-center">
        <IonIcon src={injector_icon_svg} className="h-[40px] w-[30%]" />
        <IonText className="flex flex-col gap-3">
          <h5 className="my-0">500 mg</h5>
          <p>Periodo: 04/24/2024 - 05/12/2024</p>
        </IonText>
      </section>
      <footer className="w-full flex justify-end px-5">
        <IonButton size="small" className="w-[70%]">
          Ver cumplimiento
        </IonButton>
      </footer>
    </li>
  )
}
