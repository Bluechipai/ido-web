import {useQueryUserPlat} from '../../api/user.ts'
import {IFundType} from '../../utils/types.ts'
import {useState} from 'react'
import {useAppSelector} from '../../store'
import {useColumns} from './History.tsx'
import ResponsiveTable from '../../components/table/ResponsiveTable.tsx'
import Pagination from '../../components/pagination/Pagination.tsx'
import Loading from '../../components/loadStatus/Loading.tsx'

type IProps = {
  financingStatus: number
}
export default function PublishList(props: IProps) {
  const userStore = useAppSelector((state) => state.users)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {data, isPending, queryClient} = useQueryUserPlat({
    page: page,
    pageSize: pageSize,
    financingStatus: props.financingStatus,
    fundType: IFundType.Public,
    user: userStore.address
  }, true)

  const columns = useColumns({
    reload: () => {
      queryClient.refetch()
    }
  })

  return (
    <div
      className={
        'relative min-h-[2rem] overflow-hidden rounded-[0.08rem] bg-box-light bg-no-repeat dark:bg-box dark:bg-box-size dark:shadow-box'
      }>
      { isPending ? <Loading /> : null }
      <ResponsiveTable
        usedHover={true}
        data={data?.list}
        rowClassName={'h-[0.64rem]'}
        columns={columns}
      />
      <div className={'mx-auto w-content-width md:w-auto'}>
        <Pagination
          total={data?.total}
          page={page}
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
          onPageSizeChange={(pageSize) => {
            setPageSize(pageSize)
          }}
        />
      </div>
    </div>
  )
}
