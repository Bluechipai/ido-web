import {ApplyStyle} from './Apply.style.ts'
import Footer from '../../components/footer/Footer.tsx'
import {Outlet} from 'react-router-dom'

export default function Index() {

    return (
      <div>
        <ApplyStyle>
          <Outlet />
        </ApplyStyle>
        <Footer />
      </div>
    )
}
