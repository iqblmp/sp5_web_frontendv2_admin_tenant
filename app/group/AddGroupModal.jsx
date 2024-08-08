"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Button from "@/components/Button"
import CustomSelect from "@/components/CustomSelect"
import DatePicker from "@/components/DatePicker"
import Modal from "@/components/Modal"

export default function AddGroupModal({
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  triggerFetch,
}) {
  const [groupName, setGroupName] = useState("")
  const [language, setLanguage] = useState("")
  const [randomCapture, setRandomCapture] = useState("")
  const [proctoring, setProctoring] = useState("")
  const [assessmentCenter, setAssessmentCenter] = useState("")
  const [smartInterview, setSmartInterview] = useState("")

  const [interviewTitle, setInterviewTitle] = useState("")
  const [interviewTitleList, setInterviewTitleList] = useState([])

  const [battery, setBattery] = useState({})
  const [batteryList, setBatteryList] = useState([])
  const [batteryLoading, setBatteryLoading] = useState(false)

  const [group, setGroup] = useState("")
  const [groupList, setGroupList] = useState([])

  const [welcomeMessage, setWelcomeMessage] = useState({
    label: "Default Welcome Message",
    value: 0,
  })
  const [welcomeMessageList, setWelcomeMessageList] = useState([])

  const [biodataFrom, setBiodataForm] = useState({
    label: "Default Biodata Form",
    value: 1,
  })
  const [biodataFromList, setBiodataFormList] = useState([])

  const [fileExcel, setFileExcel] = useState(null)

  const [exerciseList, setExerciseList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const [loadingModal, setLoadingModal] = useState(false)

  useEffect(() => {
    if (welcomeMessageList.length === 0) {
      axiosClient.get(`/welcome-page`).then((res) => {
        const data = res.data.data
        if (Array.isArray(data.data)) {
          setWelcomeMessageList(
            [
              {
                label: "Default Welcome Message",
                value: 0,
              },
            ].concat(
              data.data.map((item) => ({
                label: item.wpage_name,
                value: item.id,
              }))
            )
          )
        }
      })
    }
    if (biodataFromList.length === 0) {
      axiosClient.get(`/biodata-registration`).then((res) => {
        const data = res.data.data
        if (Array.isArray(data.data)) {
          setBiodataFormList(
            [
              {
                label: "Default Biodata Form",
                value: 1,
              },
            ].concat(
              data.data.map((item) => ({
                label: item.template_name,
                value: item.id,
              }))
            )
          )
        }
      })
    }
    if (groupList.length === 0) {
      axiosClient.get(`/candidate-group`).then((res) => {
        const data = res.data.data
        if (Array.isArray(data.data)) {
          const groupOption = data.data.map((item) => ({
            label: item.group_name,
            value: item.id,
          }))
          groupOption.unshift({
            label: "New group",
            value: "",
          })
          setGroupList(groupOption)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (language !== "") {
      setBatteryLoading(true)
      setBattery({})
      axiosClient
        .get(`/battery`, { params: { lang: language } })
        .then((res) => {
          const data = res.data.data
          if (Array.isArray(data.data)) {
            setBatteryList(
              data.data.map((item) => ({
                label: item.battery_label,
                value: item.id,
              }))
            )
          }
          setBatteryLoading(false)
        })
        .catch(() => {
          setBatteryLoading(false)
        })
    }
  }, [language])

  const helperCheckErrorList = (errorName) => {
    return errorList.find((item) => item === errorName)
  }

  const helperResetData = () => {
    setGroupName("")
    setLanguage("")
    setRandomCapture("")
    setProctoring("")
    setAssessmentCenter("")
    setSmartInterview("")
    setBattery({})
    setBatteryList([])
    setWelcomeMessage({
      label: "Default Welcome Message",
      value: 0,
    })
    setBiodataForm({
      label: "Default Biodata Form",
      value: 1,
    })
    setExerciseList([])
    setErrorList([])
    setIsSubmit(false)
  }

  const saveData = () => {
    const body = new FormData()
    body.append("file", fileExcel)
    body.append("group_name", groupName)
    body.append("group_id", group["value"] ? group["value"] : 0)
    body.append("id_battery", battery.value)
    body.append("language", language)
    body.append("id_biodata_template", parseInt(biodataFrom["value"]))
    body.append("id_welcome_page", parseInt(welcomeMessage["value"]))
    body.append("self_capture", randomCapture === "" ? "0" : randomCapture)
    body.append(
      "assessment_center",
      assessmentCenter === "" ? "0" : assessmentCenter
    )
    body.append("olinterview", smartInterview === "" ? "0" : smartInterview)
    body.append("proctoring", proctoring === "" ? "0" : proctoring)
    body.append("ac_test", JSON.stringify([]))
    body.append("ac_start", JSON.stringify([]))
    body.append("ac_expire", JSON.stringify([]))
    body.append("interview_key", 0)

    setLoadingModal(true)
    axiosClient
      .post(`/candidate-group`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (!res.data.success) {
          handleValidationExcel(res.data.data)
        }

        setModalState(false)
        setLoadingModal(false)
        helperResetData()
        setDataAlert({
          type: "success",
          message: "Successfully Create Candidate",
        })
        setShowAlert(true)
        triggerFetch()
        setLoadingModal(false)
      })
      .catch((err) => {
        setModalState(false)
        setLoadingModal(false)
        setDataAlert({
          type: "error",
          message: `Error adding data: ${err}`,
        })
        setShowAlert(true)
        setLoadingModal(false)
      })
  }

  const handleValidationExcel = (data) => {
    const formdata = new FormData()
    formdata.append("data_excel_error", JSON.stringify(data.data_excel_error))
    formdata.append("login_open", data.login_open)
    formdata.append("login_close", data.login_close)

    axiosClient
      .post(`candidate-group/excel/generate/error`, formdata, {
        responseType: "blob",
      })
      .then((res) => {
        const fileName = "template-new-candidate-error.xlsx"
        const blob = new Blob([res.data], { type: res.data.type })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = fileName
        link.click()

        setTimeout(() => window.URL.revokeObjectURL(url), 0)
      })
      .catch((err) => {
        // todo: handle error
      })
  }

  const handleSubmit = () => {
    setIsSubmit(true)
    const tempErrorList = []
    if (groupName === "" && group["value"] == undefined)
      tempErrorList.push("group_name")
    if (language === "") tempErrorList.push("language")
    if (!battery || !battery.value) tempErrorList.push("battery")

    setErrorList(tempErrorList)
    if (tempErrorList.length !== 0) {
      return
    }

    saveData()
  }

  const handleSmartInterviewChange = (e) => {
    setSmartInterview(e.target.value)
    if (e.target.value === "only") {
      setRandomCapture("0")
      setProctoring("0")
      setAssessmentCenter("0")
    }
  }

  const handleAddAssessmentCenterList = () => {
    const arr = [...exerciseList]
    arr.push("")
    setExerciseList(arr)
  }

  const handleDeleteAssessmentCenterList = (index) => {
    const arr = [...exerciseList]
    arr.splice(index, 1)
    setExerciseList(arr)
  }

  const handleCloseModal = () => {
    setModalState(false)
    setErrorList([])
    helperResetData()
  }

  return (
    <>
      <Modal
        size="lg"
        header="Add Group Candidate"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        modalState={modalState}
        loading={loadingModal}
        buttonSubmitText="Submit"
      >
        <div className="flex flex-col gap-4">
          <div className="form-field">
            <label className="form-label">Group:</label>
            <CustomSelect
              value={group}
              options={groupList}
              onChange={(val) => {
                setGroup(val)
              }}
            />
          </div>
          <div className={`form-field ${group["value"] ? "hidden" : ""}`}>
            <label className="form-label">Group Name:</label>
            <input
              className={`input input-sm max-w-full ${
                isSubmit && helperCheckErrorList("group_name")
                  ? "input-error"
                  : "input-ghost-primary"
              }`}
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            {isSubmit && helperCheckErrorList("group_name") && (
              <label className="form-label">
                <span className="form-label-alt text-error">
                  The group name field is required.
                </span>
              </label>
            )}
          </div>
          <div className="grid grid-cols-6 gap-x-4 gap-y-4">
            <div className="form-field">
              <label className="form-label">Language:</label>
              <select
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("language")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">-choose-</option>
                <option value="Indonesia">Indonesia</option>
                <option value="English">English</option>
              </select>
              {isSubmit && helperCheckErrorList("language") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The language field is required.
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Random Capture:</label>
              <select
                className="input-ghost-primary input input-sm max-w-full"
                value={randomCapture}
                onChange={(e) => setRandomCapture(e.target.value)}
                disabled={smartInterview === "3"}
              >
                <option value="">-choose-</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            {randomCapture === "0" && (
              <div className="form-field">
                <label className="form-label">Proctoring:</label>
                <select
                  className="input-ghost-primary input input-sm max-w-full"
                  value={proctoring}
                  onChange={(e) => setProctoring(e.target.value)}
                  disabled={smartInterview === "3"}
                >
                  <option value="">-choose-</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            )}
            <div className="form-field">
              <label className="form-label">Assesment Center:</label>
              <select
                className="input-ghost-primary input input-sm max-w-full"
                value={assessmentCenter}
                onChange={(e) => setAssessmentCenter(e.target.value)}
                disabled={smartInterview === "3"}
              >
                <option value="">-choose-</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">SMART Interview:</label>
              <select
                className="input-ghost-primary input input-sm max-w-full"
                value={smartInterview}
                onChange={handleSmartInterviewChange}
              >
                <option value="">-choose-</option>
                <option value="0">No</option>
                <option value="1">With SMART Interview as First Test</option>
                <option value="2">With SMART Interview as Last Test</option>
                <option value="3">SMART Interview only</option>
              </select>
            </div>
          </div>
          {assessmentCenter === "yes" && (
            <div className="accordion-group">
              <div className="accordion ">
                <input
                  type="checkbox"
                  id={`create-update-candidate-assesment-center`}
                  className="accordion-toggle"
                />
                <div className="mb-2">
                  <Button
                    text="Assessment Center Exercise List"
                    icon="fa fa-chevron-circle-right"
                    htmlFor={`create-update-candidate-assesment-center`}
                    size="md"
                    color="secondary"
                  />
                </div>
                <div
                  className="accordion-content text-content2 bg-[#e8e1f5] rounded-md"
                  style={{ padding: "0" }}
                >
                  <div className="min-h-0">
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-[60%] text-center">
                              Exercide Name
                            </th>
                            <th className="text-center">Period</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {exerciseList.map((_, index) => (
                            <tr key={`${index}`}>
                              <td>
                                <div>
                                  <CustomSelect />
                                </div>
                              </td>
                              <td>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                  <DatePicker
                                    type="custom"
                                    className="input-ghost-primary input input-sm max-w-full bg-white"
                                  />
                                  <DatePicker
                                    type="custom"
                                    className="input-ghost-primary input input-sm max-w-full bg-white"
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-error btn-circle btn-sm"
                                  onClick={() =>
                                    handleDeleteAssessmentCenterList(index)
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={3}>
                              <button
                                className="btn btn-success btn-circle btn-sm"
                                onClick={handleAddAssessmentCenterList}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {smartInterview && smartInterview !== "0" && (
            <div className="form-field">
              <label className="form-label">Interview Title:</label>
              <CustomSelect
                disabled={true}
                value={interviewTitle}
                options={interviewTitleList}
              />
            </div>
          )}
          {smartInterview !== "3" && (
            <div className="form-field">
              <label className="form-label">Battery Name:</label>
              <CustomSelect
                loading={batteryLoading}
                disabled={batteryLoading || language === ""}
                value={battery}
                options={batteryList}
                onChange={(val) => {
                  setBattery(val)
                }}
              />
              {isSubmit && helperCheckErrorList("battery") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The battery field is required.
                  </span>
                </label>
              )}
            </div>
          )}
          <div className="form-field">
            <label className="form-label">Welcome Message:</label>
            <CustomSelect
              value={welcomeMessage}
              options={welcomeMessageList}
              onChange={(val) => setWelcomeMessage(val)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Biodata Form:</label>
            <CustomSelect
              value={biodataFrom}
              options={biodataFromList}
              onChange={(val) => setBiodataForm(val)}
            />
          </div>
          <div className="form-field">
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFileExcel(e.target.files[0])}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
