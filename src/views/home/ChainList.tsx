import styled from 'styled-components'
import SvgIcon from '../../components/svgIocn/SvgIcon.tsx'
import {
  APTImg,
  arbitrumImg,
  avalancheImg,
  bnbImg,
  ethereumImg,
  fantomImg,
  mantaImg,
  metisImg,
  optimismImg,
  polygonImg,
  solrnrImg,
  suiImg,
  zkSyncImg
} from '../../utils/svgManage.ts'

const BannerImgRow = styled.div`
  width: max-content;
  display: flex;
  animation: animation-infinite-x 25s linear infinite;
`

const BannerImgBox = styled.div`
  overflow: hidden;
`
/*const BannerImgModalLeft = styled.div<{isDark: boolean}>`
  pointer-events: none;
  background: ${({isDark}) =>
    isDark
      ? 'linear-gradient(90deg, #0D131E 0%, rgba(13, 19, 30, 0.00) 100%)'
      : 'linear-gradient(90deg, #f0f6f8 0%, rgba(240, 246, 248, 0) 100%)'};
  position: absolute;
  z-index: 1;
  width: 1.1rem;
  height: 100%;
  left: 0rem;
`
const BannerImgModalRight = styled.div<{isDark: boolean}>`
  pointer-events: none;
  background: ${({isDark}) =>
    isDark
      ? 'linear-gradient(90deg, #0D131E 0%, rgba(13, 19, 30, 0.00) 100%)'
      : 'linear-gradient(90deg, #f0f6f8 0%, rgba(240, 246, 248, 0) 100%)'};

  transform: rotate(180deg);
  position: absolute;
  z-index: 1;
  width: 1.1rem;
  right: 0rem;
  height: 100%;
`*/
export default function ChainList() {

  const chainList = [
      {
        name: 'avalanche',
        img: avalancheImg
      },
      {
        name: 'manta',
        img: mantaImg
      },
      {
        name: 'Ethereum',
        img: ethereumImg,
      },
      {
        name: 'fantomImg',
        img: fantomImg
      },
      {
        name: 'solrnr',
        img: solrnrImg
      },
      {
        name: 'sui',
        img: suiImg
      },
      {
        name: 'Binance Smart Chain',
        img: bnbImg,
      }
    ];
  const chainList2 = [
    {
      name: 'APT',
      img: APTImg
    },
    {
      name: 'zkSync',
      img: zkSyncImg
    },
    {
      name: 'polygon',
      img: polygonImg,
    },
    {
      name: 'metis',
      img: metisImg
    },
    {
      name: 'arbitrum',
      img: arbitrumImg
    },
    {
      name: 'optimism',
      img: optimismImg
    }
  ];

  return (
    <BannerImgBox className={'mx-auto w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'}>
      {/*<BannerImgModalLeft isDark={isDark} />
      <BannerImgModalRight isDark={isDark} />*/}
      <BannerImgRow>
        {
          chainList.concat(chainList).map((item,index) => {
            return <SvgIcon
              key={index}
              dangerouslySetInnerHTML={item.img}
              style={{marginRight: '1.8rem'}}
            />
          })
        }
      </BannerImgRow>
      <BannerImgRow className={'mt-[0.48rem]'}>
        {
          chainList2.concat(chainList2).map((item,index) => {
            return <SvgIcon
              key={index}
              dangerouslySetInnerHTML={item.img}
              style={{marginRight: '1.8rem'}}
            />
          })
        }
      </BannerImgRow>
    </BannerImgBox>
  )
}
