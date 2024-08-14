"use client"

import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Button from "@/components/Button.tsx"
import Modal from "@/components/Modal"
import Table from "@/components/Table"

const ProjectDetail = ({
  getHeader,
  id,
  modalLabel,
  modalState,
  setModalState,
}) => {
  const [loadingModal, setLoadingModal] = useState(true)
  const [modalStateCandidate, setModalStateCandidate] = useState(false)
  const [dataSummary, setDataSummary] = useState([])

  const getDataSummary = async (id) => {
    try {
      setLoadingModal(true)
      if (id == "") return
      const response = await axiosClient.get(`/project/` + id + `/summary`)
      setDataSummary(response.data.data)
      setLoadingModal(false)
    } catch (error) {
      console.error(error)
      // todo: handle error
    }
  }

  useEffect(() => {
    getDataSummary(id)
  }, [id])

  const generateAction = (test) => {
    return (
      <div className="flex justify-center">
        <Button
          text="View"
          icon="fa fa-search-plus"
          color="primary"
          size="xs"
          onClick={() => {
            setSelectedId(test.test_id)
            setHeaderCandidate(test.test_name)
            setModalStateCandidate(!modalStateCandidate)
          }}
        />
      </div>
    )
  }

  const headerDetail = [
    {
      type: "text",
      name: "Test Name",
      label: "test_name",
      width: "full",
    },
    {
      type: "text",
      name: "Status Progress",
      label: "status",
      width: "full",
      align: "center",
    },
    {
      type: "text",
      name: "Total",
      label: "candidate_total",
      width: "full",
      align: "center",
    },
    {
      type: "action",
      name: "Candidate List",
      label: "action",
      width: "full",
      align: "center",
      generateAction,
    },
  ]

  return (
    <div>
      <Modal
        modalLabel={modalLabel}
        size="lg"
        header={getHeader}
        modalState={modalState}
        handleCloseModal={() => setModalState(false)}
        loading={loadingModal}
      >
        <label className="label flex text-center font-semibold ">
          Description:
        </label>
        {modalLabel}
        <Table
          dataTable={dataSummary}
          header={headerDetail}
          enableLimit={false}
          enableSearch={false}
          enablePagination={false}
          enableSort={false}
        />
      </Modal>
    </div>
  )
}

export default ProjectDetail
