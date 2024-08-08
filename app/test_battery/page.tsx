"use client"

import * as React from "react"
import axiosClient from "@/utils/axiosClient"

import { SiteHeader } from "@/components/site-header"

import { Datas, columns } from "./columns"
import { DataTable } from "./data-table"

export default function TestBattery() {
  const [data, setData] = React.useState<Datas[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/battery")
        const datas = response.data.data.data
        console.log(datas)
        setData(datas)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  //   if (loading) {
  //     return <div>Loading...</div>
  //   }

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto py-[2px]">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
