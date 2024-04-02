import {ResponsiveTableStyle} from './ResponsiveTable.style.ts'
import {CSSProperties, ReactNode, useMemo} from 'react'
import {getFieldText} from '../../utils/tools.ts'
import styled, { css } from 'styled-components'

export type IResponsiveTableColumns = {
  text?: ReactNode
  field: string
  columnRender?(text: ReactNode, field: string): ReactNode
  columnName?: string
  render?(item: any, field: string, index: number): ReactNode
  className?: string
}
type IProps = {
  isH5?: boolean
  columns: IResponsiveTableColumns[]
  data: any[] | undefined
  rowClassName?: string
  rowStyle?: CSSProperties
  theadStyle?: CSSProperties
  hasFirstCol?: boolean
  gap?: string
  radius?: string
  rowBgColor?: string
  usedHover?: boolean
}
export default function ResponsiveTable(props: IProps) {
  const content = useMemo(() => {
    if (props.isH5) {
      return <RenderH5 {...props} />
    } else {
      return <RenderWeb {...props} />
    }
  }, [props])

  return <ResponsiveTableStyle>{content}</ResponsiveTableStyle>
}
const TableStyle = styled.table`
    thead{
        color: rgba(255,255,255,0.64);
    }
`;
const TableItemStyle = styled.tr<{radius?: string, gap?: string, rowBgColor?: string, usedHover?: boolean}>`
    position: relative;
    height: 1.44rem;
    border-bottom: ${({gap}) => gap || '0.08rem'} solid transparent;
    border-top: ${({gap}) =>gap || '0.08rem'} solid transparent;
    box-sizing: content-box;
    &:after{
        content: '';
        height: 88.8%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: ${({rowBgColor}) => rowBgColor || 'rgba(115, 171, 255, 0.20)'};
        border-radius: ${({radius}) => radius || '0.16rem'};
        pointer-events: none;
    }
    ${(usedHover) => usedHover
            ? null
            : css`
                &:hover{
                    color: #000;
                    td{
                        border-color: #000;
                    }
                    .cancel-button{
                        // background-color: rgba(255, 255, 255, 0.8);
                    }
                    &:after{
                        background: linear-gradient(90deg, rgba(123, 235, 255, 0.75) -5.12%, #FFF8DC 96.06%);
                    }
                    .auxiliary{
                        color: rgba(0, 0, 0, 0.6)
                    }
                } 
            `}
    td{
        border-color: #fff;
    }
    th{
        
    }
    .cancel-button{
        background-color: rgba(255, 255, 255, 0.2);
    }
    .auxiliary{
        color: rgba(255, 255, 255, 0.6)
    }
`;
function RenderWeb(props: IProps) {
  return (
    <TableStyle className={'w-[100%] border-collapse PlusJakartaSans-Medium'}>
      <thead className={' h-[0.64rem]'} style={props.theadStyle}>
        <tr className={'text-label_light dark:text-label'}>
          {props.columns.map((item, index) => {
            return (
              <th
                className={`font-normal ${item.className}`}
                key={index}>
                {item.columnRender
                  ? item.columnRender(item.text || '', item.field)
                  : item.text}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {props.data?.map((item, index) => {
          return (
            <TableItemStyle
              usedHover={props.usedHover}
              className={`${props.rowClassName}`}
              gap={props.gap}
              radius={props.radius}
              rowBgColor={props.rowBgColor}
              style={props.rowStyle}
              key={index}>
              {props.columns.map((item2, index2) => {
                return (
                  <td
                    className={`${item2.className} relative z-[1]`}
                    key={index2}>
                    {item2.render
                      ? item2.render?.(item, item2.field, index)
                      : getFieldText(item, item2.field)}
                  </td>
                )
              })}
            </TableItemStyle>
          )
        })}
      </tbody>
    </TableStyle>
  )
}

function RenderH5(props: IProps) {
  return (
    <div className={'child-n-l:mb-[0.2rem]'}>
      {props.data?.map((item, index) => {
        return (
          <div
            key={index}
            className={
              'rounded-[0.12rem] bg-[#fff] px-[0.12rem] py-[0.12rem] dark:bg-[#191F2C]'
            }>
            {props.columns.map((item2, index2) => {
              if (index2 === 0 && !props.hasFirstCol) {
                return null
              }
              return (
                <div
                  className={'flex min-h-[0.4rem] items-center justify-between'}
                  key={index2}>
                  <div className={'text-subtitle_light dark:text-subtitle'}>
                    {item2.columnRender
                      ? item2.columnRender?.(item.text || '', item.field)
                      : item2.text}
                  </div>
                  <div className={'flex flex-1 justify-end text-right'}>
                    {item2.render
                      ? item2.render?.(item, item2.field, index)
                      : getFieldText(item, item2.field)}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
