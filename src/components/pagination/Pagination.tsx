import {CSSProperties, useEffect, useMemo} from 'react'
import {useEffectState} from 'src/hooks/useEffectState'
import Toggle from '../Toggle/Toggle'
import {
  ArrowIcon,
  More,
  PageItem,
  PaginationStyle,
} from './Pagination.style'
// import {regExpTemplate} from '../../utils/tools.ts'
// import DropDown from '../dropDown/DropDown.tsx'
// import Input from '../form/Input.tsx'
// import {INT_REG} from '../../utils/regExp.ts'
// import SvgIcon from '../svgIocn/SvgIcon.tsx'
// import {preSvgIcon} from '../../utils/svgManage.ts'
import {useTranslation} from 'react-i18next'
// import Input from '../form/Input.tsx'
// import {INT_REG} from '../../utils/regExp.ts'

interface IPagination {
  total?: number
  pageSize?: number
  page?: number
  onChange(page: number): void
  onPageSizeChange?(pageSize: number): void
  style?: CSSProperties
  className?: string
  visible?: number
  justifyCcontent?: string
}
export default function Pagination(props: IPagination) {
  const {t} = useTranslation()
  const state = useEffectState({
    page: props.page ?? 1,
    pageSize: props.pageSize ?? 10,
    total: props.total || 0,
    visible: props.visible ?? 5,
    visibleStart: 0,
    currentVisibleIndex: 1,
    searchPage: '',
  })

  useEffect(() => {
    if (typeof props.page === 'number') {
      state.page = props.page
    }
  }, [props.page])
  useEffect(() => {
    if (typeof props.total === 'number') {
      state.total = props.total
    }
  }, [props.total])
  useEffect(() => {
    if (typeof props.pageSize === 'number') {
      state.page = 1
      state.pageSize = props.pageSize
    }
  }, [props.pageSize])

  // const pageSize = useMemo(() => {
  //   return [
  //     {text: regExpTemplate(t(`10 / page`), {page: 10}), value: 10},
  //     {text: regExpTemplate(t(`10 / page`), {page: 20}), value: 20},
  //     {text: regExpTemplate(t(`10 / page`), {page: 50}), value: 50},
  //     {text: regExpTemplate(t(`10 / page`), {page: 100}), value: 100},
  //   ]
  // }, [i18n.language])
  /*useEffect(() => {
        props.onChange(state.current);
    }, [state.current]);*/
  // useEffect(() => {
  //     if (props.page && props.page !== state.page) {
  //         state.page = props.page;
  //     }
  // }, [props.page, state.page]);

  useEffect(() => {
    //state.current = 1;
    state.visibleStart = 0
  }, [state.total])
  const pages = useMemo(() => {
    const max = Math.ceil(state.total / state.pageSize)
    const arr = new Array(max).fill('').map((_item, index) => {
      return index + 1
    })
    return arr.slice(1, -1)
  }, [state.total, state.pageSize])
  const lastPage = useMemo(() => {
    return state.total <= state.pageSize ? 1 : pages.length + 2
  }, [pages, state.total, state.pageSize])

  /*useEffect(() => {
        if (state.currentVisibleIndex === 1) {
            state.visibleStart = 0;
        }
        state.visibleStart = (state.currentVisibleIndex - 1) * state.visible;
    }, [state.currentVisibleIndex, state.visible]);*/

  const visiblePages = useMemo(() => {
    /*let prePages = state.currentVisibleIndex * state.visible;
        if (pages.length - prePages < state.visible) {
            return pages.slice(pages.length - 5);
        }*/
    return pages.slice(state.visibleStart, state.visibleStart + state.visible)
  }, [pages, state.visibleStart, state.visible])
  useEffect(() => {}, [visiblePages])

  function pre() {
    if (state.page === 1) {
      return
    }
    state.page--
    if (!visiblePages.includes(state.page) && state.visibleStart > 0) {
      state.visibleStart -= 1
    }
    props.onChange(state.page)
  }

  function next() {
    if (state.page === lastPage) {
      return
    }
    state.page++
    if (
      !visiblePages.includes(state.page) &&
      state.visibleStart + state.visible < pages.length
    ) {
      state.visibleStart += 1
    }
    props.onChange(state.page)
  }

  return (
    <PaginationStyle
      style={props.style}
      className={props.className}>
      {state.total !== 0 ? (
        <div
          className={'flex items-center'}
          style={{justifyContent: 'flex-end'}}>
          {/*<div style={{marginRight: '0.2rem'}}>
            {regExpTemplate(t(`Total 85 items`), {total: state.total})}
          </div>*/}
          <ArrowIcon
            className={'arrowLeft'}
            onClick={pre}>
            {t(`Prev`)}
            {/*<SvgIcon
              dangerouslySetInnerHTML={preSvgIcon}
              color={`${isDark ? '#fff' : '#999'}`}
            />*/}
          </ArrowIcon>
          <PageItem
            className={`text-baseColor_light dark:text-baseColor ${
              state.page === 1 ? 'active' : ''
            }`}
            onClick={() => {
              state.page = 1
              props.onChange(1)
            }}>
            1
          </PageItem>
          <Toggle flag={state.visibleStart > 0}>
            <More
              className={'more text-baseColor_light dark:text-baseColor'}
              onClick={() => {
                /*if (state.currentVisibleIndex > 1) {
                                state.currentVisibleIndex--;
                            }*/
                if (state.visibleStart - state.visible < 0) {
                  state.visibleStart = 0
                } else {
                  state.visibleStart -= state.visible
                }
              }}>
              ...
            </More>
          </Toggle>
          {visiblePages.map((item) => {
            return (
              <PageItem
                className={`text-baseColor_light dark:text-baseColor ${
                  state.page === item ? 'active' : ''
                }`}
                key={item}
                onClick={() => {
                  state.page = item
                  props.onChange(item)
                }}>
                {item}
              </PageItem>
            )
          })}
          <Toggle
            flag={
              visiblePages.length === state.visible &&
              visiblePages[visiblePages.length - 1] + 1 < lastPage
            }>
            <More
              className={'more'}
              onClick={() => {
                // state.currentVisibleIndex++;
                if (
                  lastPage - (state.visibleStart + state.visible + 1) - 1 <
                  state.visible
                ) {
                  state.visibleStart = lastPage - state.visible - 2
                } else {
                  state.visibleStart += state.visible
                }
              }}>
              ...
            </More>
          </Toggle>
          <Toggle flag={state.total > state.pageSize}>
            <PageItem
              className={`text-baseColor_light dark:text-baseColor ${
                state.page === lastPage ? 'active' : ''
              }`}
              onClick={() => {
                state.page = lastPage
                props.onChange(lastPage)
              }}>
              {lastPage}
            </PageItem>
          </Toggle>
          <ArrowIcon
            className={'arrowRight'}
            onClick={next}>
            {t(`Next`)}
            {/*<SvgIcon
              dangerouslySetInnerHTML={preSvgIcon}
              color={`${isDark ? '#fff' : '#999'}`}
            />*/}
          </ArrowIcon>
          {/*<div
            className={'flex items-center'}
            style={{marginLeft: '0.12rem'}}>
            <PageSizeBox
              style={{
                background: isDark ? '#1C2230' : '#fff',
              }}>
              <DropDown
                options={pageSize}
                style={{padding: '0 0.16rem'}}
                defaultValue={props.pageSize}
                onChange={(selectd) => {
                  props.onChange(1)
                  props.onPageSizeChange?.(selectd.value)
                }}
              />
            </PageSizeBox>
            <div
              className={'flex items-center'}
              style={{marginLeft: '0.12rem'}}>
              <span>{t(`Go to`)}</span>
              <Input
                style={{
                  marginLeft: '0.1rem',
                  width: '0.58rem',
                  height: '0.3rem',
                  backgroundColor: isDark ? '#1C2230' : '#fff',
                }}
                inputStyle={{textAlign: 'center'}}
                value={state.searchPage}
                onWheel={(event) => event.currentTarget.blur()}
                onChange={(value) => {
                  if (value === '' || new RegExp(INT_REG, 'gi').test(value)) {
                    state.searchPage = value
                  }
                }}
                onKeyDown={(event) => {
                  console.log(event)
                  if (event.key === 'Enter') {
                    props.onChange(
                      state.searchPage ? Number(state.searchPage) : 1
                    )
                  }
                }}
              />
            </div>
          </div>*/}
        </div>
      ) : null}
    </PaginationStyle>
  )
}
