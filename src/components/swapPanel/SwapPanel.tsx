import { useTranslation } from 'react-i18next';
import { SwapPanelStyle } from './SwapPanel.style';
import zkSwap from 'src/assets/img/zkSwap.webp';
import {HTMLProps} from 'react'

export default function SwapPanel(props: HTMLProps<HTMLAnchorElement>) {
    const {t} = useTranslation();

    return (
        <SwapPanelStyle {...props}>
            <img src={zkSwap} style={{width: '0.28rem', marginRight: '0.08rem'}} alt="" />
            <span>{t(`zksync swap`)}</span>
        </SwapPanelStyle>
    )
}
