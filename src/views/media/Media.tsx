import {useTranslation} from 'react-i18next'
import {
  MediaButton,
  MediaContent,
  MediaContentStyle,
  MediaDesc,
  MediaItem,
  MediaItemBox,
  MediaStyle,
  MediaTitle,
} from './Media.style'
import {FlexCol, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import Footer from '../../components/footer/Footer.tsx'
import {useMemo} from 'react'

import media1 from 'src/assets/img/media/media1.png';
import media2 from 'src/assets/img/media/media2.png';
import media3 from 'src/assets/img/media/media3.png';
import media4 from 'src/assets/img/media/media4.png';
import media5 from 'src/assets/img/media/media5.png';
import media6 from 'src/assets/img/media/media6.png';
import media7 from 'src/assets/img/media/media7.png';
import media8 from 'src/assets/img/media/media8.png';
import media9 from 'src/assets/img/media/media9.png';
import {downloadURL} from '../../config.ts'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

export default function Media() {
  const {t} = useTranslation()

  const mediaArr = useMemo(() => {
    return [
      {
        icon: media1,
        iconStyle: {width: '2.24rem'},
        style: {background: '#fff'},
        label: t(`Logo black font`)
      },
      {
        icon: media2,
        iconStyle: {width: '2.24rem'},
        style: {background: '#fff'},
        label: t(`Logo black `)
      },
      {
        icon: media3,
        iconStyle: {width: '1.84rem'},
        style: {background: '#fff'},
        label: t(`White font`)
      },
      {
        icon: media4,
        iconStyle: {width: '2.24rem'},
        style: {background: '#2B2B2B'},
        label: t(`Logo white font`)
      },
      {
        icon: media5,
        iconStyle: {width: '2.24rem'},
        style: {background: '#2B2B2B'},
        label: t(`Logo white`)
      },
      {
        icon: media6,
        iconStyle: {width: '1.84rem'},
        style: {background: '#2B2B2B'},
        label: t(`White font`)
      },
      {
        icon: media7,
        iconStyle: {width: '0.77rem'},
        style: {background: '#fff'},
        label: t(`Symbol color`)
      },
      {
        icon: media8,
        iconStyle: {width: '0.77rem'},
        style: {background: '#fff'},
        label: t(`Symbol black`)
      },
      {
        icon: media9,
        iconStyle: {width: '0.77rem'},
        style: {background: '#2B2B2B'},
        label: t(`Symbol white`)
      }
    ]
  }, [])

  return (
    <div>
      <MediaStyle>
        <MediaContentStyle>
          <FlexCol style={{alignItems: 'flex-start', marginBottom: '1rem'}}>
            <MediaTitle>{t(`Media kit`)}</MediaTitle>
            <FlexSb style={{width: '100%', alignItems: 'flex-end'}}>
              <MediaDesc>{t(`The BluechiAI logo displayed in the official colors and usage patterns. Do not place the logo on top of other objects and leave a reasonable amount of margin around the outside so the logo is clearly visible.`)}</MediaDesc>
              <LinerButton
                width={315}
                height={50}
                radius={40}
                percent={0.6}
                target={'_blank'}
                className={'PlusJakartaSans-SemiBold'}
                onClick={() => {
                  window.open(downloadURL, '_blank')
                }}>{t(`Download all logo`)}</LinerButton>
            </FlexSb>
          </FlexCol>
          <MediaContent>
            {
              mediaArr.map((item, index) => {
                return <MediaItem key={index}>
                  <MediaItemBox style={item.style}>
                    <img src={item.icon} style={item.iconStyle} alt="" />
                  </MediaItemBox>
                  <FlexSb>
                    <span style={{color: 'rgba(255,255,255,0.6)'}}>{item.label}</span>
                    <FlexRow>
                      <MediaButton>SVG</MediaButton>
                      <MediaButton style={{color: '#fff', marginLeft: '0.08rem'}}>PNG</MediaButton>
                    </FlexRow>
                  </FlexSb>
                </MediaItem>
              })
            }
          </MediaContent>
        </MediaContentStyle>
      </MediaStyle>
      <Footer />
    </div>
  )
}
