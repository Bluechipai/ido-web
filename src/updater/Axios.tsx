import {useEffectOnce} from 'react-use'
import axios from 'axios'
import {useMessage} from '../hooks/useMessage.ts'
import {useAppSelector} from '../store'

export default function Axios() {
  const {showMessage} = useMessage()
  const userStore = useAppSelector((state) => state.users)
  /* base url */
  useEffectOnce(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
  })

  useEffectOnce(() => {
    axios.interceptors.request.use(
      (config: any) => {
        if (config.headers) {
          config.headers['Accept-Language'] = userStore.language
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(async (response) => {
      switch (response.status) {
        /* HTTP StatusCode 200 */
        case 200: {
          /* Blob Data */
          if (response.data instanceof Blob) {
            return Promise.resolve(response)
          }
          if (response.headers['content-type'].includes('text/html')) {
            return Promise.resolve(response)
          }
          /* Server Code */
          if (response.data.code !== 0) {
            showMessage(response.data.msg)
          }
          switch (response.data.code) {
            case 0: {
              return Promise.resolve(response.data)
            }
            case 461:
            case 462: {
              return Promise.reject(response.data)
            }
            case 416:
              return Promise.reject(response.data)
            default: {
              return Promise.reject(response.data)
            }
          }
          /* Warning： */
          break
        }
        /* HTTP StatusCode Other */
        default: {
          showMessage(response.statusText)
          return Promise.reject(response.data)
        }
      }
    })
  })

  return null
}
