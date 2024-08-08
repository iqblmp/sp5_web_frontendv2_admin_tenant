"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
// import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
} from "lucide-react"
import moment from "moment"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Button from "@/components/Button"

import DateTime from "./DateTime"
import { Input } from "./ui/input"

type Table = {
  enableLimit: boolean
  enableSearch: true
  enablePagination: true
  enableSort: true
  enableNumbering: true
  header: any
  dataSource: any
  dataTable: any
  idName: string
  enableAddButton: false
  enableDateRange: false
  buttonLabel: string
  buttonText: string
  handleAddButton: any
  triggerFetch: false
}

export default function MainTable({
  enableLimit = true,
  enableSearch = true,
  enablePagination = true,
  enableSort = true,
  enableNumbering = true,
  header = "",
  dataSource,
  dataTable,
  idName = "id",

  enableAddButton = false,
  enableDateRange = false,
  buttonLabel = "",
  buttonText = "",
  handleAddButton,
  triggerFetch = false,
}: Table) {
  const [data, setData] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [limit, setLimit] = useState<number>(10)

  const [orderBy, setOrderBy] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalData, setTotalData] = useState<number>(0)

  const [pageList, setPageList] = useState<[]>([])
  const [timer, setTimer] = useState<number>(0)

  const [startDate, setStartDate] = useState(moment().subtract(2, "year"))
  const [endDate, setEndDate] = useState(moment())

  useEffect(() => {
    setLoading(dataTable ? false : true)
    dataTable
      ? setData(dataTable)
      : axiosClient
          .get(`${dataSource}`, {
            params: {
              search: search,
              order_by: orderBy,
              sort_by: sortBy,
              page: page,
              per_page: limit,
            },
          })
          .then((res) => {
            const data = res.data.data
            setData(data.data || [])
            setTotalPage(data.last_page)
            setTotalData(data.total)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
  }, [triggerFetch, dataTable])

  useEffect(() => {
    setData(dataTable || [])
  }, [dataTable])

  const loadData = (key, value, otherKey, otherValue) => {
    setLoading(true)
    const parameterData = {
      search,
      limit,
      page,
      orderBy,
      sortBy,
    }
    let time = 3000
    parameterData[key] = value
    if (key === "search") {
      parameterData.page = 1
      parameterData.orderBy = ""
      parameterData.sortBy = ""
    } else if (key === "limit") {
      parameterData.page = 1
    } else if (key === "orderBy") {
      parameterData[otherKey] = otherValue
    }
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      axiosClient
        .get(`${dataSource}`, {
          params: {
            search: parameterData.search,
            per_page: parameterData.limit,
            page: parameterData.page,
            order_by: parameterData.orderBy,
            sort_by: parameterData.sortBy,
          },
        })
        .then((res) => {
          const data = res.data.data
          setData(data.data || [])
          setTotalPage(data.last_page)
          setTotalData(data.total)
          if (!(key === "page" || key === "orderBy")) {
            setPage(data.current_page)
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }, time)
    setTimer(newTimer)
  }

  const handleLimitChange = (e) => {
    setLimit(e)
    setPage(1)
    loadData("limit", e)
  }

  const handleSearchChange = (e) => {
    const len = e.target.value.length
    setSearch(e.target.value)
    if (len >= 3 || len === 0) {
      setOrderBy("")
      setSortBy("")
      setPage(1)
      loadData("search", e.target.value)
    }
  }

  const handlePageChange = (val) => {
    if ((val === "previous" || val === "first") && page === 1) return
    if ((val === "next" || val === "last") && page === totalPage) return

    let value = val
    if (val === "previous") {
      setPage(page - 1)
      value = page - 1
    } else if (val === "next") {
      setPage(page + 1)
      value = page + 1
    } else if (val === "first") {
      setPage(1)
      value = 1
    } else if (val === "last") {
      setPage(totalPage)
      value = totalPage
    } else setPage(val)
    loadData("page", value)
  }

  const handleSort = (val) => {
    setOrderBy(val)
    let sort = ""
    if (val !== orderBy) sort = "asc"
    else sort = sortBy === "asc" ? "desc" : "asc"
    setSortBy(sort)
    loadData("orderBy", val, "sortBy", sort)
  }

  const generatePaginationArray = (page, totalPage) => {
    if (totalPage === 1) return []
    if (totalPage < 7) {
      const arr = []
      for (let i = 1; i <= totalPage; i++) {
        arr.push(i)
      }
      return arr
    }

    const arr = [1]

    if (page > 4) arr.push("...")
    else arr.push(2)

    if (page > 4 && page < totalPage - 3) arr.push(page - 1)
    else if (page > 4 && page == totalPage - 3) arr.push(page - 1)
    else if (page > 4 && page == totalPage - 2) arr.push(page - 2)
    else if (page > 4 && page == totalPage - 1) arr.push(page - 3)
    else if (totalPage == page) arr.push(totalPage - 4)
    else if (page > 4) arr.push(totalPage - 2)
    else arr.push(3)

    if (page < 4) arr.push(4)
    else if (page > totalPage - 3) arr.push(totalPage - 3)
    else if (page > totalPage - 2) arr.push(totalPage - 2)
    else arr.push(page)

    if (page < totalPage - 3 && page > 4) arr.push(page + 1)
    else if (page == totalPage - 3 && page > 4) arr.push(page + 1)
    else if (page < totalPage - 3) arr.push(5)
    else arr.push(totalPage - 2)

    if (page == totalPage - 3) arr.push(page + 2)
    else if (page < totalPage - 2) arr.push("...")
    else arr.push(totalPage - 1)

    arr.push(totalPage)

    return arr
  }

  useEffect(() => {
    setPageList(generatePaginationArray(page, totalPage))
  }, [page, totalPage])

  return (
    <div>
      <div
        className={`flex flex-row gap-1 ${
          (enableLimit && enableSearch && "justify-between") ||
          (enableLimit && "justify-start") ||
          (enableSearch && "justify-end")
        } mb-4`}
      >
        {enableLimit && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Limit:</p>
            <Select value={limit} onValueChange={handleLimitChange}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value={10}>10</SelectItem>
                <SelectItem value={25}>25</SelectItem>
                <SelectItem value={50}>50</SelectItem>
                <SelectItem value={100}>100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {enableSearch && (
          <div className="flex gap-3">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Filter:</p>
              <Input
                className="input h-8 rounded-md border bg-transparent text-black dark:text-white input-sm"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            {enableDateRange && (
              <div className="flex gap-2 items-center">
                <p className="text-sm font-medium">Period:</p>
                <DateTime
                  className="w-24 input-sm"
                  value={startDate}
                  dateFormat="MM-YYYY"
                  position="right"
                  timeFormat=""
                />
                <span>-</span>
                <DateTime
                  className="w-24 input-sm"
                  value={endDate}
                  dateFormat="MM-YYYY"
                  position="left"
                  timeFormat=""
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" border mb-3">
        <Table>
          <TableHeader>
            <TableRow>
              {enableNumbering && (
                <TableHead>
                  <div className="text-white text-wrap text-center">No.</div>
                </TableHead>
              )}
              {header
                .map((col) => ({
                  ...col,
                  order: col.order === undefined ? true : col.order,
                }))
                .map((col) => {
                  if (col.type === "text" || col.type === "html") {
                    return (
                      <TableHead
                        key={col.name}
                        className={`${
                          enableSort && col.order ? "cursor-pointer" : ""
                        }`}
                        onClick={
                          enableSort && col.order
                            ? () => handleSort(col.label)
                            : () => {}
                        }
                      >
                        <div className="text-white flex justify-center items-center gap-1">
                          <div className="text-wrap text-center">
                            {col.name}
                          </div>
                          {enableSort && col.order && (
                            <span className="float-right">
                              {orderBy === col.label ? (
                                sortBy === "asc" ? (
                                  <ArrowDownWideNarrow className="h-4 w-4" />
                                ) : (
                                  <ArrowUpNarrowWide className="h-4 w-4" />
                                )
                              ) : (
                                <ChevronsUpDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </TableHead>
                    )
                  } else if (col.type === "action") {
                    return (
                      <TableHead key={col.name}>
                        <div className="text-white text-wrap text-center">
                          {col.name}
                        </div>
                      </TableHead>
                    )
                  }
                })}
            </TableRow>
          </TableHeader>
          <TableBody className="p-0">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={header.length + (enableNumbering ? 1 : 0)}
                  style={{ border: "none" }}
                >
                  <div className="flex justify-center items-center  py-[30px]">
                    <div className="spinner-dot-circle spinner-md spinner-primary">
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={`${item[idName]}-${page}-${index}`}
                  className={`${index % 2 === 0 ? "bg-muted" : ""}`}
                >
                  {enableNumbering && (
                    <TableCell className="text-center">
                      {(page - 1) * limit + index + 1}.
                    </TableCell>
                  )}
                  {header.map((col) => {
                    if (col.type === "text") {
                      return (
                        <TableCell
                          key={col.name}
                          className={`${col.width ? `w-${col.width}` : ""}`}
                        >
                          <div
                            className={`text-wrap ${
                              col.align ? `text-${col.align}` : ""
                            }`}
                          >
                            {col.changeFunc
                              ? col.changeFunc(item)
                              : item[col.label]}
                          </div>
                        </TableCell>
                      )
                    } else if (col.type === "html") {
                      return (
                        <TableCell key={col.name}>{col.render(item)}</TableCell>
                      )
                    } else if (col.type === "action") {
                      return (
                        <TableCell key={col.name}>
                          {col.generateAction(item, index, data.length)}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={header.length + (enableNumbering ? 1 : 0)}
                  style={{ border: "none" }}
                >
                  <div className="text-center py-10">Data not found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && data.length > 0 && (
        <div className="flex flex-col lg:flex-row justify-between items-center px-2">
          <div className="flex-1 text-sm text-muted-foreground">{`Showing ${
            (page - 1) * limit + 1
          } to ${
            totalData < page * limit ? totalData : page * limit
          } of ${totalData} ${totalData !== 1 ? "entries" : "entry"}`}</div>
          {totalPage > 1 && (
            // <div className="flex justify-end">
            //   <div className="pagination flex-wrap gap-1">
            //     <button
            //       className="btn btn-sm px-2"
            //       disabled={page === 1}
            //       onClick={() => handlePageChange("first")}
            //     >
            //       First
            //     </button>
            //     <button
            //       className="btn btn-sm px-2"
            //       disabled={page === 1}
            //       onClick={() => handlePageChange("previous")}
            //     >
            //       Previous
            //     </button>
            //     {pageList.map((num, index) => {
            //       if (num === "...") {
            //         return (
            //           <button
            //             key={`${num}-${index}`}
            //             disabled
            //             className="btn btn-sm"
            //           >
            //             ...
            //           </button>
            //         )
            //       } else {
            //         return (
            //           <button
            //             key={`${num}-${index}`}
            //             className={`btn btn-sm ${
            //               num === page ? "btn-active" : ""
            //             }`}
            //             onClick={() => handlePageChange(num)}
            //           >
            //             {num}
            //           </button>
            //         )
            //       }
            //     })}
            //     <button
            //       className="btn btn-sm px-2"
            //       disabled={page === totalPage}
            //       onClick={() => handlePageChange("next")}
            //     >
            //       Next
            //     </button>
            //     <button
            //       className="btn btn-sm px-2"
            //       disabled={page === totalPage}
            //       onClick={() => handlePageChange("last")}
            //     >
            //       Last
            //     </button>
            //   </div>
            // </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              {/* <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select value={limit} onValueChange={handleLimitChange}>
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={25}>25</SelectItem>
                    <SelectItem value={50}>50</SelectItem>
                    <SelectItem value={100}>100</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {page} of {totalPage}
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Button
                  colorStyle="outline"
                  color="primary"
                  size="sm"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={page === 1}
                  onClick={() => handlePageChange("first")}
                >
                  <span className="sr-only">Go to first page</span>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  colorStyle="outline"
                  color="primary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={page === 1}
                  onClick={() => handlePageChange("previous")}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                {pageList.map((num, index) => {
                  if (num === "...") {
                    return (
                      <Button
                        colorStyle="outline"
                        color="primary"
                        size="sm"
                        key={`${num}-${index}`}
                        disabled
                        // className="btn btn-sm"
                      >
                        ...
                      </Button>
                    )
                  } else {
                    return (
                      <Button
                        colorStyle="outline"
                        color={num === page ? "warning" : "primary"}
                        size="sm"
                        key={`${num}-${index}`}
                        // className={`btn btn-sm ${
                        //   num === page ? "btn-active" : ""
                        // }`}
                        onClick={() => handlePageChange(num)}
                      >
                        {num}
                      </Button>
                    )
                  }
                })}
                <Button
                  colorStyle="outline"
                  color="primary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={page === totalPage}
                  onClick={() => handlePageChange("next")}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  colorStyle="outline"
                  color="primary"
                  size="sm"
                  //   className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={page === totalPage}
                  onClick={() => handlePageChange("last")}
                >
                  <span className="sr-only">Go to last page</span>
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {enableAddButton && (
        <div className="pt-3 ">
          <Button
            text={buttonText}
            color="primary"
            width="medium"
            htmlFor={buttonLabel}
            icon="fa fa-plus"
            onClick={handleAddButton}
          />
        </div>
      )}
    </div>
  )
}
