import CreateSpaceNav from '@src/components/common/CreateSpaceNav';
import Subscription from '@src/components/CreateSpace/Subscription';
import Title from '@src/components/CreateSpace/Title';
import { HEADER_NAME, TITLE, SUBSCRIPTION } from '@src/constants';
import React, { useState } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NewAirdropForm from '@src/components/NewAirdrop/Form';

export type AirdropStep =
  | 'ENTER_DETAIL_AIRDROP'
  | 'SET_DELEGATION'
  | 'ADD_WHITELIST_ADDRRESS'
  | 'REVIEW_AIRDROP'
  | 'AIRDROP_START';

type SubscriptionStep = 'ENTER_DETAIL_AIRDROP' | 'SET_DELEGATION';

const DEFAULT_VALUES: DefaultValues<NewAirdropType> = {
  treasuryAddress: '',
  startDate: '',
  isDelegate: true,
};

export interface NewAirdropType {
  treasuryAddress: string;
  amounts: number;
  startDate: string;
  rounds: number;
  interval: number;
  duration: number;
  isDelegate: boolean;
  delegationList: Array<any>;
  whiteList: Array<any>;
}
const schema = yup.object().shape({
  treasuryAddress: yup.string().required('treasury address is required.'),
  amounts: yup.number().required('amouts is required'),
  startDate: yup.string().required('start date is required'),
  rounds: yup.number().required('rounds is required'),
  interval: yup.number().required('interval is required'),
  duration: yup.number().required('duration is required'),
  isDelegate: yup.bool().required('delegate selection is required'),
  delegationList: yup.array(),
  whiteList: yup.array().required('white list is required'),
});

function NewAirdrop() {
  const [step, setStep] = useState<AirdropStep>('ENTER_DETAIL_AIRDROP');
  console.log('>step', typeof step);

  const methods = useForm<NewAirdropType>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = methods;
  const onSubmit = (data: NewAirdropType) => {
    const notify = confirm('Are you sure you want to start new airdrop');

    console.log('notify', notify);
    console.log('data', data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CreateSpaceNav routingAddress="/" className="mb-[120px]">
        {HEADER_NAME.START_NEW_AIRDROP}
      </CreateSpaceNav>
      <Title>{TITLE[step]}</Title>
      <Subscription>{SUBSCRIPTION[step]}</Subscription>
      <form className="w-[560px]" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <NewAirdropForm step={step} setStep={setStep} />
        </FormProvider>
      </form>
    </div>
  );
}

export default NewAirdrop;
