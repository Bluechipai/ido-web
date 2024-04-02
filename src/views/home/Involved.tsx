import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {FlexSb} from '../../components/flex/Flex.tsx'
import {LinerText} from '../../global.style.ts'
import LoadButton from '../../components/loadButton/LoadButton.tsx'

const InvolvedStyle = styled(FlexSb)`
    height: 1.28rem;
    padding: 0 1.68rem;
    background-color: rgba(0,0,0,0.8);
    backdrop-filter: blur(0.4rem);
`
const SubBox = styled.div`
    display: flex;
    align-items: center;
    width: 7rem;
    background-color: rgba(99, 133, 196,0.08);
    border-radius: 0.28rem;
    padding-left: 0.32rem;
    padding-right: 0.04rem;
    box-sizing: border-box;
`;
const SubInput = styled.input`
    height: 0.56rem;
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 0.14rem;
    font-weight: 400;
`
export default function Involved() {
  const {t} = useTranslation()

  return (
    <InvolvedStyle>
      <LinerText>{t(`GET INVOLVED, BE PART OF THE COMMUNITY`)}</LinerText>
      <SubBox>
        <SubInput placeholder={t(`Your email address`)} />
        <LoadButton
          loading={false}>{t(`Subscription`)}</LoadButton>
      </SubBox>
    </InvolvedStyle>
  )
}
