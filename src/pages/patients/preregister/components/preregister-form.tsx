import { IonInput, IonButton } from '@ionic/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { PreregisterDto } from '~/features/patients/dto/preregister'
import { QUERY_KEYS } from '~/features/patients/constants'
import { patientPreregisterSchema } from '~/features/patients/schemas/preregister'
import { preregisterPatient } from '~/features/patients/services/preregister'
import { ROUTES } from '~/shared/constants/routes'
import { encrypt } from '~/shared/utils/aes-encryption'

export function PreregisterForm() {
  const history = useHistory()

  const queryClient = useQueryClient()

  const preregisterMutation = useMutation({
    mutationFn: (values: PreregisterDto) => {
      return preregisterPatient(values)
    },
    onSuccess: async data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS_LIST] })

      const encryptedEmail = encrypt(data.email)
      const encryptedPassword = encrypt(data.password)

      history.push(
        `${ROUTES.APP.PATIENTS.PREREGISTER.LOGIN_DATA.PATH}?e=${encryptedEmail}&p=${encryptedPassword}`,
      )
    },
  })

  const { handleChange, handleSubmit, handleBlur, isValid, touched, errors } =
    useFormik<PreregisterDto>({
      initialValues: {
        email: '',
        nationalId: '',
      },
      onSubmit: values => {
        preregisterMutation.mutate(values)
      },
      validationSchema: patientPreregisterSchema,
    })

  if (preregisterMutation.isPending) return <h1>Cargando...</h1>

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      onBlur={handleBlur}
      className="flex flex-col w-full justify-center items-center gap-5"
    >
      <IonInput
        name="email"
        fill="outline"
        labelPlacement="stacked"
        type="email"
        errorText={errors.email}
        className={`max-w-xl ${errors.email ? 'ion-invalid' : ''} ${touched.email && 'ion-touched'}`}
        label="Correo Electrónico"
        mode="md"
      />
      <IonInput
        name="nationalId"
        fill="outline"
        labelPlacement="stacked"
        label="Cédula de identidad"
        errorText={errors.nationalId}
        className={`max-w-xl ${errors.nationalId ? 'ion-invalid' : ''} ${touched.nationalId && 'ion-touched'}`}
        mode="md"
      ></IonInput>

      <IonButton disabled={!isValid} type="submit">
        Continuar
      </IonButton>
    </form>
  )
}
