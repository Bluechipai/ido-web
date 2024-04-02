import React, {useMemo} from 'react'
import {FlexBox, FlexRow} from '../components/flex/Flex.tsx'
import SvgIcon from '../components/svgIocn/SvgIcon.tsx'
import {project} from '../contract/config.ts'
import {useAppSelector} from '../store'

export function useTokens() {
  const userStore = useAppSelector((state) => state.users)

  return useMemo(() => {
    return [
      {
        text: 'USDT',
        value: 'USDT',
        address: project.contracts.USDT.address,
        abi: project.contracts.USDT.abi,
        decimal: userStore.supportTokens[project.contracts.USDT.address],
        render(text: string): React.ReactNode {
          return <FlexRow>
            <FlexBox style={{width: '0.32rem', height: '0.32rem'}}>
              <SvgIcon dangerouslySetInnerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                            <g clip-path="url(#clip0_1115_8639)">
                              <rect x="6.43359" y="3.68848" width="15.3754" height="13.3481" rx="2.66667" fill="white"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.54767 0.883789H21.819C22.1834 0.883789 22.52 1.08174 22.7018 1.40287L27.151 9.26532C27.3817 9.67307 27.3132 10.1877 26.9841 10.5183L14.7376 22.8221C14.3408 23.2207 13.7027 23.2207 13.306 22.8221L1.07607 10.535C0.739323 10.1966 0.676264 9.66697 0.923894 9.2567L5.6797 1.37765C5.86493 1.0708 6.1936 0.883789 6.54767 0.883789ZM19.8472 4.3941V6.60017H15.497V8.12972C18.5523 8.29317 20.8446 8.96451 20.8616 9.76917L20.8615 11.4466C20.8445 12.2513 18.5523 12.9226 15.497 13.0861V16.8397H12.6084V13.0861C9.55317 12.9226 7.26089 12.2513 7.24388 11.4466L7.244 9.76917C7.26099 8.96451 9.55317 8.29317 12.6084 8.12972V6.60017H8.25825V4.3941H19.8472ZM14.0527 11.9336C17.3133 11.9336 20.0385 11.366 20.7055 10.6079C20.1399 9.96504 18.0942 9.45912 15.497 9.32017V10.9216C15.0315 10.9465 14.5483 10.9596 14.0527 10.9596C13.5572 10.9596 13.0739 10.9465 12.6084 10.9216V9.32017C10.0113 9.45912 7.96559 9.96504 7.40002 10.6079C8.06697 11.366 10.7922 11.9336 14.0527 11.9336Z" fill="#009393"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1115_8639">
                                <rect width="26.6667" height="22.6667" fill="white" transform="translate(0.667969 0.666992)"/>
                              </clipPath>
                            </defs>
                          </svg>`}
              />
            </FlexBox>
            <span style={{marginLeft: '0.08rem', fontSize: '0.2rem', fontWeight: 700}}>{text}</span>
          </FlexRow>
        }
      },
      {
        text: 'Chip',
        value: 'Chip',
        address: project.contracts.Chip.address,
        abi: project.contracts.Chip.abi,
        decimal: userStore.supportTokens[project.contracts.Chip.address],
        render(text: string): React.ReactNode {
          return <FlexRow>
            <FlexBox style={{width: '0.32rem', height: '0.32rem'}}>
              <SvgIcon dangerouslySetInnerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M19.13 12.8867V6.66699H6.66797V12.8867H19.1074C12.2496 12.8867 6.6906 18.4389 6.6906 25.2885H13.1155C13.1155 21.9842 15.7976 19.3038 19.1074 19.3038V25.3337H25.3346V12.8867H19.13Z" fill="url(#paint0_linear_1115_8645)"/>
                        <defs>
                          <linearGradient id="paint0_linear_1115_8645" x1="6.66779" y1="16.0001" x2="25.335" y2="16.0001" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0422" stop-color="#7BEBFF"/>
                            <stop offset="0.9071" stop-color="#FFECA0"/>
                          </linearGradient>
                        </defs>
                      </svg>`}
              />
            </FlexBox>
            <span style={{marginLeft: '0.08rem', fontSize: '0.2rem', fontWeight: 700}}>{text}</span>
          </FlexRow>
        }
      }
    ]
  }, [userStore.supportTokens]);
}
