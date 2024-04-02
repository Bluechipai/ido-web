import {useTranslation} from 'react-i18next'
import {AgreementModalStyle} from './AgreementModal.style'
import {IOpenModal} from '../ModalContext/ModalContext.tsx'
import Modal from '../modal/Modal.tsx'

export type IAgreementModal = {
  onClose?(): void
  onSuccess?(): void
}
export default function AgreementModal(props: IAgreementModal & IOpenModal) {
  const {t} = useTranslation()

  return (
    <Modal
      title={<div style={{width: '4.47rem', textAlign: 'center', margin: '0 auto', lineHeight: '0.4rem'}}>
        {t(`BluechipAI Investment Risk Disclosure Agreement`)}
      </div>}
      isH5={false}
      style={{width: '7.6rem', borderRadius: '0.28rem'}}
      titleStyle={{marginBottom: '0.48rem'}}
      closeIcon={`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle opacity="0.4" cx="24" cy="24" r="24" fill="black"/>
        <rect x="30.2188" y="16" width="2.51471" height="20.1177" transform="rotate(45 30.2188 16)" fill="white"/>
        <rect x="32" y="30.2266" width="2.51471" height="20.1177" transform="rotate(135 32 30.2266)" fill="white"/>
      </svg>`}
      close={props.destoryComponent}>
      <AgreementModalStyle>
        <div>I hereby acknowledge that I have read, understood and agree to the following risks associated with investing through the BlueChipAI platform:</div>
        <div>I understand that blockchain startup projects listed on BlueChipAI are highly speculative investments and carry significant risk of loss up to my entire investment amount.</div>
        <div>I acknowledge that BlueChipAI does not guarantee the success of any project, their behaviors or ability to deliver products/services as promised in their whitepapers or roadmaps.</div>
        <div>I understand that projects may fail, abandon their work, experience hacks or encounter other unforeseen problems that could result in total loss of funds invested.</div>
        <div>I understand that regulatory uncertainties exist in the crypto space and projects could become non-compliant with future laws and be subject to penalties or restrictions.</div>
        <div>I understand that low liquidity means it may be difficult or impossible to sell my tokens if a project fails to gain sufficient adoption and trading volume.</div>
        <div>I understand token prices can experience high volatility, especially for low market cap tokens, and there is no guarantee any token will maintain or increase in value.</div>
        <div>I understand that BlueChipAI serves only as a platform and will not buy back any unsold tokens or reimburse me for any losses under any circumstances.</div>
        <div>I will not hold BlueChipAI legally responsible if a project engages in fraudulent behavior such as abandoning the project and absconding with investor funds (known as a "rug pull").</div>
        <div>I have performed my own due diligence on any projects I invest in and understand the associated crypto investment risks entirely at my own risk.</div>
        <div>By checking this box, I acknowledge I have read, understood and agree to all the terms of this Risk Disclosure Agreement.</div>
      </AgreementModalStyle>
    </Modal>
  )
}
