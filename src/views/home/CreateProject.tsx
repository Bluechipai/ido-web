import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import createBg from 'src/assets/img/home/createBg.avif'
import {FlexSb} from '../../components/flex/Flex.tsx'
import {useNavigate} from 'react-router-dom'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

export const CreateProjectStyle = styled.div`
    width: 100vw;
    height: 3.6rem;
    position: relative;
    background: url(${createBg}) no-repeat;
    background-size: cover;
`;
export default function CreateProject() {
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (
    <CreateProjectStyle className={''}>
      <FlexSb className={'w-[10.8rem] h-[1.6rem] px-[0.8rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[0.16rem] bg-[rgba(136,136,136,0.20)] backdrop-blur-[0.3rem]'}>
        <span className={'uppercase text-[0.32rem] font-medium'}>{t(`Apply to create your project`)}</span>
        {/*<LoadButton
          style={{width: '1.62rem', height: '0.52rem'}}
          onClick={() => {
            navigate('/apply/index')
          }}
          loading={false}>{t(`Submit`)}</LoadButton>*/}
        <LinerButton
          radius={40}
          width={162}
          height={52}
          onClick={() => {
            navigate('/apply/index')
          }}>{t(`Submit`)}</LinerButton>
      </FlexSb>
    </CreateProjectStyle>
  )
}
