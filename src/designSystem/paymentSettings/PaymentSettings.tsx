import { FC } from 'react'
import { Space, InputNumber, Button } from 'antd'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useGlobalStore } from '@/store/store'
import toast from 'react-hot-toast'

import styles from './PaymentSettings.module.scss'
import { updatePaymentDataAction } from '@/store/settingsSlice/actions'

const updateContributionPriceSchema = z.object({
  contributionPrice: z.number().nonnegative().transform((v: number) => v * 100)
})

export const PaymentSettings: FC = () => {
  const { control, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<z.infer<typeof updateContributionPriceSchema>>({
    resolver: zodResolver(updateContributionPriceSchema),
    defaultValues: {
      contributionPrice: (useGlobalStore.getState().payment.contributionPrice ?? 0) / 100
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof updateContributionPriceSchema>> = (data) => {
    void updatePaymentDataAction({
      contributionPrice: data.contributionPrice
    })
    toast.success('Prix de la contribution mis à jour')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contributionForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      <Space direction='vertical'>
        <label>Prix de la contribution</label>
        <Controller
          name='contributionPrice'
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder='0'
              addonAfter='€'
            />
          )}
        />
        {(errors.contributionPrice != null) && <span>{errors.contributionPrice.message}</span>}
      </Space>
      <Button type='primary' htmlType='submit' disabled={!(isDirty && isValid)}>Mettre à jour</Button>
    </form>
  )
}
