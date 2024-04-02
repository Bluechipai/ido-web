import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {FlexBox, FlexSb} from '../flex/Flex.tsx'
import {content_width, LinerText} from '../../global.style.ts'
import {useMessage} from '../../hooks/useMessage.ts'
import {useState} from 'react'
import LinerButton from '../linerButton/LinerButton.tsx'

const InvolvedStyle = styled(FlexBox)`
    height: 1.28rem;
    background-color: rgba(0,0,0,0.8);
    backdrop-filter: blur(0.4rem);
`

export const InvolvedContentStyle = styled(FlexSb)`
    width: ${content_width};
    margin: 0 auto;
`;

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
    &::-webkit-input-placeholder {
        color: rgba(255,255,255,0.4);
    }

    &::-moz-input-placeholder {
        color: rgba(255,255,255,0.4);
    }
    &::-ms-input-placeholder {
        color: rgba(255,255,255,0.4);
    }
`
export default function Involved() {
  const {t} = useTranslation()
  const [email, setEmail] = useState('')
  const [loading] = useState(false)
  const { showMessage } = useMessage()

  return (
    <InvolvedStyle>
      <InvolvedContentStyle>
        <LinerText>{t(`GET INVOLVED, BE PART OF THE COMMUNITY`)}</LinerText>
        <SubBox>
          <SubInput placeholder={t(`Your email address`)} value={email} onChange={(event) => setEmail(event.target.value)}  />
          <LinerButton
            disabled={loading}
            radius={50}
            percent={0.5}
            width={160}
            height={50}
            onClick={() => {
              if (email) {
                showMessage(t(`Subscription successful`))
                setEmail('')
              } else {
                showMessage(t(`Please input your email`))
              }
            }}>{t(`Subscription`)}</LinerButton>
        </SubBox>
      </InvolvedContentStyle>
    </InvolvedStyle>
  )
}
