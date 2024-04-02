import {CloseBox, ImageBox, UploadBox, Uploader} from './UploadFile.style'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {ChangeEvent, useEffect, useState} from 'react'
import {awaitWrap} from '../../utils/tools.ts'
import axios from 'axios'

type IProps = {
  fileURL?: string
  onUpload: (fileURL: string) => void
  onRemove?(): void
  hideRemove?: boolean
}
export default function UploadFile(props: IProps) {
  const [fileURL, setFileURL] = useState(props.fileURL || '')

  useEffect(() => {
    setFileURL(props.fileURL || '')
  }, [props.fileURL])

  async function onUpload(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const [resData] = await awaitWrap(axios.post('/fileUploadAndDownload/upload', formData))
    if (resData) {
      const url = resData.data.file.url;
      setFileURL(url);
      props.onUpload(url);
    }
  }

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      {
        fileURL
          ? <ImageBox>
            <img src={fileURL} style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '0.12rem'}} alt="" />
          </ImageBox>
          : <UploadBox>
            <Uploader
              type={'file'}
              onChange={onUpload} />
          </UploadBox>
      }
      {
        props.hideRemove
          ? null
          : <CloseBox onClick={() => {
              setFileURL('')
              props.onUpload('')
              props.onRemove?.()
            }}>
              <SvgIcon
                dangerouslySetInnerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle opacity="0.4" cx="12" cy="12" r="12" fill="black"/>
                            <rect x="15.1094" y="8" width="1.25735" height="10.0588" transform="rotate(45 15.1094 8)" fill="white"/>
                            <rect x="16" y="15.1133" width="1.25735" height="10.0588" transform="rotate(135 16 15.1133)" fill="white"/>
                          </svg>`}
              />
            </CloseBox>
      }
    </div>
  )
}
