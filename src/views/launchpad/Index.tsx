import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    console.log(searchParams.get('id'))
  }, [])

  return <>
    <Outlet />
  </>
}
