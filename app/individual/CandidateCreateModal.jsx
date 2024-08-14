"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import moment from "moment"

import Button from "@/components/Button"
import CustomSelect from "@/components/CustomSelect"
import DateTime from "@/components/DateTime"
import Modal from "@/components/Modal"

export default function CandidateCreateModal({
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  triggerFetch,
}) {
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [position, setPosition] = useState("")
  const [gender, setGender] = useState("")
  const [language, setLanguage] = useState("")
  const [randomCapture, setRandomCapture] = useState("")
  const [proctoring, setProctoring] = useState("")
  const [assessmentCenter, setAssessmentCenter] = useState("")
  const [smartInterview, setSmartInterview] = useState("")
  const [organization, setOrganization] = useState("")
  const [startPeriod, setStartPeriod] = useState("")
  const [endPeriod, setEndPeriod] = useState("")

  const [attribute1, setAttribute1] = useState("")
  const [attribute2, setAttribute2] = useState("")
  const [attribute3, setAttribute3] = useState("")
  const [attribute4, setAttribute4] = useState("")
  const [attribute5, setAttribute5] = useState("")
  const [attribute6, setAttribute6] = useState("")
  const [attribute7, setAttribute7] = useState("")
  const [attribute8, setAttribute8] = useState("")

  const [interviewTitle, setInterviewTitle] = useState("")
  const [interviewTitleList, setInterviewTitleList] = useState([])
  const [battery, setBattery] = useState({
    label: "-choose-",
    value: "",
  })
  const [batteryList, setBatteryList] = useState([])
  const [batteryLoading, setBatteryLoading] = useState(false)
  const [group, setGroup] = useState({
    label: "-choose-",
    value: 0,
  })
  const [groupList, setGroupList] = useState([])
  const [welcomeMessage, setWelcomeMessage] = useState({
    label: "Default Welcome Message",
    value: 0,
  })
  const [welcomeMessageList, setWelcomeMessageList] = useState([])
  const [biodataFrom, setBiodataForm] = useState({
    label: "Default Biodata Form",
    value: 0,
  })
  const [biodataFromList, setBiodataFormList] = useState([])
  const [exerciseList, setExerciseList] = useState([])
  const [errorList, setErrorList] = useState([])

  const [isSubmit, setIsSubmit] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [confirmModalState, setConfirmModalState] = useState(false)

  useEffect(() => {
    handleGetDataForSelect()
  }, [])

  useEffect(() => {
    if (language !== "") {
      setBatteryLoading(true)
      setBattery({})
      axiosClient
        .get(`/battery/options/?lang=${language}`)
        .then((res) => {
          const data = res.data.data
          if (Array.isArray(data)) {
            const tempList = data.map((item) => ({
              label: item.battery_label,
              value: item.id,
            }))
            setBatteryList(tempList)
          }
          setBatteryLoading(false)
        })
        .catch(() => {
          setBatteryLoading(false)
        })
    }
  }, [language])

  const helperValidateEmail = (str) => {
    return str.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const helperCheckErrorList = (errorName) => {
    return errorList.find((item) => item === errorName)
  }

  const helperResetData = () => {
    setFirstname("")
    setLastName("")
    setEmail("")
    setPosition("")
    setGender("")
    setLanguage("")
    setRandomCapture("")
    setProctoring("")
    setAssessmentCenter("")
    setSmartInterview("")
    setOrganization("")
    setStartPeriod("")
    setEndPeriod("")

    setAttribute1("")
    setAttribute2("")
    setAttribute3("")
    setAttribute4("")
    setAttribute5("")
    setAttribute6("")
    setAttribute7("")
    setAttribute8("")

    setBattery({
      label: "-choose-",
      value: "",
    })
    setBatteryList([])
    setGroup({
      label: "-choose-",
      value: 0,
    })
    setWelcomeMessage({
      label: "Default Welcome Message",
      value: 0,
    })
    setBiodataForm({
      label: "Default Biodata Form",
      value: 0,
    })

    setErrorList([])
    setIsSubmit(false)
  }

  const saveData = () => {
    const startLogin = moment(startPeriod).format("YYYY-MM-DD HH:mm:ss.SSS")
    const expireLogin = moment(endPeriod).format("YYYY-MM-DD HH:mm:ss.SSS")

    const body = {
      cnd_name: firstName,
      last_name: lastName,
      email: email,
      position: position,
      gender: gender,
      language: language,
      organization: organization,
      start_login: startLogin,
      expire_login: expireLogin,

      self_capture: randomCapture === "" ? "0" : randomCapture,
      proctoring: proctoring === "" ? "0" : proctoring,
      assessment_center: assessmentCenter === "" ? "0" : assessmentCenter,
      olinterview: smartInterview === "" ? "0" : smartInterview,

      attribute1: attribute1,
      attribute2: attribute2,
      attribute3: attribute3,
      attribute4: attribute4,
      attribute5: attribute5,
      attribute6: attribute6,
      attribute7: attribute7,
      attribute8: attribute8,

      id_battery: battery.value,
      id_cnd_group: group["value"],
      id_welcome_page: welcomeMessage["value"],
      id_biodata_template: biodataFrom["value"],

      education_degree: [],
      education_university_name: [],
      education_university_status: [],
      education_major: [],
      job_function_id: [],
      job_level_id: [],
    }

    setLoadingModal(true)
    setConfirmModalState(false)
    axiosClient
      .post(`/candidate`, body)
      .then((res) => {
        setModalState(false)
        setLoadingModal(false)
        helperResetData()
        setDataAlert({
          type: "success",
          message: "Successfully create candidate data.",
        })
        setShowAlert(true)
        triggerFetch()
      })
      .catch((err) => {
        setModalState(false)
        setLoadingModal(false)
        setDataAlert({
          type: "error",
          message: `Error adding data: ${err}`,
        })
        setShowAlert(true)
      })
  }

  const handleSubmit = () => {
    setIsSubmit(true)
    const tempErrorList = []
    if (firstName === "") tempErrorList.push("first_name")
    if (lastName === "") tempErrorList.push("last_name")
    if (email === "" || !helperValidateEmail(email)) tempErrorList.push("email")
    if (position === "") tempErrorList.push("position")
    if (gender === "") tempErrorList.push("gender")
    if (language === "") tempErrorList.push("language")
    if (organization === "") tempErrorList.push("organization")
    if (startPeriod === "") tempErrorList.push("start_period")
    if (endPeriod === "") tempErrorList.push("end_period")
    if (!battery) tempErrorList.push("battery")

    setErrorList(tempErrorList)
    if (tempErrorList.length !== 0) {
      return
    }

    setConfirmModalState(true)
  }

  const handleSmartInterviewChange = (e) => {
    setSmartInterview(e.target.value)
    if (e.target.value === "3") {
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

  const handleGetDataForSelect = () => {
    axiosClient.get(`/biodata-registration/options`).then((res) => {
      const data = res.data
      if (Array.isArray(data.data)) {
        setBiodataFormList(
          [
            {
              label: "Default Biodata Form",
              value: 0,
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

    axiosClient.get(`/welcome-page/options`).then((res) => {
      const data = res.data
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

    axiosClient.get(`/candidate-group/options`).then((res) => {
      const data = res.data
      if (Array.isArray(data.data)) {
        setGroupList(
          [
            {
              label: "-choose-",
              value: 0,
            },
          ].concat(
            data.data.map((item) => ({
              label: item.group_name,
              value: item.id,
            }))
          )
        )
      }
    })
  }

  return (
    <>
      <Modal
        size="xl"
        header="Add Candidate"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        modalState={modalState}
        loading={loadingModal}
        buttonSubmitText="Submit"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div className="form-field">
              <label className="form-label">First Name:</label>
              <input
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("first_name")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {isSubmit && helperCheckErrorList("first_name") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The first name field is required.
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Last Name:</label>
              <input
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("last_name")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {isSubmit && helperCheckErrorList("last_name") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The last name field is required.
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Candidate's Email:</label>
              <input
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("email")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isSubmit && helperCheckErrorList("email") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    {email == ""
                      ? "The email field is required."
                      : "The email must be a valid email address"}
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Position:</label>
              <input
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("position")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              {isSubmit && helperCheckErrorList("position") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The position field is required.
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-x-4 gap-y-4">
            <div className="form-field">
              <label className="form-label">Gender:</label>
              <select
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("gender")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">-choose-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {isSubmit && helperCheckErrorList("gender") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The gender field is required.
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Language:</label>
              <select
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("language")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  setBattery({
                    label: "-choose-",
                    value: "",
                  })
                }}
              >
                <option value="">-choose-</option>
                <option value="indonesia">Indonesia</option>
                <option value="english">English</option>
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
                  <option value={undefined}>-choose-</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div className="form-field">
              <label className="form-label">Organization:</label>
              <input
                className={`input-ghost-primary input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("organization")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
              {isSubmit && helperCheckErrorList("organization") && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    The organization field is required.
                  </span>
                </label>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Period:</label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <DateTime
                    value={startPeriod}
                    onChange={(val) => {
                      setStartPeriod(val)
                      if (moment(val).isSameOrAfter(moment(endPeriod))) {
                        setEndPeriod(val)
                      }
                    }}
                    placeholder="Login - Start"
                    className={"input-sm"}
                    min={moment()}
                    max={endPeriod}
                  />
                  {isSubmit && helperCheckErrorList("start_period") && (
                    <label className="form-label">
                      <span className="form-label-alt text-error">
                        The start login field is required.
                      </span>
                    </label>
                  )}
                </div>
                <div>
                  <DateTime
                    value={endPeriod}
                    onChange={(val) => setEndPeriod(val)}
                    placeholder="Login - Finish"
                    className={"input-sm"}
                    min={startPeriod || moment()}
                  />
                  {isSubmit && helperCheckErrorList("end_period") && (
                    <label className="form-label">
                      <span className="form-label-alt text-error">
                        The end login field is required.
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-group">
            <div className="accordion ">
              <input
                type="checkbox"
                id={`create-update-candidate-additional-data`}
                className="accordion-toggle"
              />
              <div className="mb-2">
                <Button
                  text="Additional Attributes"
                  icon="fa fa-chevron-circle-right"
                  htmlFor={`create-update-candidate-additional-data`}
                  size="md"
                  color="success"
                />
              </div>
              <div
                className="accordion-content text-content2 bg-[#dff0d8] rounded-md"
                style={{ padding: "0" }}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 p-4">
                    <div>
                      <label className="label">Attribute 1:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute1}
                        onChange={(e) => setAttribute1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 2:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute2}
                        onChange={(e) => setAttribute2(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label ">Attribute 3:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute3}
                        onChange={(e) => setAttribute3(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 4:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute4}
                        onChange={(e) => setAttribute4(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">Atribute 5:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute5}
                        onChange={(e) => setAttribute5(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 6:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute6}
                        onChange={(e) => setAttribute6(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label ">Attribute 7:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute7}
                        onChange={(e) => setAttribute7(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 8:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        value={attribute8}
                        onChange={(e) => setAttribute8(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {assessmentCenter === "1" && (
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
                              Exercise Name
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
                                  <DateTime className={"input-sm"} />
                                  <DateTime className={"input-sm"} />
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
                                onClick={
                                  // TODO: handle add exercise
                                  // handleAddAssessmentCenterList
                                  () => {}
                                }
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
                // TODO: handle interview title
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
                disabled={batteryLoading || language == ""}
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
            <label className="form-label">Group:</label>
            <CustomSelect
              value={group}
              options={groupList}
              onChange={(val) => setGroup(val)}
            />
          </div>
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
        </div>
      </Modal>
      <Modal
        modalState={confirmModalState}
        handleCloseModal={() => setConfirmModalState(false)}
        handleSubmit={() => saveData()}
        size="sm"
      >
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-center">
            Your <span className="text-[#007bff]">SMART CREDIT</span> is{" "}
            <span className="font-bold">678</span>. Total of{" "}
            <span className="font-bold">1 SMART credit</span> will be allocated
            to sent the invitation for{" "}
            <span className="font-bold">1 candidate</span>.
          </div>
          {proctoring === "1" && (
            <div className="text-center">
              Your <span className="text-[#6610f2]">PROCTORING CREDIT</span> is{" "}
              <span className="font-bold">991</span>. Total of{" "}
              <span className="font-bold">1 Proctoring credit</span> will be
              allocated to sent the invitation for{" "}
              <span className="font-bold">1 candidate</span>.
            </div>
          )}
          {smartInterview && smartInterview !== "0" && (
            <div className="text-center">
              Your{" "}
              <span className="text-[#F39C12]">SMART INTERVIEW CREDIT</span> is{" "}
              <span className="font-bold">57</span>. Total of{" "}
              <span className="font-bold">1 SMART Interview</span> credit will
              be allocated to sent the invitation for{" "}
              <span className="font-bold">1 candidate</span>.
            </div>
          )}
          <div className="text-center font-bold">Do you want to continue?</div>
        </div>
      </Modal>
    </>
  )
}
