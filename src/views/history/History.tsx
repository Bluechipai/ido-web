import {useTranslation} from 'react-i18next'
import {HistoryContentStyle, HistoryStyle} from './History.style'
import React, {useCallback, useMemo, useState} from 'react'
import Tab from '../../components/tab/Tab.tsx'
import {IResponsiveTableColumns} from '../../components/table/ResponsiveTable.tsx'
import Footer from '../../components/footer/Footer.tsx'
import useModal from '../../hooks/useModal.ts'
import RedeemModal, {IRedeemModal} from '../../components/RedeemModal.tsx'
import PrivateList from './PrivateList.tsx'
import {IPlat} from '../../api/system.tsx'
import {getTokenNameByAddress} from '../../contract/wallet.ts'
import WithdrawModal, {IWithdrawModal} from './WithdrawModal.tsx'
import PublishList from './PublishList.tsx'
import {LinerText} from '../../global.style.ts'
import StakeList from './StakeList.tsx'
import LinerButton from '../../components/linerButton/LinerButton.tsx'


enum IType {
  Public,
  Private,
  Staking
}
enum IStatus {
  Ongoing = 1,
  Failed,
  Success
}
enum IResStatus {
  Ongoing = 1,
  completed,
  stop,
  success,
  Failed
}
export enum IStakeStatus {
  Ongoing = 1,
  completed
}
export default function History() {
  const {t, i18n} = useTranslation()
  const [type, setType] = useState(IType.Public)
  const [status, setStatus] = useState(IStatus.Ongoing)
  const [stakeStatus, setStakeStatus] = useState(IStakeStatus.Ongoing)

  const types = useMemo(() => {
    return [
      {
        label: t('Public'),
        value: IType.Public
      },
      {
        label: t('Private'),
        value: IType.Private
      },
      {
        label: t('Staking'),
        value: IType.Staking
      }
    ]
  }, [i18n.language])

  const statusArr = useMemo(() => {
    return [
      {
        label: t('Ongoing'),
        value: IStatus.Ongoing
      },
      {
        label: t('Success'),
        value: IStatus.Success
      },
      {
        label: t('Failed'),
        value: IStatus.Failed
      }
    ]
  }, [i18n.language])
  const stakeStatusArr = useMemo(() => {
    return [
      {
        label: t('Ongoing'),
        value: IStakeStatus.Ongoing
      },
      {
        label: t('Completed'),
        value: IStakeStatus.completed
      }
    ]
  }, [i18n.language])

  return (
    <div>
      <HistoryStyle>
        <HistoryContentStyle>
          <Tab<IType>
            value={type}
            options={types}
            onChange={(value) => {
              setType(value)
            }} />
          {
            type === IType.Staking
              ? <Tab<IStakeStatus>
                value={stakeStatus}
                options={stakeStatusArr}
                onChange={(value) => {
                  setStakeStatus(value)
                }}
                style={{marginTop: '0.6rem'}} />
              : <Tab<IStatus>
                  value={status}
                  options={statusArr}
                  onChange={(value) => {
                    setStatus(value)
                  }}
                  style={{marginTop: '0.6rem'}} />
          }
          <div style={{marginTop: '1rem'}}>
            {
              type === IType.Public ? <PublishList financingStatus={status} /> : null
            }
            {
              type === IType.Private ? <PrivateList financingStatus={status} /> : null
            }
            {
              type === IType.Staking ? <StakeList status={stakeStatus} /> : null
            }
          </div>

        </HistoryContentStyle>
      </HistoryStyle>
      <Footer />
    </div>
  )
}


