"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import dayjs from "dayjs"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ButtonDropdown from "@/components/ButtonDropdown"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import AddGroupModal from "./AddGroupModal"
import GroupCreateTemplateModal from "./GroupCreateTemplateModal"
import GroupDelete from "./GroupDelete"
import GroupView from "./GroupView"

export default function GroupPage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [loadingModal, setLoadingModal] = useState(false)
  const [createTemplateModalState, setCreateTemplateModalState] =
    useState(false)
  const [addGroupModalState, setAddGroupModalState] = useState(false)
  const [modalStateView, setModalStateView] = useState(false)
  const [modalStateDelete, setModalStateDelete] = useState(false)
  const [modalStateSummary, setModalStateSummary] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [content, setContent] = useState("")
  const [datas, setDatas] = useState([])
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const [groupId, setGroupId] = useState()

  const changeModalStateSummary = (id) => {
    setContent(id)
    setModalStateSummary(!modalStateSummary)
  }

  const changeModalStateView = (id) => {
    getDataCandidate(id)
    setModalStateView(!modalStateView)
  }
  const changeModalStateDelete = (id) => {
    setSelectedId(id)

    setModalStateDelete(!modalStateDelete)
  }
  const groupSummary = "groupcandidate-summary"
  const groupCandidateView = "groupcandidate-view"
  const groupCandidateDelete = "groupcandidate-delete"

  const getDataCandidate = async (id) => {
    setLoadingModal(true)
    const res = await axiosClient.get(`/candidate/group/` + id)
    const response = res.data.data.data
    setDatas(response)
    setLoadingModal(false)
  }

  async function updateDataCandidate() {
    setLoadingModal(true)
    const res = await axiosClient.get(`/candidate/group/` + selectedId)
    const response = res.data.data.data
    setDatas(response)
    setLoadingModal(false)
  }

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const header = [
    {
      type: "text",
      name: "Group Name",
      label: "group_name",
    },
    {
      type: "action",
      name: "View/Delete",
      generateAction: (data) => (
        <div className="flex justify-center">
          <ButtonDropdown
            text="Complete"
            icon="fa fa-list-alt"
            color="primary"
            size="xs"
            onClick={() => changeModalStateSummary(data.group_name)}
            htmlFor={groupSummary}
            actionList={[
              {
                text: "View Candidate",
                icon: "fa fa-search-plus",
                onClick: () => {
                  setModalStateView(!modalStateView)
                  setContent(data.group_name)
                  setGroupId(data.id)
                },
              },
              {
                text: "Delete Group",
                icon: "fa fa-trash-o",
                onClick: () => {
                  setContent(data.group_name)
                  changeModalStateDelete(data.group_id)
                },
              },
            ]}
          />
        </div>
      ),
    },

    {
      type: "html",
      name: "Upload Date",
      label: "created_at",
      align: "center",
      render: (data) => {
        const date = dayjs(data.created_at, "DD-MMM-YYYY HH:mm").format(
          "DD-MMM-YYYY HH:mm"
        )
        return (
          <div className="text-wrap text-center">
            {data.created_at == null ? "-" : date}
          </div>
        )
      },
    },
    {
      type: "action",
      name: "Individual Report",
      generateAction: () => (
        <div className="flex justify-center">
          <ButtonDropdown
            text="Download"
            icon="fa fa-download"
            color="success"
            size="xs"
            actionList={[
              {
                text: "Standard Report",
                icon: "fa fa-file",
              },
              {
                text: "Custom Report",
                icon: "fa fa-file-text",
              },
            ]}
          />
        </div>
      ),
    },
    {
      type: "action",
      name: "Group Summary",
      generateAction: () => (
        <div className="flex justify-center">
          <ButtonDropdown
            text="Download"
            icon="fa fa-download"
            color="success"
            size="xs"
            actionList={[
              {
                text: "Standard Report",
                icon: "fa fa-file",
              },
              {
                text: "Custom Report",
                icon: "fa fa-file-text",
              },
              {
                text: "Get Written Interview Responses",
                icon: "fa fa-file-excel-o",
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
              dataSource={`${process.env.API_URL}/candidate-group`}
              header={header}
              triggerFetch={triggerFetch}
            />
          </div>
          <GroupView
            groupId={groupId}
            content={content}
            modalLabel={groupCandidateView}
            modalState={modalStateView}
            setModalState={setModalStateView}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            loading={loadingModal}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
            updateDataCandidate={updateDataCandidate}
          />
          <Modal
            modalLabel={groupSummary}
            size="md"
            header={content}
            modalState={modalStateSummary}
            handleCloseModal={() => setModalStateSummary(false)}
            loading={loadingModal}
          />
          <GroupDelete
            id={selectedId}
            modalLabel={groupCandidateDelete}
            modalState={modalStateDelete}
            setModalState={setModalStateDelete}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
          <div className="rounded-md bg-white shadow-lg mt-4">
            <div className="bg-primary rounded-t-xl font-semibold p-4 text-xl text-white">
              Step 1: How To Add Group
            </div>
            <div className="px-8 py-4">
              <ul className="px-4" style={{ listStyle: "initial" }}>
                <li>
                  <div>Click “Create Template” button</div>
                  <ol
                    style={{
                      listStyle: "decimal",
                      padding: "0 20px",
                    }}
                  >
                    <li>
                      Fill in the “No. of Candidates” field with the total
                      number of candidates you wish to assess.
                    </li>
                    <li>Select “Period” of the assessment session.</li>
                    <li>Click “Generate Template” to generate the template.</li>
                    <li>
                      Click “Download Template” to save the template to your
                      computer.
                    </li>
                  </ol>
                </li>
                <li>
                  <div>Click on “Add Group” button</div>
                  <ol
                    style={{
                      listStyle: "decimal",
                      padding: "0 20px",
                    }}
                  >
                    <li>
                      Fill in the “Group Name” with the name of the group you
                      wish to assess.
                    </li>
                    <li>
                      Select “Language” to choose the language of the test
                      battery.
                    </li>
                    <li>Select “Test Battery” to choose the test battery.</li>
                    <li>
                      Select “Welcome Message” to choose the welcome massage
                      template you wish to use.
                    </li>
                    <li>Maximum 100 candidates in group</li>
                    <li>
                      Select the template that you have saved previously by
                      clicking “Choose File”.
                    </li>
                    <li>Click “Upload File” to add your group.</li>
                  </ol>
                </li>
              </ul>
              <div className="mt-4">
                <Button
                  text="Create Template"
                  icon="fa fa-save"
                  size="md"
                  color="success"
                  onClick={() => {
                    setCreateTemplateModalState(true)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="rounded-md bg-white shadow-lg mt-4">
            <div className="bg-primary rounded-t-xl font-semibold p-4 text-xl text-white">
              Step 2: Add Group
            </div>
            <div className="px-8 pb-4">
              <div className="mt-4">
                <Button
                  text="Add Group"
                  icon="fa fa-plus-circle"
                  size="md"
                  color="success"
                  onClick={() => {
                    setAddGroupModalState(true)
                  }}
                />
              </div>
            </div>
          </div>

          <GroupCreateTemplateModal
            modalState={createTemplateModalState}
            setModalState={setCreateTemplateModalState}
          />

          <AddGroupModal
            modalState={addGroupModalState}
            setModalState={setAddGroupModalState}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
        </>
      )}
    </>
  )
}
