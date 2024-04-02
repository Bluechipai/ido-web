import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {FlexCol} from '../../components/flex/Flex.tsx'
import completeIcon from 'src/assets/img/apply/complete.png';
import LinerButton from '../../components/linerButton/LinerButton.tsx'
import {useNavigate} from 'react-router-dom'

const CompleteStyle = styled(FlexCol)`
    width: 9.6rem;
    height: 6.8rem;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.90);
    backdrop-filter: blur(1rem);
    border-radius: 0.16rem;
`;

/*const MiniButton = styled.button<{isGray?: boolean}>`
    height: 0.52rem;
    padding: 0 0.5rem;
    background: ${({isGray}) => isGray ? 'rgba(0, 0, 0, 0.20)' : 'linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%)'};
    border-radius: 0.4rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: ${({isGray}) => isGray ? '#fff' : '#000'};
    cursor: pointer;
    border: none;
    outline: none;
`;*/

export default function Complete() {
    const {t} = useTranslation();
    const navigate = useNavigate()

    return (
        <div style={{paddingTop: '2.08rem'}}>
          <CompleteStyle>
            <img src={completeIcon} style={{width: '2rem', height: '2rem', marginBottom: '0.68rem'}} alt="" />
            <div style={{fontSize: '0.28rem', fontWeight: 700, color: '#000', marginBottom: '0.16rem'}}>{t(`Congratulations`)}</div>
            <div style={{fontSize: '0.16rem', fontWeight: 500, color: 'rgba(0,0,0,0.57)', marginBottom: '0.16rem'}}>{t(`You have successfully submitted.`)}</div>
            <LinerButton
              width={144}
              height={52}
              radius={40}
              style={{marginTop: '0.88rem', color: '#000'}}
              onClick={() => {
                navigate(-1)
              }}>{t(`Back`)}</LinerButton>
          </CompleteStyle>
        </div>
    )
}
