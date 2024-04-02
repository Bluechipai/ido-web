import {DotContainer, LoadingDotStyle} from "./LoadingDot.style";

export function LoadingDot() {
    return <DotContainer>
        <span>Loading</span>
        <LoadingDotStyle>...</LoadingDotStyle>
    </DotContainer>
}
