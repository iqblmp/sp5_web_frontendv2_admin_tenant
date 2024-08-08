"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import moment from "moment"

import Button from "@/components/Button"
import CheckBox from "@/components/CheckBox"
import CustomSelect from "@/components/CustomSelect"
import DateTime from "@/components/DateTime"
import Modal from "@/components/Modal"

export default function CandidateUpdateModal({
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  triggerFetch,
  selectedId,
  setSelectedId,
}) {
  const [candidate, setCandidate] = useState({})

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

  const [loginCount, setLoginCount] = useState(0)
  const [blockedStatus, setBlockedStatus] = useState(false)
  const [activeStatus, setActiveStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [statusProgress, setStatusProgress] = useState(false)

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
  const [battery, setBattery] = useState({})
  const [batteryList, setBatteryList] = useState([])
  const [batteryLoading, setBatteryLoading] = useState(false)
  const [group, setGroup] = useState({})
  const [groupList, setGroupList] = useState([])
  const [groupLoading, setGroupLoading] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState({})
  const [welcomeMessageList, setWelcomeMessageList] = useState([])
  const [welcomeMessageLoading, setWelcomeMessageLoading] = useState(false)
  const [biodataForm, setBiodataForm] = useState({})
  const [biodataFormList, setBiodataFormList] = useState([])
  const [biodataFormLoading, setBiodataLoading] = useState(false)
  const [exerciseList, setExerciseList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [test, setTest] = useState([])
  const [testList, setTestList] = useState([])
  const [testLoading, setTestLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [confirmModalState, setConfirmModalState] = useState(false)
  const [tab, setTab] = useState("update")

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
            const selectedBattery = tempList.find(
              (item) => item.value == candidate.battery_id
            )
            setBattery(selectedBattery)
          }
          setBatteryLoading(false)
        })
        .catch(() => {
          setBatteryLoading(false)
        })

      // console.log("welcomeMessageList: ", welcomeMessageList);
      // console.log("candidate welcome: ", welcomeMessage);
      // console.log("biodataFormList: ", biodataFormList);
      // console.log("candidate biodata: ", biodataForm);
    }
  }, [language])

  useEffect(() => {
    setTab("update")
    setLoadingModal(true)
    setBatteryLoading(true)
    setGroupLoading(true)
    setWelcomeMessageLoading(true)
    setBiodataLoading(true)
  }, [modalState])

  useEffect(() => {
    const initData = async () => {
      try {
        const responseCandidate = await axiosClient.get(
          `/candidate/${selectedId}`
        )
        const candidate = responseCandidate.data.data

        const responseGroup = await axiosClient
          .get(`/candidate-group/options`)
          .then((res) => res.data.data)
        let arrGroup = []
        if (Array.isArray(responseGroup)) {
          arrGroup = [
            {
              label: "choose",
              value: 0,
            },
            ...responseGroup.map((item) => ({
              label: item.group_name,
              value: item.id + "",
            })),
          ]
          setGroupList(arrGroup)
        }

        const responseWelcome = await axiosClient
          .get(`/welcome-page/options`)
          .then((res) => res.data.data)
        let arrWelcome = []
        if (Array.isArray(responseWelcome)) {
          arrWelcome = [
            {
              label: "Default Welcome Message",
              value: 0,
            },
            ...responseWelcome.map((item) => ({
              label: item.wpage_name,
              value: item.id + "",
            })),
          ]
          setWelcomeMessageList(arrWelcome)
        }

        const responseBiodata = await axiosClient
          .get(`/biodata-registration/options`)
          .then((res) => res.data.data)
        let arrBiodata = []
        if (Array.isArray(responseBiodata)) {
          arrBiodata = [
            {
              label: "Default Biodata Form",
              value: 0,
            },
            ...responseBiodata.map((item) => ({
              label: item.template_name,
              value: item.id + "",
            })),
          ]
          setBiodataFormList(arrBiodata)
        }

        setCandidate(candidate)
        setFirstname(candidate.cnd_name)
        setLastName(candidate.last_name)
        setEmail(candidate.email)
        setPosition(candidate.position)
        setGender(candidate.gender.toLowerCase())
        setLanguage(candidate.language.toLowerCase())
        setRandomCapture(candidate.self_capture)
        setProctoring(candidate.proctoring)
        setAssessmentCenter(candidate.assessment_center)
        setSmartInterview(candidate.olinterview)
        setOrganization(candidate.organization)
        setStartPeriod(candidate.start_login)
        setEndPeriod(candidate.expire_login)

        setLoginCount(candidate.login_count)
        setBlockedStatus(isTrue(candidate.blocked_status))
        setActiveStatus(isTrue(candidate.active_status))
        setLoginStatus(isTrue(candidate.login_status))
        setStatusProgress(candidate.status_progress)

        if (candidate.id_cnd_group === 0) {
          setGroup({
            label: "choose",
            value: 0,
          })
        } else {
          const selectedGroup = arrGroup.find(
            (item) => item.value == candidate.id_cnd_group
          )
          setGroup(selectedGroup || {})
        }
        setGroupLoading(false)

        if (candidate.id_welcome_page === 0) {
          setWelcomeMessage({
            label: "Default Welcome Message",
            value: 0,
          })
        } else {
          const selectedWelcomePage = arrWelcome.find(
            (item) => item.value == candidate.id_welcome_page
          )
          setWelcomeMessage(selectedWelcomePage || {})
        }
        setWelcomeMessageLoading(false)

        if (candidate.id_biodata_template === 0) {
          setBiodataForm({
            label: "Default Biodata Form",
            value: 0,
          })
        } else {
          const selectedBiodata = arrBiodata.find(
            (item) => item.value == candidate.id_biodata_template
          )
          setBiodataForm(selectedBiodata || {})
        }
        setBiodataLoading(false)
      } catch (error) {
        console.error("initData: ", error)
      } finally {
        setLoadingModal(false)
      }
    }

    if (selectedId) {
      initData()
    }
  }, [modalState])

  useEffect(() => {
    if (tab == "add-test" && language != "") {
      setTest([
        {
          value: undefined,
          label: "choose",
        },
      ])
      setTestLoading(true)
      axiosClient
        .get(`/test/options`, { params: { lang: language } })
        .then((res) => {
          return res.data.data
        })
        .then((data) => {
          // console.log("data", data);
          if (Array.isArray(test)) {
            setTestList([
              {
                label: "choose",
                value: undefined,
              },
              ...data.map((item) => ({
                label: item.test_name,
                value: item.id,
              })),
            ])
          }
        })
        .finally(() => {
          setTestLoading(false)
        })
    }
  }, [tab])

  const isTrue = (value) => {
    if (value == "0" || value == 0 || value == false) {
      return false
    }
    return true
  }

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
    setBattery({})
    setBatteryList([])
    setWelcomeMessage("")
    setBiodataForm("")
    setExerciseList([])
    setErrorList([])
    setIsSubmit(false)
  }

  const saveData = () => {
    const body = {
      cnd_name: firstName,
      last_name: lastName,
      email: email,
      position: position,
      gender: gender,
      language: language,
      organization: organization,
      start_login: moment(startPeriod).format("YYYY-MM-DD HH:mm:ss.SSS"),
      expire_login: moment(endPeriod).format("YYYY-MM-DD HH:mm:ss.SSS"),

      self_capture: randomCapture === "" ? "0" : randomCapture,
      proctoring: proctoring === "" ? "0" : proctoring,
      assessment_center: assessmentCenter === "" ? "0" : assessmentCenter,
      olinterview: smartInterview === "" ? "0" : smartInterview,

      id_battery: battery.value,
      id_cnd_group: group["value"],
      id_welcome_page: welcomeMessage["value"],
      id_biodata_template: biodataForm["value"],

      login_count: loginCount,
      blocked_status: blockedStatus ? 1 : 0,
      login_status: loginStatus ? 1 : 0,
      active_status: activeStatus ? 1 : 0,

      education_degree: [],
      education_university_name: [],
      education_university_status: [],
      education_major: [],
      job_function_id: [],
      job_level_id: [],
    }

    setLoadingModal(true)
    axiosClient
      .put(`/candidate/${selectedId}`, body)
      .then(() => {
        setModalState(false)
        setLoadingModal(false)
        helperResetData()
        setDataAlert({
          type: "success",
          message: "Successfully updated candidate data.",
        })
        setShowAlert(true)
        setSelectedId(null)
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
        setSelectedId(null)
        triggerFetch()
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
    if (!battery || !battery.value) tempErrorList.push("battery")

    setErrorList(tempErrorList)
    if (tempErrorList.length !== 0) {
      return
    }

    saveData()
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
    setSelectedId(null)
    setErrorList([])
    helperResetData()
  }

  const handleOptionChange = (e, index) => {
    if (!e.value) {
      console.error("Please type the name of the test battery.")
      return
    }

    const exists = test.find((item) => item.value == e.value)
    if (exists) {
      console.error("You have added this test on the battery.")
      return
    }

    const newOption = test.map((item, key) => {
      if (index == key) {
        return e
      }

      return item
    })

    setTest(newOption)
  }

  const handleAddOption = () => {
    if (testList.length - test.length > 0) {
      const newArray = [...test]
      if (newArray[newArray.length - 1].value !== undefined) {
        newArray.push({ value: undefined, label: "choose" })
        setTest(newArray)
      } else {
        console.error("Please choose the test you want to add.")
      }
    } else {
      console.error("All Test Selected")
    }
  }

  const handleDeleteOption = (index) => {
    let newOptions = [...test]
    if (newOptions.length > 1) {
      newOptions.splice(index, 1)
      setTest(newOptions)
    } else {
      console.error("A battery should consist of minimal one test.")
    }
  }

  return (
    <>
      <Modal
        size="xl"
        header="Update Candidate"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        modalState={modalState}
        loading={loadingModal}
        buttonSubmitText={tab == "update" ? "Update Candidate" : "Add Test"}
      >
        <div className="tabs tabs-underline mb-4">
          <input
            type="radio"
            id="tab-1"
            className="tab-toggle"
            checked={tab == "update" ? true : false}
            onChange={() => setTab("update")}
          />
          <label htmlFor="tab-1" className="tab tab-bordered px-6">
            Update Candidate
          </label>

          <input
            type="radio"
            id="tab-2"
            className="tab-toggle"
            checked={tab == "add-test" ? true : false}
            onChange={() => setTab("add-test")}
          />
          <label htmlFor="tab-2" className="tab tab-bordered px-6">
            Add Extra Test
          </label>
        </div>

        <div
          className={`flex flex-col gap-4 ${tab == "update" ? "" : "hidden"}`}
        >
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
                disabled={["1", "2", "4"].includes(statusProgress)}
                className={`input input-sm max-w-full ${
                  isSubmit && helperCheckErrorList("language")
                    ? "input-error"
                    : "input-ghost-primary"
                }`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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
                disabled={
                  smartInterview === "3" ||
                  ["1", "2", "4"].includes(statusProgress)
                }
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
                  disabled={
                    smartInterview === "3" ||
                    ["1", "2", "4"].includes(statusProgress)
                  }
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
                disabled={
                  smartInterview === "3" ||
                  ["1", "2", "4"].includes(statusProgress)
                }
              >
                <option value="">-choose-</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">SMART Interview:</label>
              <select
                disabled={["1", "2", "4"].includes(statusProgress)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <DateTime
                    value={startPeriod}
                    onChange={(val) => setStartPeriod(val)}
                    placeholder="Login - Start"
                    className={"input-sm"}
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
                    min={startPeriod}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
            <div className="form-field">
              <label className="form-label">Login Count:</label>
              <input
                className="input-ghost-primary input input-sm max-w-full"
                type="number"
                value={loginCount}
                onChange={(e) => setLoginCount(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Blocked:</label>
              <CheckBox
                primaryText={"No"}
                secondaryText={"Yes"}
                sliderColor={"#F31260"}
                value={blockedStatus}
                onValueChange={(value) => setBlockedStatus(value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Login Status:</label>
              <CheckBox
                primaryText={"Offline"}
                secondaryText={"Online"}
                sliderColor={"#0072F5"}
                value={loginStatus}
                onValueChange={(value) => setLoginStatus(value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Candidate Status:</label>
              <CheckBox
                primaryText={"Not Active"}
                secondaryText={"Active"}
                value={activeStatus}
                onValueChange={(value) => setActiveStatus(value)}
              />
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
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4 p-4">
                    <div>
                      <label className="label">Attribute 1:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 2:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label ">Attribute 3:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 4:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label">Atribute 5:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 6:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label ">Attribute 7:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
                      />
                    </div>
                    <div>
                      <label className="label">Attribute 8:</label>
                      <input
                        className="input-ghost-primary input input-sm bg-white max-w-full"
                        type="text"
                        name="battery_label"
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
                disabled={
                  batteryLoading || ["1", "2", "4"].includes(statusProgress)
                }
                loading={batteryLoading}
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
              disabled={groupLoading}
              loading={groupLoading}
              value={group}
              options={groupList}
              onChange={(val) => setGroup(val)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Welcome Message:</label>
            <CustomSelect
              disabled={welcomeMessageLoading}
              loading={welcomeMessageLoading}
              value={welcomeMessage}
              options={welcomeMessageList}
              onChange={(val) => setWelcomeMessage(val)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Biodata Form:</label>
            <CustomSelect
              disabled={
                groupLoading || ["1", "2", "4"].includes(statusProgress)
              }
              loading={groupLoading}
              value={biodataForm}
              options={biodataFormList}
              onChange={(val) => setBiodataForm(val)}
            />
          </div>
        </div>
        <div className={`${tab == "add-test" ? "" : "hidden"}`}>
          <h1 className="text-center">Test Name</h1>
          <div className="w-full my-4 flex flex-col gap-4 items-center justify-center">
            {test.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center gap-x-2 w-full"
                >
                  <div className="flex gap-x-3 max-w-full w-[80%]">
                    <div className="w-full">
                      <CustomSelect
                        onChange={(e) => handleOptionChange(e, index)}
                        value={item}
                        options={testList}
                        loading={testLoading}
                        disabled={testLoading}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-error  btn-circle btn-md"
                      onClick={() => handleDeleteOption(index)}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              )
            })}
            <div className="pt-5">
              <Button
                type="button"
                onClick={() => handleAddOption()}
                text="Add Test"
                icon="fa fa-plus"
                color="success"
              />
            </div>
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
