"use client"

import { useEffect, useState } from "react"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ButtonDropdown from "@/components/ButtonDropdown"
import HtmlPreview from "@/components/HtmlPreview"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import EmailInvitationCreate from "./EmailInvitationCreate"
import EmailInvitationEdit from "./EmailInvitationEdit"
import EmailInvitationPreview from "./EmailInvitationPreview"
import EmailInvitationDelete from "./EmailinvitationDelete"

export default function EmailInvitationPage() {
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [modalStateDelete, setModalStateDelete] = useState("")
  const [modalStateCreate, setModalStateCreate] = useState("")
  const [modalStatePreview, setModalStatePreview] = useState("")
  const [modalStateEdit, setModalStateEdit] = useState("")
  const [modalStateEnglish, setModalStateEnglish] = useState(false)
  const [modalStateIndonesia, setModalStateIndonesia] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [content, setContent] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const emailInvitationIndonesia = "emailinvitation-indonesia"
  const emailInvitationEnglish = "emailinvitation-english"
  const emailInvitationCreate = "emailinvitation-create"
  const emailInvitationPreview = "emailinvitation-preview"
  const emailInvitationDelete = "emailinvitation-delete"
  const emailInvitationEdit = "emailinvitation-edit"

  const changeModalStatePreview = (row) => {
    setSelectedId(row.id)
    setModalStatePreview(!modalStatePreview)
  }
  const changeModalStateEdit = (row) => {
    setSelectedId(row.id)
    setModalStateEdit(!modalStateEdit)
  }
  const changeModalStateCreate = () => {
    setModalStateCreate(!modalStateCreate)
  }
  const changeModalStateDelete = (row) => {
    setSelectedData(row)
    setSelectedId(row.id)
    setModalStateDelete(!modalStateDelete)
  }
  const changeModalStateIndonesia = () => {
    setModalStateIndonesia(!modalStateIndonesia)
  }
  const changeModalStateEnglish = () => {
    setModalStateEnglish(!modalStateEnglish)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const header = [
    {
      type: "text",
      name: "Template Name",
      label: "email_name",
    },
    {
      type: "text",
      name: "Subject",
      label: "email_subject",
    },
    {
      type: "html",
      name: "Content",
      label: "email_content",
      render: (data) => {
        return <div dangerouslySetInnerHTML={{ __html: data.email_content }} />
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
            htmlFor={"ei"}
            actionList={[
              {
                text: "Preview",
                icon: "fa fa-search-plus",
                onClick: () => {
                  changeModalStatePreview(data)
                },
              },
              {
                text: "Edit",
                icon: "fa fa-pencil-square-o",
                onClick: () => changeModalStateEdit(data),
              },
              {
                text: "Delete",
                icon: "fa fa-trash",
                onClick: () => changeModalStateDelete(data),
              },
            ]}
          />
        </div>
      ),
    },
  ]

  const indonesia = `
        <div style="background-color: #00A9E9; padding: 10px; border-radius: 5px">
            <div style="background-color: #fff !important; color: #373a3c; padding: 10px; border-radius: 5px;">
                <p style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid #cccccc;">Dear <strong>CANDIDATENAME</strong>,</p>
                <div>
                    <p>Sehubungan dengan proses asesmen yang diadakan oleh <strong>COMPANYNAME</strong>,<br>Anda diundang untuk melaksanakan asesmen online untuk kelengkapan proses asesmen Anda.</p>
                </div>
            </div>
        </div>
    `

  const english = `
        <div style="background-color: #00A9E9; padding: 10px; border-radius: 5px">
            <div style="background-color: #fff !important; color: #373a3c; padding: 10px; border-radius: 5px;">
                <p style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid #cccccc;">Dear <strong>CANDIDATENAME</strong>,</p>
                <div>
                    <p>As a part of the assessment process for <strong>COMPANYNAME</strong>,<br>You are invited to complete an online assessment.</p>
                </div>
            </div>
        </div>
    `

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
              dataSource={`${process.env.API_URL}/email-invitation`}
              header={header}
              triggerFetch={triggerFetch}
            />
            <div className="flex pt-4 justify-between">
              <Button
                htmlFor={emailInvitationCreate}
                onClick={changeModalStateCreate}
                text="Add Email Invitation"
                icon="fa fa-plus"
                color="primary"
                width="180px"
              />

              <div className="flex gap-x-4">
                <Button
                  text="Email Invitation IN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  htmlFor={emailInvitationIndonesia}
                  onClick={() => changeModalStateIndonesia()}
                />
                <Button
                  text="Email Invitation EN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  htmlFor={emailInvitationEnglish}
                  onClick={() => changeModalStateEnglish()}
                />
              </div>
            </div>
          </div>
          <EmailInvitationCreate
            modalLabel={emailInvitationCreate}
            modalState={modalStateCreate}
            setModalState={setModalStateCreate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <EmailInvitationPreview
            id={selectedId}
            modalLabel={emailInvitationPreview}
            modalState={modalStatePreview}
            setModalState={setModalStatePreview}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
          />
          <EmailInvitationEdit
            id={selectedId}
            modalLabel={emailInvitationEdit}
            modalState={modalStateEdit}
            setModalState={setModalStateEdit}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
            setId={setSelectedId}
          />
          <EmailInvitationDelete
            id={selectedId}
            modalLabel={emailInvitationDelete}
            modalState={modalStateDelete}
            setModalState={setModalStateDelete}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
            setId={setSelectedId}
            data={selectedData}
          />
          <Modal
            modalLabel={emailInvitationIndonesia}
            header="Default Email Invitation Indonesia"
            size="md"
            loading={loadingModal}
          >
            <HtmlPreview source={indonesia} />
          </Modal>
          <Modal
            modalLabel={emailInvitationEnglish}
            header="Default Email invitation English"
            size="md"
            loading={loadingModal}
          >
            <HtmlPreview source={english} />
          </Modal>
        </>
      )}
    </>
  )
}
