"use client"

import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Button from "@/components/Button.tsx"
import Modal from "@/components/Modal"
import Table from "@/components/Table"

import CandidateTestListModal from "../individual/CandidateTestListModal"

const ProjectCandidateList = ({
  project_id,
  id,
  getHeader,
  modalLabel,
  modalState,
  setModalStateCandidate,
}) => {
  const [loadingModal, setLoadingModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [modalStateCandidateTest, setModalStateCandidateTest] = useState(false)
  const [candidateList, setCandidateList] = useState([])

  useEffect(() => {
    if (id) {
      setLoadingModal(true)
      axiosClient
        .get(`/candidat/test/${id}`)
        .then((res) => {
          // setCandidateList(res.data.data.data)
          setLoadingModal(false)
        })
        .catch(() => {
          setLoadingModal(false)
        })
    }
  }, [id])

  // ?project_id=${project_id}

  const headerDetail = [
    {
      type: "text",
      name: "Name",
      label: "candidate_name",
      width: "full",
    },
    {
      type: "text",
      name: "Username",
      label: "username",
      width: "full",
      align: "center",
    },
    {
      type: "text",
      name: "Password",
      label: "password",
      width: "full",
      align: "center",
    },
    {
      type: "action",
      name: "Test List",
      label: "action",
      width: "full",
      align: "center",
      generateAction: (candidate) => {
        return (
          <div className="flex justify-center">
            <Button
              text="View"
              icon="fa fa-search-plus"
              color="primary"
              size="xs"
              onClick={() => {
                setSelectedId(candidate.id)
                setModalStateCandidateTest(true)
              }}
            />
          </div>
        )
      },
    },
  ]

  return (
    <Modal
      modalLabel={modalLabel}
      size="md"
      header={getHeader}
      modalState={modalState}
      handleCloseModal={() => setModalStateCandidate(false)}
      loading={loadingModal}
    >
      <Table
        dataSource={`${process.env.API_URL}/candidate/test/${id}`}
        // dataTable={candidateList}
        header={headerDetail}
        enableLimit={true}
        enableSearch={true}
        enablePagination={true}
        enableSort={true}
      />

      <CandidateTestListModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        modalState={modalStateCandidateTest}
        setModalState={setModalStateCandidateTest}
      />
    </Modal>
  )
}

export default ProjectCandidateList
