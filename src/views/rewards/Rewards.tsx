import {useTranslation} from 'react-i18next'
import {
  BannerContent,
  BannerStyle,
  ContentBox,
  InviteButton,
  RewardsStyle,
  ShareContainer,
  TitleStyle,
} from './Rewards.style'
import {FlexCol, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import {LinerText, StepLabelTitle} from '../../global.style.ts'
import RSlider from '../../components/slider/RSlider.tsx'
import React, {useEffect, useMemo, useState} from 'react'
import DataPanel from './DataPanel.tsx'
import Footer from '../../components/footer/Footer.tsx'
import ResponsiveTable, {IResponsiveTableColumns} from '../../components/table/ResponsiveTable.tsx'
import {useAppSelector} from '../../store'
import {useSignInvite712} from '../../contract/sign-invite-712.ts'
import {IRewardItem, useCreateLink, useQueryInviteReward} from '../../api/user.ts'
import {formatAddress, formatDate} from '../../utils/tools.ts'
import Copy from '../../components/copy/Copy.tsx'
import Pagination from '../../components/pagination/Pagination.tsx'
import ethIcon from 'src/assets/img/eth.png';
import {useMessage} from '../../hooks/useMessage.ts'

export default function Rewards() {
  const {t, i18n} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const {showMessage} = useMessage()
  const {signature, deadline, salt, getSign} = useSignInvite712([])
  const [listData, setListData] = useState<IRewardItem[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {data: inviteData} = useCreateLink({
    address: userStore.address,
    signature,
    deadline,
    salt,
  })
  const inviteLink = useMemo(() => {
    return inviteData ? `${location.origin}?code=${inviteData?.link}` : ''
  }, [inviteData])

  const {data: rewardList, isPending: isPending} = useQueryInviteReward({
    page: page,
    pageSize: pageSize,
  })


  useEffect(() => {
    if (!isPending && rewardList) {
      setListData(rewardList.list)
    }
  }, [isPending, rewardList])


  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: t(`Address From`),
        field: 'project.projName',
        className: 'text-left pl-[0.24rem]',
        render(item: any): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              <img
                src={ethIcon}
                className={'mr-[0.1rem] h-[0.48rem] w-[0.48rem] rounded-[50%]'}
                alt=""
              />
              <span className={'text-[0.16rem] font-medium'}>{item.address}</span>
            </div>
          )
        },
      },
      {
        text: t(`Total Raised`),
        field: 'amount',
        className: 'text-left min-w-[4rem]'
      },
      {
        text: t(`Last Update`),
        className: 'text-left pr-[0.24rem]',
        field: '',
        render(item: any): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{formatDate(item.createdAt, 'yyyy-MM-dd')}</span>
        },
      }
    ]
  }, [i18n.language])


  return (
    <RewardsStyle>
      <BannerStyle>
        <BannerContent>
          <FlexCol style={{alignItems: 'flex-start'}}>
            <LinerText style={{fontSize: '0.68rem', fontWeight: 500, marginBottom: '0.08rem', fontFamily: 'futura', textTransform: 'uppercase'}}>{t(`Invitation Reward `)}</LinerText>
            <LinerText style={{fontSize: '0.68rem', fontWeight: 500, fontFamily: 'futura', textTransform: 'uppercase'}}>{t(`Program`)}</LinerText>
            <div style={{width: '8.09rem', fontSize: '0.2rem', margin: '0.24rem 0 1rem'}}>{t(`Invite friends to participate in transactions and receive generous commission rewards, growing friendship and wealth together`)}</div>
            <div style={{width: '4rem'}}>
              <RSlider
                disabled={false}
                value={100}
                lineActiveColor={'rgba(255, 255, 255, 0.16)'}
                height={'0.02rem'}
                stepItemStyle={{background: 'rgba(255,255,255,0.48)', borderColor: 'rgba(255,255,255,0.48)', backgroundClip: 'content-box', fontSize: '0.16rem', fontWeight: 700}}
                marks={[
                  {
                    value: 0,
                    label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                      <StepLabelTitle>{t(`Invite friends`)}</StepLabelTitle>
                    </FlexCol>,
                    rowRender(): React.ReactNode {
                      return <LinerText style={{fontFamily: 'futura'}}>1</LinerText>
                    }
                  },
                  {
                    value: 40,
                    label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                      <StepLabelTitle>
                        <FlexCol>
                          <span>{t(`· Participate in Launchpad`)}</span>
                          <span>{t(`· Staking their CHIP`)}</span>
                        </FlexCol>
                      </StepLabelTitle>
                    </FlexCol>,
                    rowRender(): React.ReactNode {
                      return <LinerText>2</LinerText>
                    }
                  },
                  {
                    value: 100,
                    label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                      <StepLabelTitle>{t(`Earn commission income`)}</StepLabelTitle>
                    </FlexCol>,
                    rowRender(): React.ReactNode {
                      return <LinerText>3</LinerText>
                    }
                  }
                ]}
                onChange={() => {}} />
            </div>
          </FlexCol>
          <ShareContainer>
            <FlexSb style={{paddingBottom: '0.28rem', borderBottom: '0.01rem dashed #000', marginBottom: '0.32rem'}}>
              <span style={{fontSize: '0.36rem', fontWeight: 600}}>{t(`Share your link`)}</span>
              <InviteButton
                onClick={() => {
                  if (!userStore.address) {
                    showMessage(t(`Please connect wallet`))
                    return;
                  }
                  getSign(userStore.address, {})
                }}>
                <LinerText>{t(`invite`)}</LinerText>
              </InviteButton>
            </FlexSb>
            <FlexSb className={'min-h-[0.24rem]'}>
              <span>{t(`Invitation link`)}</span>
              <FlexRow>
                <span style={{fontSize: '0.18rem', fontWeight: 700, marginRight: '0.12rem'}}>{formatAddress(inviteLink, 10, 6)}</span>
                {/*<SvgIcon dangerouslySetInnerHTML={copyIcon} />*/}
                <Copy text={inviteLink || ''} />
              </FlexRow>
            </FlexSb>
          </ShareContainer>
        </BannerContent>
      </BannerStyle>
      <DataPanel />
      <ContentBox>
        <TitleStyle>{t(`Reward records`)}</TitleStyle>
        <div
          className={
            'relative min-h-[2rem] overflow-hidden rounded-[0.08rem] bg-box-light bg-no-repeat dark:bg-box dark:bg-box-size dark:shadow-box'
          }>
          <ResponsiveTable
            data={listData}
            rowStyle={{height: '0.96rem'}}
            gap={'0rem'}
            radius={'0.08rem'}
            columns={columns}
          />
        </div>
        <div className={'mx-auto w-content-width'}>
          <Pagination
            total={rewardList?.total}
            page={page}
            pageSize={pageSize}
            onChange={(page) => setPage(page)}
            onPageSizeChange={(pageSize) => {
              setPageSize(pageSize)
            }}
          />
        </div>
      </ContentBox>
      <Footer style={{marginTop: '1.68rem'}} />
    </RewardsStyle>
)
}
