"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Alert from "@/components/Alert"
import ButtonDropdown from "@/components/ButtonDropdown"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import ProjectCreate from "./ProjectCreate"
import ProjectDelete from "./ProjectDelete"
import ProjectDetail from "./ProjectDetail"
import ProjectManage from "./ProjectManage"
import ProjectUpdate from "./ProjectUpdate.tsx"

export default function ProjectPage() {
  const [disabled, setDisabled] = useState(true)

  const [loadingPage, setLoadingPage] = useState(true)
  const [loadingModal, setLoadingModal] = useState(false)
  const [selectedId, setSelectedId] = useState("")
  const [detail, setDetail] = useState([])
  const [projectDescription, setProjectDescription] = useState(false)
  const [modalStateDetail, setModalStateDetail] = useState(false)
  const [modalStateDelete, setModalStateDelete] = useState(false)
  const [modalStateCreate, setModalStateCreate] = useState(false)
  const [modalStateUpdate, setModalStateUpdate] = useState(false)
  const [modalStateManage, setModalStateManage] = useState(false)
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const projectDetail = "project-detail"
  const projectCreate = "project-create"
  const projectDelete = "project-delete"
  const projectManage = "project-manage"
  const projectUpdate = "project-update"

  const changeModalStateCreate = () => {
    setModalStateCreate(!modalStateCreate)
  }
  const changeModalStateDetail = (project_id) => {
    setSelectedId(project_id)
    setModalStateDetail(!modalStateDetail)
  }
  const changeModalStateDelete = (project_id) => {
    setSelectedId(project_id)
    setModalStateDelete(!modalStateDelete)
  }
  const changeModalStateManage = (project_id) => {
    setSelectedId(project_id)
    setModalStateManage(!modalStateManage)
  }
  const changeModalStateUpdate = (project_id) => {
    setSelectedId(project_id)
    setModalStateUpdate(!modalStateUpdate)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const generateAction = (data) => {
    return (
      <div className="flex justify-center">
        <ButtonDropdown
          text="Summary"
          icon="fa fa-check-circle"
          color="primary"
          size="sm"
          htmlFor={"test"}
          onClick={() => {
            changeModalStateDetail(data.id)
            setProjectDescription(data.project_notes)
            setDetail(data.project_name)
          }}
          actionList={[
            {
              text: "Manage",
              icon: "fa fa-sliders",
              onClick: () => {
                changeModalStateManage(data.id)
              },
            },
            {
              text: "Update",
              icon: "fa fa-pencil-square-o",
              onClick: () => changeModalStateUpdate(data.id),
            },
            {
              text: "Delete",
              icon: "fa fa-trash",
              onClick: () => changeModalStateDelete(data.id),
            },
          ]}
        />
      </div>
    )
  }

  const header = [
    {
      type: "text",
      name: "Project Name",
      label: "project_name",
    },
    {
      type: "text",
      name: "Start Date",
      label: "project_start",
      align: "center",
      order: false,
      changeFunc: (data) =>
        dayjs(data.project_start).format("DD-MMM-YYYY HH:mm"),
    },
    {
      type: "text",
      name: "End Date",
      label: "project_end",
      align: "center",
      order: false,
      changeFunc: (data) => dayjs(data.project_end).format("DD-MMM-YYYY HH:mm"),
    },
    {
      type: "text",
      name: "Complete",
      label: "complete",
      order: false,
    },
    {
      type: "text",
      name: "On Progress",
      label: "on_progress",
      order: false,
    },
    {
      type: "text",
      name: "Not Login",
      label: "not_login",
      order: false,
    },
    {
      type: "text",
      name: "Total",
      label: "total",
      order: false,
    },
    {
      type: "action",
      name: "Action",
      label: "action",
      generateAction,
    },
  ]

  return (
    <>
      <SiteHeader />
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <div className="container mx-auto py-5">
            <Alert
              type={dataAlert.type}
              message={dataAlert.message}
              flag={showAlert}
              setFlag={setShowAlert}
            />

            <Table
              dataSource={`${process.env.API_URL}/project`}
              header={header}
              enableAddButton={true}
              buttonText="Add Project"
              buttonLabel={projectCreate}
              triggerFetch={triggerFetch}
              handleAddButton={changeModalStateCreate}
            />
          </div>

          <ProjectCreate
            modalState={modalStateCreate}
            setModalState={setModalStateCreate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <ProjectDelete
            id={selectedId}
            modalLabel={projectDelete}
            modalState={modalStateDelete}
            setModalState={setModalStateDelete}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <ProjectManage
            loadingModal={loadingModal}
            disabled={disabled}
            id={selectedId}
            modalLabel={projectManage}
            modalState={modalStateManage}
            setModalState={setModalStateManage}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <ProjectUpdate
            id={selectedId}
            modalLabel={projectUpdate}
            modalState={modalStateUpdate}
            setModalState={setModalStateUpdate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <ProjectDetail
            getHeader={detail}
            id={selectedId}
            modalLabel={projectDetail}
            modalState={modalStateDetail}
            setModalState={setModalStateDetail}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
          />
        </>
      )}
    </>
  )
}
