import {useTranslation} from 'react-i18next'
import {
  FormContainer,
  FormGird,
  GroupLabel,
  ImageDesc, ImageGroup,
  ImageLabel,
  SubmitBox,
  SubmitBtn
} from './Apply.style.ts'
import FormItem from './FormItem.tsx'
import {HTMLProps, MutableRefObject, useImperativeHandle, useState} from 'react'
import {useEffectState} from '../../hooks/useEffectState.ts'
import {FlexCol, FlexRow} from '../../components/flex/Flex.tsx'
import UploadFile from '../../components/upload/UploadFile.tsx'
import {ChildImperativeHandle} from './Apply.tsx'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

const investorInfo = {
  logoUrl: '',
  name: '',
  keyId:  0
}
const communityInfo = {
  url: '',
  name: '',
  imgUrl: '',
  keyId:  0
}
export type IStep2State = {
  content: string
  totalAmount: string
  initAmount: string
  publicAmount: string
  privateAmount: string
  communitys: (typeof communityInfo)[]
  investors: (typeof investorInfo)[]
}
export const Step2Default: IStep2State = {
  content: '',
  totalAmount: '',
  initAmount: '',
  publicAmount: '',
  privateAmount: '',
  communitys: [],
  investors: []
}

type IProps = {
  onCancel(): void
  onConfirm(formData: IStep2State): void
  childrenRef?: MutableRefObject<ChildImperativeHandle | undefined>
} & HTMLProps<HTMLDivElement>
export default function Step2(props: IProps) {
  const {t} = useTranslation()
  const state: IStep2State = useEffectState({...Step2Default})
  const [investorList, setInvestorList] = useState([{...investorInfo, keyId:  Math.random()}]);
  const [communitys, setCommunitys] = useState([{...communityInfo, keyId:  Math.random()}]);


  useImperativeHandle(props.childrenRef, () => {
    return {
      reset: () => {
        resetData()
      }
    }
  })

  function resetData() {
    (Object.keys(Step2Default) as Array<keyof IStep2State>).forEach((key) => {
      // @ts-ignore
      state[key] = Step2Default[key]
    })
    setInvestorList([{...investorInfo, keyId:  Math.random()}])
    setCommunitys([{...communityInfo, keyId:  Math.random()}])
  }

  return (
    <FormContainer style={props.style}>
      <FormGird>
        <div style={{marginBottom: '0.48rem'}}>
          <GroupLabel>{t(`Project information`)}</GroupLabel>
          <FormItem
            placeholder={t(`Project information`)}
            value={state.content}
            onChange={(value) => {
              state.content = value
            }} />
        </div>
        <div>
          <GroupLabel>{t(`TOKEN`)}</GroupLabel>
          <FormItem
            placeholder={t(`Total supply`)}
            value={state.totalAmount}
            onChange={(value) => {
              state.totalAmount = value
            }} />
          <FormItem
            placeholder={t(`Initial supply`)}
            value={state.initAmount}
            onChange={(value) => {
              state.initAmount = value
            }} />
          <FormItem
            placeholder={t(`The price of Private/Pre-sale`)}
            value={state.privateAmount}
            onChange={(value) => {
              state.privateAmount = value
            }} />
          <FormItem
            placeholder={t(`The price of Public sale`)}
            value={state.publicAmount}
            onChange={(value) => {
              state.publicAmount = value
            }} />
        </div>
      </FormGird>
      <FormGird>
        <div style={{marginBottom: '0.4rem'}}>
          <GroupLabel>{t(`investor`)}</GroupLabel>
          <div style={{display: 'flex', alignItems: 'flex-start'}}>
            <FlexCol style={{flex: 1}}>
              {
                investorList.map((item, index) => {
                  return <FormItem
                    key={item.keyId}
                    style={{flex: 1}}
                    hiddenLabel={true}
                    hiddenWarn={true}
                    placeholder={t(`Investor Name`)}
                    value={item.name}
                    onChange={(value) => {
                      const investorArr = investorList.concat()
                      const info = {...item}
                      info.name = value
                      investorArr[index] = info
                      setInvestorList(investorArr)
                    }} />
                })
              }
            </FlexCol>
            <div style={{paddingBottom: '0.32rem'}}>
              <LinerButton
                width={100}
                height={40}
                radius={40}
                percent={0.5}
                style={{color: '#000'}}
                onClick={() => {
                const arr = investorList.concat()
                arr.push({...investorInfo, keyId:  Math.random()})
                setInvestorList(arr)
              }}>{t(`Add`)}</LinerButton>
            </div>
          </div>
        </div>
        <ImageGroup>
          <ImageLabel>
            <span>{t(`Logo`)}</span>
          </ImageLabel>
          <FlexRow className={'flex-wrap'}>
            {
              investorList.map((item, index) => {
                return <div key={index} style={{marginRight: index !== investorList.length - 1 ? '0.32rem' : 0}}>
                  <UploadFile
                    fileURL={item.logoUrl}
                    hideRemove={investorList.length === 1}
                    onRemove={() => {
                      if (investorList.length > 1) {
                        const arr = investorList.concat()
                        arr.splice(index, 1)
                        setInvestorList(arr)
                      } else {
                        setInvestorList([{...investorInfo, keyId:  Math.random()}])
                      }
                    }}
                    onUpload={(fileURL) => {
                      const info = {...investorList[index]}
                      info.logoUrl = fileURL
                      const arr = investorList.concat();
                      arr[index] = info
                      setInvestorList(arr)
                    }} />
                </div>
              })
            }
          </FlexRow>
          <ImageDesc
            style={{width: '4.84rem'}}>{t(`No more than 1 file should be uploaded. It is recommended to upload files of 640*400 and no more than 2Mb in size. PNG, JPG, and JPEG formats are supported.`)}</ImageDesc>
        </ImageGroup>
        <div className={'mt-[0.82rem] mb-[0.4rem]'}>
          <GroupLabel>{t(`Community`)}</GroupLabel>
          <div style={{display: 'flex', alignItems: 'flex-start'}}>
            <FlexCol style={{flex: 1}}>
              {
                communitys.map((item, index) => {
                  return <FormItem
                    key={item.keyId}
                    style={{flex: 1}}
                    hiddenLabel={true}
                    hiddenWarn={true}
                    placeholder={t(`Community Link (Telegram, Discord...)`)}
                    value={item.url}
                    onChange={(value) => {
                      const communityArr = communitys.concat()
                      const info = {...item}
                      info.url = value
                      communityArr[index] = info
                      setCommunitys(communityArr)
                    }} />
                })
              }
            </FlexCol>
            <div style={{paddingBottom: '0.32rem'}}>
              <LinerButton
                width={100}
                height={40}
                radius={40}
                percent={0.5}
                style={{color: '#000'}}
                onClick={() => {
                const arr = communitys.concat()
                arr.push({...communityInfo, keyId:  Math.random()})
                setCommunitys(arr)
              }}>{t(`Add`)}</LinerButton>
            </div>
          </div>
        </div>
        <ImageGroup>
          <ImageLabel>
            <span>{t(`Logo`)}</span>
          </ImageLabel>
          <FlexRow className={'flex-wrap'}>
            {
              communitys.map((item, index) => {
                return <div key={index} style={{marginRight: index !== communitys.length - 1 ? '0.32rem' : 0}}>
                  <UploadFile
                    fileURL={item.imgUrl}
                    hideRemove={communitys.length === 1}
                    onRemove={() => {
                      if (communitys.length > 1) {
                        const arr = communitys.concat()
                        arr.splice(index, 1)
                        setCommunitys(arr)
                      } else {
                        setCommunitys([{...communityInfo, keyId:  Math.random()}])
                      }
                    }}
                    onUpload={(fileURL) => {
                      const info = {...communitys[index]}
                      info.imgUrl = fileURL
                      const arr = communitys.concat();
                      arr[index] = info
                      setCommunitys(arr)
                    }} />
                </div>
              })
            }
          </FlexRow>
          <ImageDesc
            style={{width: '4.84rem'}}>{t(`No more than 1 file should be uploaded. It is recommended to upload files of 640*400 and no more than 2Mb in size. PNG, JPG, and JPEG formats are supported.`)}</ImageDesc>
        </ImageGroup>
      </FormGird>
      <SubmitBox style={{gridColumn: 'span 2', marginTop: '0.56rem'}}>
        <SubmitBtn
          isGray={true}
          onClick={props.onCancel}>{t(`Cancel`)}</SubmitBtn>
        <LinerButton
          width={187}
          height={52}
          radius={50}
          percent={0.5}
          style={{marginLeft: '0.16rem', color: "#000"}}
          onClick={() => {
            props.onConfirm({
              ...state,
              communitys: communitys,
              investors: investorList
            })
          }}>{t(`Next Step`)}</LinerButton>
      </SubmitBox>
    </FormContainer>
  )
}