type IColumnsProps = {
  reload(): void
}
export function useColumns(params: IColumnsProps) {
  const {t, i18n} = useTranslation()
  const {openModal} = useModal()

  const getStatusText = useCallback((status: number) => {
    switch (status){
      case 1:
        return t('Completed')
      case 2:
        return t('Withdrawing...')
      default:
        return ''
    }
  }, [i18n.language])

  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: <div className={'pl-[0.5rem]'}>{t(`Projects`)}</div>,
        field: 'project.projName',
        className: 'w-[4.6rem] text-left pl-[0.24rem]',
        render(item: IPlat): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              <img
                src={item.project.logoUrl}
                className={'mr-[0.1rem] h-[0.4rem] w-[0.4rem] rounded-[50%]'}
                alt=""
              />
              <span className={'text-[0.24rem] font-semibold'}>{item.project.projName}</span>
            </div>
          )
        },
      },
      {
        text: t(`Price`),
        field: '',
        className: 'text-left pr-[0.46rem]',
        render(item: IPlat): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{`${item.subscribePrice} USDT`}</span>
        },
      },
      {
        text: t(`Invested`),
        className: 'text-left pr-[0.24rem]',
        field: 'pledgeReward',
        render(item: IPlat): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{`${item.userFunded} ${getTokenNameByAddress(item.token)}`}</span>
        },
      },
      {
        text: t(`Reward`),
        className: 'text-left pr-[0.24rem]',
        field: 'userRewards',
        render(item: IPlat): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{`${item.userRewards} Chip`}</span>
        },
      },
      {
        text: t(`Status`),
        field: '',
        className: 'w-[2rem] pr-[0.2rem] text-left',
        render(item: IPlat): React.ReactNode {
          if (item.state === IResStatus.success) {
            return <>
              {
                item.wdrawState === 0
                  ? <LinerButton
                      width={140}
                      height={40}
                      radius={40}
                      percent={0.5}
                      disabled={item.wdrawState !== 0}
                      className={`h-[0.3rem] min-w-[1rem] rounded-[0.04rem] text-[0.14rem] text-button md:mt-[0.12rem] md:h-[0.38rem] md:w-[100%] ${
                        item.wdrawState === 0
                          ? 'hover:bg-button-hover bg-active'
                          : 'bg-active opacity-5'
                      }`}
                      onClick={() => {
                        openModal<IWithdrawModal>(WithdrawModal, {
                          launchpadData: item,
                          onSuccess() {
                            params.reload()
                          }
                        })
                      }}>
                      {item.wdrawState === 0 ? t(`Withdraw`) : t(`Withdrawn`)}
                    </LinerButton>
                  : <>
                    {
                      item.wdrawState === 2
                        ? <LinerText>{getStatusText(item.wdrawState)}</LinerText>
                        : <span>{getStatusText(item.wdrawState)}</span>
                    }
                  </>
              }
            </>
          } else if (item.state === IResStatus.Failed) {
            return (
              <LinerButton
                width={140}
                height={40}
                radius={40}
                percent={0.5}
                onClick={() => {
                  openModal<IRedeemModal>(RedeemModal, {
                    launchpadData: item,
                    isWithdraw: true,
                    onSuccess() {
                      params.reload()
                    }
                  })
                }}>
                {t(`Redeem`)}
              </LinerButton>
            )
          } else {
            return (
              <div
                className={
                  'w-[2.8rem] md:grid md:w-[100%] md:grid-cols-3 md:pb-[0.16rem] md:pt-[0.16rem]'
                }>
                <LinerButton
                  width={140}
                  height={40}
                  radius={40}
                  percent={0.5}
                  disabled={item.wdrawState !== 0}
                  className={`h-[0.3rem] rounded-[0.04rem] text-[0.14rem] text-button md:mt-[0.12rem] md:h-[0.38rem] md:w-[100%] ${
                    item.wdrawState === 0
                      ? 'hover:bg-button-hover bg-active'
                      : 'bg-active opacity-5'
                  }`}
                  onClick={() => {
                    openModal<IWithdrawModal>(WithdrawModal, {
                      launchpadData: item,
                      onSuccess() {
                        params.reload()
                      }
                    })
                  }}>
                  {item.wdrawState === 0 ? t(`Withdraw`) : t(`Withdrawn`)}
                </LinerButton>
                {/*<Toggle flag={item.state === IStatus.Ongoing}>
                  <MiniButton
                    onClick={() => {
                      openModal<IBuyModal>(BuyModal, {
                        launchpadData: item,
                        onSuccess() {
                          params.reload()
                        }
                      })
                    }}>
                    {t(`Buy`)}
                  </MiniButton>
                </Toggle>
                <MiniButton
                  className={'ml-[0.1rem]'}
                  onClick={() => {
                    openModal<IRedeemModal>(RedeemModal, {
                      launchpadData: item,
                      onSuccess() {
                        params.reload()
                      }
                    })
                  }}>
                  {t(`Redemption`)}
                </MiniButton>*/}
              </div>
            )
          }
        }
      },
    ]
  }, [i18n.language])

  return columns
}
