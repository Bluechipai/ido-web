import styled from 'styled-components'

import history_bg from 'src/assets/img/history/history_bg.avif';
import {LinerText} from '../../global.style.ts'
export const StakingStyle = styled.div`
    min-height: 15.68rem;
    padding-bottom: 4.2rem;
    background: #000 url(${history_bg}) left bottom no-repeat;
    background-size: 100% auto;
`;

export const StakingContentStyle = styled.div`
    width: 14.4rem;
    margin: 0 auto;
    padding-top: 2.16rem;
`;

export const StakingTitle = styled(LinerText)`
    font-size: 0.68rem;
    font-weight: 500;
    margin-bottom: 0.48rem;
    text-transform: uppercase;
`;
export const StakingDesc = styled.div`
    width: 7.18rem;
    font-size: 0.2rem;
    margin-bottom: 0.64rem;
`;
export const DataTile = styled.div`
    font-size: 0.24rem;
    font-weight: 700;
    margin-bottom: 0.16rem;
`;
export const DataLabel = styled.div`
    font-size: 0.18rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
`;
