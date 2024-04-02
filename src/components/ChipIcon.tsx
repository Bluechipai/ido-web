import styled from 'styled-components'
import {FlexBox} from './flex/Flex.tsx'
import SvgIcon from './svgIocn/SvgIcon.tsx'
import {ChipSvgIcon} from '../utils/svgManage.ts'
import {HTMLProps} from 'react'

const ChipIconStyle = styled(FlexBox)`
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    background: #000;
`;

export default function ChipIcon(props: HTMLProps<HTMLDivElement>) {

    return (
        <ChipIconStyle {...props}>
            <SvgIcon dangerouslySetInnerHTML={ChipSvgIcon} />
        </ChipIconStyle>
    )
}
