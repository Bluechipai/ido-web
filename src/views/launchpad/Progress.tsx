import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import {IPlat, useQueryPlatformStatus, useQueryPlatHome, useQueryPrivateList} from '../../api/system.tsx'
import Tooltip from '../../components/tooltip/Tooltip.tsx'
import SvgIcon from '../../components/svgIocn/SvgIcon.tsx'
import {questionIcon} from '../../utils/svgManage.ts'
import Pagination from '../../components/pagination/Pagination.tsx'
import React, {useEffect, useMemo, useState} from 'react'
import ResponsiveTable, {IResponsiveTableColumns} from '../../components/table/ResponsiveTable.tsx'
import useWidthChange from '../../hooks/useWidthChange.ts'
import Loading from '../../components/loadStatus/Loading.tsx'
import {FlexBox, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import Process from '../../components/process/Process.tsx'
import {Decimal} from 'decimal.js'
import {useTheme} from '../../hooks/useTheme.ts'
import DecimalTool from '../../utils/DecimalTool.ts'
import styled from 'styled-components'
import questionImg from 'src/assets/img/questionImg.png'
import {IFundType} from '../../utils/types.ts'
import {EllipsisText} from '../../global.style.ts'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

type IProps = {
  state?: number
  hidePagination?: boolean
  isGrid?: boolean
  listLen?: number
  pageSize?: number
  fundType: IFundType
}

const ChainStyle = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 0.28rem;
    padding: 0 0.12rem;
    border: 0.01rem solid #fff;
    border-color: inherit;
    border-radius: 1rem;
    font-size: 0.14rem;
    font-weight: 500;
    color: inherit;
`
export default function Progress(props: IProps) {
  const {t, i18n} = useTranslation()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [isGrid, setGrid] = useState(props.isGrid)
  const [pageSize, setPageSize] = useState(props.pageSize || 10)
  const {isH5} = useWidthChange()
  const {isDark} = useTheme()
  // const [listData, setListData] = useState<IPlat[]>([])
  const {data, isPending} = useQueryPlatHome({
    page: page,
    pageSize: pageSize,
    financingStatus: props.state,
  }, props.fundType !== IFundType.Public)

  const {data: privateList, isPending: isPrivatePending} = useQueryPrivateList({
    page: page,
    pageSize: pageSize,
    financingStatus: props.state,
  }, props.fundType !== IFundType.Private)

  const {data: riskData} = useQueryPlatformStatus('risk_level')

  const listData: IPlat[] = useMemo(() => {
    if (props.fundType === IFundType.Private) {
      return privateList?.list || []
    }
    return data?.list || []
  }, [props.fundType, data, privateList])

  function reset() {
    setPage(1)
    setPageSize(10)
  }

  useEffect(() => {
    reset()
  }, [props.fundType])

  useEffect(() => {
    if (!isPending && data) {
      // setListData(data.list)
    }
  }, [isPending, data, privateList, props.fundType])
  useEffect(() => {
    // setListData([])
    // setPageSize(20)
  }, [props.state])

  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: <div className={'pl-[0.5rem]'}>{t(`Project Name`)}</div>,
        field: 'project.projName',
        className: 'text-left pl-[0.24rem]',
        render(item: any): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              <img
                src={item.project.logoUrl}
                className={'mr-[0.1rem] h-[0.4rem] w-[0.4rem] rounded-[50%]'}
                alt=""
              />
              <span className={'text-[0.24rem] font-semibold'}>{item.project.projName}</span>
              {
                item.project.network ? <ChainStyle className={'ml-[0.12rem]'}>{item.project.network}</ChainStyle> : null
              }
            </div>
          )
        },
      },
      {
        text: t(`Total Raised`),
        field: '',
        className: 'text-left pl-[0.24rem]',
        render(item: any): React.ReactNode {
          const percent = DecimalTool.div(item.fundedAmount, item.project.quantity).mul(100).toFixed(2, 1)
          return <div className={'w-[3.2rem]'}>
            <div className={'mb-[0.08rem] flex justify-between PlusJakartaSans-Medium'}>
              {data ? (
                <span>
                    {item.fundedAmount}/{item.project.quantity} USDT
                  </span>
              ) : (
                <span></span>
              )}
              <span>{percent}%</span>
            </div>
            <Process percent={Number(percent)} />
          </div>
        },
      },
      {
        text: t(`Presale Price`),
        field: '',
        className: 'text-right pr-[0.46rem]',
        render(item: any): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{`${item.subscribePrice} USDT`}</span>
        },
      },
      {
        text: t(`Listing Time`),
        className: 'text-right pr-[0.24rem]',
        field: 'project.marketTime',
        render(item: any): React.ReactNode {
          return <span className={'text-[0.16rem] font-bold'}>{item.project.marketTime}</span>
        },
      },
      /*{
        text: 'pledgeReward',
        field: '',
        className: 'text-right pr-[0.24rem]',
        columnRender(): React.ReactNode {
          return (
            <div className={'flex items-center justify-end'}>
              <span>{t(`Award`)}</span>
              <Tooltip
                isH5={isH5}
                icon={
                  <SvgIcon
                    fillColor={isDark ? '#98A7C3' : '#999'}
                    dangerouslySetInnerHTML={questionIcon}
                  />
                }
                calc_top={10}>
                <div>
                  <div className={'mb-[0.1rem] flex items-center'}>
                    <SvgIcon
                      fillColor={isDark ? '#98A7C3' : '#999'}
                      dangerouslySetInnerHTML={questionIcon}
                    />
                    <span className={'ml-[0.04rem]'}>{t(`Award`)}</span>
                  </div>
                  <div className={'text-subtitle_light dark:text-subtitle'}>
                    {t(`APR annual interest rate is 10%`)}
                  </div>
                </div>
              </Tooltip>
            </div>
          )
        },
        render(item: any): React.ReactNode {
          return `${Number(item.pledgeReward)}%`
        },
      },*/
      {
        text: <FlexRow className={'cursor-pointer justify-end'} onClick={() => setGrid(!isGrid)}>
                  <SvgIcon dangerouslySetInnerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H10C11.1046 12 12 11.1046 12 10V2C12 0.895431 11.1046 0 10 0H2ZM16 14C14.8954 14 14 14.8954 14 16V24C14 25.1046 14.8954 26 16 26H24C25.1046 26 26 25.1046 26 24V16C26 14.8954 25.1046 14 24 14H16ZM14 2C14 0.89543 14.8954 0 16 0H24C25.1046 0 26 0.895431 26 2V3C26 4.10457 25.1046 5 24 5H16C14.8954 5 14 4.10457 14 3V2ZM16 7C14.8954 7 14 7.89543 14 9V10C14 11.1046 14.8954 12 16 12H24C25.1046 12 26 11.1046 26 10V9C26 7.89543 25.1046 7 24 7H16ZM0 23C0 21.8954 0.895431 21 2 21H10C11.1046 21 12 21.8954 12 23V24C12 25.1046 11.1046 26 10 26H2C0.895431 26 0 25.1046 0 24V23ZM2 14C0.895431 14 0 14.8954 0 16V17C0 18.1046 0.895431 19 2 19H10C11.1046 19 12 18.1046 12 17V16C12 14.8954 11.1046 14 10 14H2Z" fill="#D9D9D9"/>
                  </svg>`} />
        </FlexRow>,
        field: '',
        className: 'pr-[0.2rem] text-right',
        render(item: any): React.ReactNode {
          return item.state === 1 && item.riskLevel !== 3 ? (
            <LinerButton
              width={144}
              height={40}
              radius={40}
              percent={0.5}
              disabled={false}
              onClick={() => {
                navigate(`/fund/${item.id}`)
              }}>{t(`Subscribe`)}</LinerButton>
          ) : (
            <FlexBox
              className={'cancel-button inline-flex w-[1.44rem] h-[0.4rem] rounded-[0.24rem] text-[0.18rem] font-semibold'}>{t(`Stopped`)}</FlexBox>
          )
        },
      },
    ]
  }, [i18n.language, riskData, isDark, isH5, isGrid])

  const calcData = useMemo(() => {
    if (props.listLen && listData) {
      return listData.slice(0, props.listLen)
    }
    return listData
  }, [props.listLen, listData, isGrid])

  return (
    <div>
      <div className={'relative'}>
        {isPending || isPrivatePending ? <Loading /> : null}
        {isGrid ? (
          <div>
            <FlexSb className={'h-[0.6rem] px-[0.21rem]'}>
              <span className={'text-[0.2rem]'}>{t(`Welcome to bluechipAI`)}</span>
              <FlexRow className={'cursor-pointer justify-end'} onClick={() => setGrid(!isGrid)}>
                <SvgIcon
                  dangerouslySetInnerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H10C11.1046 12 12 11.1046 12 10V2C12 0.895431 11.1046 0 10 0H2ZM16 14C14.8954 14 14 14.8954 14 16V24C14 25.1046 14.8954 26 16 26H24C25.1046 26 26 25.1046 26 24V16C26 14.8954 25.1046 14 24 14H16ZM14 2C14 0.89543 14.8954 0 16 0H24C25.1046 0 26 0.895431 26 2V3C26 4.10457 25.1046 5 24 5H16C14.8954 5 14 4.10457 14 3V2ZM16 7C14.8954 7 14 7.89543 14 9V10C14 11.1046 14.8954 12 16 12H24C25.1046 12 26 11.1046 26 10V9C26 7.89543 25.1046 7 24 7H16ZM0 23C0 21.8954 0.895431 21 2 21H10C11.1046 21 12 21.8954 12 23V24C12 25.1046 11.1046 26 10 26H2C0.895431 26 0 25.1046 0 24V23ZM2 14C0.895431 14 0 14.8954 0 16V17C0 18.1046 0.895431 19 2 19H10C11.1046 19 12 18.1046 12 17V16C12 14.8954 11.1046 14 10 14H2Z" fill="#D9D9D9"/>
</svg>`}
                />
              </FlexRow>
            </FlexSb>
            <RenderGrid data={calcData} />
          </div>
        ) : (
          <div
            className={
              'relative min-h-[2rem] overflow-hidden rounded-[0.08rem] bg-box-light bg-no-repeat dark:bg-box dark:bg-box-size dark:shadow-box'
            }>
            <ResponsiveTable
              isH5={isH5}
              data={listData}
              rowClassName={'h-[0.64rem]'}
              columns={columns}
            />
          </div>
        )}
      </div>
      {!props.hidePagination && !isH5 ? (
        <div className={'mx-auto w-content-width md:w-auto'}>
          <Pagination
            total={props.fundType === IFundType.Private ? privateList?.total : data?.total}
            page={page}
            pageSize={pageSize}
            onChange={(page) => setPage(page)}
            onPageSizeChange={(pageSize) => {
              console.log(pageSize)
              setPageSize(pageSize)
            }}
          />
        </div>
      ) : null}
      {!props.hidePagination &&
      isH5 &&
      data &&
      data.list.length < data.total ? (
        <div className={'my-[0.2rem] flex justify-center'}>
          <div
            className={'text-active'}
            onClick={() => {
              if (data && data.list.length < data.total) {
                setPageSize(pageSize + 10)
              }
            }}>
            {t(`More`)}
          </div>
        </div>
      ) : null}
    </div>
  )
}

type IRenderGrid = {
  data: IPlat[]
}

function RenderGrid(props: IRenderGrid) {
  const {isH5} = useWidthChange()
  return (
    <div
      className={`grid mt-[0.12rem] ${
        isH5 ? 'grid-cols-1' : 'grid-cols-3'
      } gap-x-[0.32rem] gap-y-[0.32rem] md:gap-y-[0.2rem]`}>
      {props.data.map((item) => {
        return (
          <GridItem
            key={item.id}
            data={item}
          />
        )
      })}
    </div>
  )
}

type IGridItem = {
  data: IPlat
}

function GridItem(props: IGridItem) {
  const {isH5} = useWidthChange()
  const {t} = useTranslation()
  const navigate = useNavigate()
  const percent = useMemo(() => {
    return Decimal.div(props.data.fundedAmount, props.data.project.quantity)
      .mul(100)
      .toFixed(2, 0)
  }, [props.data])

  return (
    <div
      style={{background: 'rgba(115, 171, 255, 0.20)', backdropFilter: 'blur(0.4rem)'}}
      className={
        'rounded-[0.1rem] p-[0.4rem]'
      }>
      <FlexRow className={'mb-[0.56rem] md:mb-[0.28rem]'}>
        <img
          src={props.data.project.logoUrl}
          className={'h-[0.96rem] w-[0.96rem] rounded-[50%] mr-[0.12rem] md:h-[0.68rem] md:w-[0.68rem]'}
          alt=""
        />
        <div style={{overflow: 'hidden'}}>
          <EllipsisText
            className={
              'mb-[0.18rem] text-[0.4rem] font-semibold md:mb-[0.04rem] md:text-[0.16rem]'
            }>
            {props.data.project.projName}
          </EllipsisText>
          <div style={{minHeight: '0.28rem'}}>
            {
              props.data.project.network
                ? <ChainStyle>{props.data.project.network}</ChainStyle>
                : null
            }
          </div>

          {/*<div
            className={
              'text-[0.16rem] font-light text-subtitle_light dark:text-subtitle md:text-[0.12rem] md:font-normal'
            }>
            <span>{props.data.project.tokenSymbol}</span>
            {props.data.project.network
              ? `(${props.data.project.network})`
              : null}
          </div>*/}
        </div>
      </FlexRow>
      <div className={'mb-[1.28rem]'}>
        <div>
          {t(`Animalia is an independent, free online NFT collectible 
card game that features crypto inspired memes and gems. With the support of ETH and BNB chains,`)}
        </div>
        <div>{t(`Animalia gives you complete ownership of your in-game collectibles. Collect...`)}</div>
      </div>
      <FlexSb className={'mb-[0.4rem]'}>
        <div className={'flex flex-col'}>
          <FlexRow className={'justify-end  mb-[0.12rem]'}>
            <span
              className={
                'text-[rgba(255,255,255,0.4)] mr-[0.04rem]'
              }>
              {t(`Award`)}
            </span>
            <Tooltip
              isH5={isH5}
              icon={
                <img
                  src={questionImg}
                  className={'w-[0.14rem] h-[0.14rem]'}
                />

              }
              calc_top={10}>
              <div>
                <FlexRow className={'mb-[0.16rem]'}>
                  <SvgIcon
                    dangerouslySetInnerHTML={questionIcon}
                  />
                  <span className={'ml-[0.04rem]'}>{t(`Award`)}</span>
                </FlexRow>
                <div className={'w-[2.78rem] text-subtitle_light dark:text-subtitle leading-[0.2rem]'}>
                  <div>
                    {t(`1. If financing is successful, there will be no platform token reward;`)}
                  </div>
                  <div>
                    {t(`2. If financing fails, the platform will reward the platform with a Chip token reward`)}
                  </div>
                </div>
              </div>
            </Tooltip>
          </FlexRow>
          <span>{Number(props.data.pledgeReward)}%</span>
        </div>
        <div className={'flex flex-col'}>
          <span className={'text-[rgba(255,255,255,0.4)] mb-[0.12rem]'}>{t(`Price`)}</span>
          <span className={'text-[0.14rem] font-medium'}>
            {props.data.subscribePrice} USDT
          </span>
        </div>
        <div className={'flex flex-col'}>
          <span className={'text-[rgba(255,255,255,0.4)] mb-[0.12rem]'}>{t(`Time To Market`)}</span>
          <span className={'text-[0.14rem] font-medium'}>
            {props.data.project.marketTime}
          </span>
        </div>
      </FlexSb>
      <div className={'child-n-l:mb-[0.3rem] md:child-n-l:mb-[0.24rem]'}>
        <div className={'mb-[0.64rem]'}>
          <div
            className={
              'mb-[0.08rem] flex justify-between md:mb-[0.14rem] md:text-[0.16rem]'
            }>
            <span>
              {props.data.fundedAmount}/{Number(props.data.project.quantity)}{' '}
              USDT
            </span>
            <span>{percent}%</span>
          </div>
          <Process percent={Number(percent)} />
        </div>
      </div>
      <div className={'flex justify-end mt-[0.4rem] md:mt-[0.32rem]'}>
        {
          (props.data.state === 1 && props.data.riskLevel !== 3)
            ? <LinerButton
              width={144}
              height={40}
              radius={40}
              percent={0.5}
              disabled={false}
              onClick={() => {
                navigate(`/fund/${props.data.id}`)
              }}>{t(`Subscribe`)}</LinerButton>
            : <FlexBox
              className={'cancel-button inline-flex w-[1.44rem] h-[0.4rem] rounded-[0.24rem] text-[0.18rem] font-semibold'}>{t(`Stopped`)}</FlexBox>
        }
        {/*<button
          disabled={!(props.data.state === 1 && props.data.riskLevel !== 3)}
          className={
            'hover:bg-button-hover h-[0.5rem] w-[100%] rounded-[0.04rem] bg-active text-[0.16rem] font-semibold text-button outline-none md:mr-0 md:h-[0.48rem] md:text-[0.14rem]'
          }
          onClick={() => {
            navigate(`/launchpad/detail/${props.data.id}`)
          }}>
          {props.data.state === 1 && props.data.riskLevel !== 3
            ? t(`Subscription`)
            : t(`Stopped`)}
        </button>*/}
      </div>
    </div>
  )
}
