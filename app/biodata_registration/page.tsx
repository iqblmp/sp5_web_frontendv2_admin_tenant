"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ButtonDropdown from "@/components/ButtonDropdown"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import BiodataRegistrationCreate from "./BiodataRegistrationCreate"
import BiodataRegistrationEdit from "./BiodataRegistrationEdit"
import BiodataRegistrationPreview from "./BiodataRegistrationPreview"

const formEnglish = [
  {
    id: 1,
    id_template: 1,
    label_default: "First Name",
    label_alias: "First Name",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "cnd_name",
  },
  {
    id: 2,
    id_template: 1,
    label_default: "Last Name",
    label_alias: "Last Name",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "last_name",
  },
  {
    id: 3,
    id_template: 1,
    label_default: "Email",
    label_alias: "Email",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "email",
  },
  {
    id: 4,
    id_template: 1,
    label_default: "Gender",
    label_alias: "Gender",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "gender",
  },
  {
    id: 5,
    id_template: 1,
    label_default: "Date of Birth",
    label_alias: "Date of Birth",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "dob",
  },
  {
    id: 6,
    id_template: 1,
    label_default: "Country (current)",
    label_alias: "Country (current)",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "country",
  },
  {
    id: 7,
    id_template: 1,
    label_default: "Mobile Number",
    label_alias: "Mobile Number",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "mobile_phone1",
  },
  {
    id: 8,
    id_template: 1,
    label_default: "Last Education",
    label_alias: "Last Education",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "last_education",
  },
  {
    id: 9,
    id_template: 1,
    label_default: "University / School Name",
    label_alias: "University / School Name",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "degree",
  },
  {
    id: 10,
    id_template: 1,
    label_default: "Status",
    label_alias: "Status",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "status",
  },
]

const formIndonesia = [
  {
    id: 1,
    id_template: 1,
    label_default: "First Name",
    label_alias: "Nama Depan",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "cnd_name",
  },
  {
    id: 2,
    id_template: 1,
    label_default: "Last Name",
    label_alias: "Nama Belakang",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "last_name",
  },
  {
    id: 3,
    id_template: 1,
    label_default: "Email",
    label_alias: "Email",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "email",
  },
  {
    id: 4,
    id_template: 1,
    label_default: "Gender",
    label_alias: "Jenis Kelamin",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "gender",
  },
  {
    id: 5,
    id_template: 1,
    label_default: "Date of Birth",
    label_alias: "Tanggal Lahir",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "dob",
  },
  {
    id: 6,
    id_template: 1,
    label_default: "Country (current)",
    label_alias: "Negara (tempat tinggal)",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "country",
  },
  {
    id: 7,
    id_template: 1,
    label_default: "Mobile Number",
    label_alias: "Nomor Handphone",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "mobile_phone1",
  },
  {
    id: 8,
    id_template: 1,
    label_default: "Last Education",
    label_alias: "Pendidikan Terakhir",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "last_education",
  },
  {
    id: 9,
    id_template: 1,
    label_default: "University / School Name",
    label_alias: "Nama Universitas / Sekolah",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "degree",
  },
  {
    id: 10,
    id_template: 1,
    label_default: "Status",
    label_alias: "Status",
    is_required: "mandatory",
    field_type: "textbox",
    category: "General Information",
    field_name: "status",
  },
]

export default function EmailInvitationPage() {
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [modalStateCreate, setModalStateCreate] = useState("")
  const [modalStatePreview, setModalStatePreview] = useState("")
  const [modalStateEdit, setModalStateEdit] = useState("")
  const [modalStateEnglish, setModalStateEnglish] = useState("")
  const [modalStateIndonesia, setModalStateIndonesia] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [headerLabel, setHeaderLabel] = useState("Form Custom Registration")
  const [detail, setDetail] = useState([])
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const biodataRegistrationIndonesia = "biodataregistration-indonesia"
  const biodataRegistrationEnglish = "biodataregistration-english"
  const biodataRegistrationCreate = "biodataregistration-create"
  const biodataRegistrationPreview = "biodataregistration-preview"
  const biodataRegistrationEdit = "biodataregistration-edit"

  const changeModalStatePreview = (id) => {
    getDetail(id)
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

  const getDetail = async (id) => {
    setLoadingModal(true)
    const res = await axiosClient("/biodata-registration/" + id)
    setDetail(res.data.data.template)
    setHeaderLabel(res.data.data.template_name)

    setLoadingModal(false)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])
  const header = [
    {
      type: "text",
      name: "Template Name",
      label: "template_name",
      width: "full",
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
            htmlFor={"br"}
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
                onClick: () => changeModalStateEdit(data.id),
              },
            ]}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      {" "}
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
              dataSource={`${process.env.API_URL}/biodata-registration`}
              header={header}
              triggerFetch={triggerFetch}
            />
            <div className="flex flex-col md:flex-row pt-4 justify-between gap-2">
              <Button
                htmlFor={biodataRegistrationCreate}
                onClick={changeModalStateCreate}
                text="Add Custom Registration"
                icon="fa fa-plus"
                color="primary"
                width="180px"
              />

              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  text="Registration IN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  onClick={(data) => changeModalStateIndonesia(data.id)}
                />
                <Button
                  text="Registation EN"
                  icon="fa fa-search-plus"
                  color="primary"
                  width="180px"
                  onClick={(data) => changeModalStateEnglish(data.id)}
                />
              </div>
            </div>
          </div>
          <BiodataRegistrationCreate
            modalLabel={biodataRegistrationCreate}
            modalState={modalStateCreate}
            setModalState={setModalStateCreate}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <BiodataRegistrationPreview
            data={detail}
            headerLabel={headerLabel}
            modalLabel={biodataRegistrationPreview}
            modalState={modalStatePreview}
            setModalState={setModalStatePreview}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            loadingModal={loadingModal}
          />
          <BiodataRegistrationEdit
            id={selectedId}
            modalLabel={biodataRegistrationEdit}
            modalState={modalStateEdit}
            setModalState={setModalStateEdit}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <BiodataRegistrationPreview
            data={formIndonesia}
            headerLabel={"Default Registration Indonesia"}
            modalLabel={biodataRegistrationIndonesia}
            modalState={modalStateIndonesia}
            setModalState={setModalStateIndonesia}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            loadingModal={loadingModal}
            language="indonesia"
          />
          <BiodataRegistrationPreview
            data={formEnglish}
            headerLabel={"Default Registration English"}
            modalLabel={biodataRegistrationEnglish}
            modalState={modalStateEnglish}
            setModalState={setModalStateEnglish}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            setId={setSelectedId}
            loadingModal={loadingModal}
          />
        </>
      )}
    </>
  )
}
