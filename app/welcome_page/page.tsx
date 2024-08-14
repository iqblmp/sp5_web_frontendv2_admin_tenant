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

import WelcomePageCreate from "./WelcomePageCreate"
import WelcomePageEdit from "./WelcomePageEdit"
import WelcomePagePreview from "./WelcomePagePreview"

export default function WelcomePagePage() {
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [modalStateCreate, setModalStateCreate] = useState("")
  const [modalStatePreview, setModalStatePreview] = useState("")
  const [modalStateEdit, setModalStateEdit] = useState("")
  const [modalStateEnglish, setModalStateEnglish] = useState("")
  const [modalStateIndonesia, setModalStateIndonesia] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [content, setContent] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [triggerFetch, setTriggerFetch] = useState("")
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const welcomePageIndonesia = "welcomepage-indonesia"
  const welcomePageEnglish = "welcomepage-english"
  const welcomePageCreate = "welcomepage-create"
  const welcomePagePreview = "welcomepage-preview"
  const welcomePageEdit = "welcomepage-edit"
  const changeModalStatePreview = (id) => {
    setSelectedId(id)
    setModalStatePreview(!modalStatePreview)
  }
  const changeModalStateEdit = (id) => {
    setSelectedId(id)
    setModalStateEdit(!modalStateEdit)
  }
  const changeModalStateCreate = () => {
    setModalStateCreate(!modalStateCreate)
  }
  const changeModalStateIndonesia = (id) => {
    setSelectedId(id)
    setModalStateIndonesia(!modalStateIndonesia)
  }
  const changeModalStateEnglish = (id) => {
    setSelectedId(id)
    setModalStateEnglish(!modalStateEnglish)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const header = [
    {
      type: "text",
      name: "Welcome Name",
      label: "wpage_name",
    },
    {
      type: "text",
      name: "Welcome Title",
      label: "wpage_title",
    },
    {
      type: "html",
      name: "Content",
      label: "wpage_content",
      render: (data) => {
        return <div dangerouslySetInnerHTML={{ __html: data.wpage_content }} />
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
            htmlFor={"wp"}
            actionList={[
              {
                text: "Preview",
                icon: "fa fa-search-plus",
                onClick: () => {
                  changeModalStatePreview(data.id)
                },
              },
              {
                text: "Edit",
                icon: "fa fa-pencil-square-o",
                onClick: () => {
                  changeModalStateEdit(data.id)
                },
              },
            ]}
          />
          {/* <ButtonDropdown
            // text="Summary"
            // icon="fa fa-check-circle"
            // color="primary"
            // size="sm"
            htmlFor={"test"}
            actionList={[
              {
                text: "Preview",
                icon: "fa fa-search-plus",
                onClick: () => {
                  changeModalStatePreview(data.id)
                },
              },
              {
                text: "Edit",
                icon: "fa fa-pencil-square-o",
                onClick: () => {
                  changeModalStateEdit(data.id)
                },
              },
            ]}
          /> */}
        </div>
      ),
    },
  ]

  const indonesia = `
        <div class="card-body" style="background-color: #fff !important; color: #1E429F">
            <h2 style="text-align: center; font-weight: 700; font-size: large; margin-bottom: 3rem">Selamat datang di Asesmen Online SMART PLATFORM</h2>
            <div style="text-align: justify; font-weight: 500">
                <p class="mb-2">Kepada Yth. Peserta tes,</p>
                <p class="mb-2">Terima kasih atas partisipasi Anda dalam proses asesmen online ini. Sebelum kita memulai proses tes, mohon memastikan bahwa Anda sudah meluangkan cukup waktu untuk menyelesaikan seluruh rangkaian tes tanpa gangguan.</p>
                <p class="mb-4">Kami akan menjamin bahwa seluruh data dan hasil dari proses asesmen ini 100% bersifat rahasia.</p>
                <p class="mb-3">Semoga Sukses</p>
            </div>
            <div style="text-align: left">
                <img src="https://dev-clientapp.smartplatform3.asia/images/asi-logo-80.png">
            </div>
        </div>
    `

  const english = `
    <div class="card-body" style="background-color: #fff !important; color: #1E429F">
            <h2 style="text-align: center; font-weight: 700; font-size: large; margin-bottom: 3rem">Welcome to SMART Platform Online Assessment</h2>
            <div style="text-align: justify; font-weight: 500">
                <p class="mb-2">Dear Participant,</p>
                <p class="mb-2">Thank you for your participation in this online assessment process. Before we commence the test, please ensure that you had allocated enough time to complete all the tests without interruption.</p>
                <p class="mb-4">We will ensure that all the data and the results of this assessment process will be considered 100% confidential.</p>
                <p class="mb-3">Good luck</p>
            </div>
            <div style="text-align: left">
                <img src="https://dev-clientapp.smartplatform3.asia/images/asi-logo-80.png">
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
              dataSource={`${process.env.API_URL}/welcome-page`}
              header={header}
              triggerFetch={triggerFetch}
            />
            <div className="flex pt-4 justify-between">
              <Button
                htmlFor={welcomePageCreate}
                onClick={changeModalStateCreate}
                text="Add Welcome Page"
                icon="fa fa-plus"
                color="primary"
                width="180px"
              />

              <div className="flex gap-x-4">
                <Button
                  text="Welcome Page IN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  htmlFor={welcomePageIndonesia}
                  onClick={(data) =>
                    changeModalStateIndonesia(data.wpage_content)
                  }
                />
                <Button
                  text="Welcome Page EN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  htmlFor={welcomePageEnglish}
                  onClick={(data) =>
                    changeModalStateEnglish(data.wpage_content)
                  }
                />
              </div>
            </div>
          </div>
          <WelcomePageCreate
            modalLabel={welcomePageCreate}
            modalState={modalStateCreate}
            setModalState={setModalStateCreate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <WelcomePagePreview
            id={selectedId}
            modalLabel={welcomePagePreview}
            modalState={modalStatePreview}
            setModalState={setModalStatePreview}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setSelectedId={() => setSelectedId(null)}
          />
          <WelcomePageEdit
            id={selectedId}
            modalLabel={welcomePageEdit}
            modalState={modalStateEdit}
            setModalState={setModalStateEdit}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
            setSelectedId={() => setSelectedId(null)}
          />
          <Modal
            modalLabel={welcomePageIndonesia}
            header="Default Welcome Page Indonesia"
            size="md"
            loading={loadingModal}
          >
            <HtmlPreview source={indonesia} />
          </Modal>
          <Modal
            modalLabel={welcomePageEnglish}
            header="Default Welcome Page English"
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
