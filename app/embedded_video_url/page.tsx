"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

import Alert from "@/components/Alert"
import ButtonDropdown from "@/components/ButtonDropdown"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import EmbeddedVideoUrlCreate from "./EmbeddedVideoUrlCreate"
import EmbeddedVideoUrlDelete from "./EmbeddedVideoUrlDelete"
import EmbeddedVideoUrlEdit from "./EmbeddedVideoUrlEdit"

export default function EmbeddedVideoUrlPage() {
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [modalStateDelete, setModalStateDelete] = useState("")
  const [modalStateCreate, setModalStateCreate] = useState("")
  const [modalStateEdit, setModalStateEdit] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const embeddedVideoUrlCreate = "embeddedvideourl-create"
  const embeddedVideoUrlDelete = "embeddedvideourl-delete"
  const embeddedVideoUrlEdit = "embeddedvideourl-edit"

  const changeModalStateEdit = (id) => {
    setSelectedId(id)
    setModalStateEdit(!modalStateEdit)
  }
  const changeModalStateCreate = () => {
    setModalStateCreate(!modalStateCreate)
  }
  const changeModalStateDelete = (id) => {
    setSelectedId(id)
    setModalStateDelete(!modalStateDelete)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])
  const header = [
    {
      type: "text",
      name: "Title",
      label: "vidio_title",
    },
    {
      type: "html",
      name: "Video",
      label: "vidio_url",
      order: false,
      render: (data) => {
        const arrText = data.vidio_url.split("=")
        const code = arrText[arrText.length - 1]

        return (
          <div className="text-center">
            <div className="flex justify-center">
              <iframe
                width="220"
                height="150"
                src={`https://www.youtube.com/embed/${code}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${data.vidio_title}`}
              />
            </div>
            <a href={data.vidio_url} className="text-xs hover:text-blue-600">
              {data.vidio_url}
            </a>
          </div>
        )
      },
    },
    {
      type: "html",
      name: "Created At",
      label: "created_at",
      order: false,
      render: (data) => {
        const date = dayjs(data.created_at, "DD-MMM-YYYY HH:mm").format(
          "DD-MMM-YYYY HH:mm"
        )
        return <>{date}</>
      },
    },
    {
      type: "action",
      name: "Action",
      generateAction: (data) => (
        <div className="flex justify-center">
          <ButtonDropdown
            text="Action"
            icon="fa fa-bars"
            color="primary"
            size="xs"
            htmlFor={"evu"}
            actionList={[
              {
                text: "Edit",
                icon: "fa fa-pencil-square-o",
                onClick: () => changeModalStateEdit(data.id),
              },
              {
                text: "Delete",
                icon: "fa fa-trash",
                onClick: () => changeModalStateDelete(data.id),
              },
            ]}
          />
        </div>
      ),
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
              dataSource={`${process.env.API_URL}/embedded-vidio-url`}
              header={header}
              enableAddButton={true}
              buttonLabel={embeddedVideoUrlCreate}
              buttonText="Add Video URL"
              idName="id"
              handleAddButton={changeModalStateCreate}
              triggerFetch={triggerFetch}
            />
          </div>
          <EmbeddedVideoUrlCreate
            modalLabel={embeddedVideoUrlCreate}
            modalState={modalStateCreate}
            setModalState={setModalStateCreate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />

          <EmbeddedVideoUrlEdit
            id={selectedId}
            modalLabel={embeddedVideoUrlEdit}
            modalState={modalStateEdit}
            setModalState={setModalStateEdit}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <EmbeddedVideoUrlDelete
            id={selectedId}
            modalLabel={embeddedVideoUrlDelete}
            modalState={modalStateDelete}
            setModalState={setModalStateDelete}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
        </>
      )}
    </>
  )
}
