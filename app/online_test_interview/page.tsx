"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ConfirmationModal from "@/components/ConfirmationModal"
import DatePicker from "@/components/DatePicker"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

export default function OnlineTestInterviewPage() {
  const [loadingPage, setLoadingPage] = useState(true)

  const [modalAddState, setModalAddState] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [data, setData] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [showHints, setShowHints] = useState(false) // TODO: use this state in UI
  const [deadline, setDeadline] = useState("")
  const [questionList, setQuestionList] = useState([
    {
      questionText: "",
      answerType: "",
      duration: 0,
      retakes: 0,
    },
  ])

  const [modalDeleteState, setModalDeleteState] = useState(false)

  const [loadingModal, setLoadingModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const [errorList, setErrorList] = useState({
    title: false,
    description: false,
    language: false,
    videoUrl: false,
    deadline: false,
    questionList: [
      {
        id: 0,
        questionText: false,
        answerType: false,
        duration: false,
        retakes: false,
      },
    ],
  })
  const [countId, setCountId] = useState(0)

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  useEffect(() => {
    if (countId > questionList.length) {
      const temp = [...questionList]
      temp.push({
        id: countId,
        questionText: "",
        answerType: "",
        duration: 0,
        retakes: 0,
      })
      setQuestionList(temp)
      const temp_error = { ...errorList }
      errorList.questionList.push({
        questionText: false,
        answerType: false,
        duration: false,
        retakes: false,
      })
      setErrorList(temp_error)
    }
  }, [countId])

  const resetData = () => {
    setTitle("")
    setDescription("")
    setLanguage("")
    setVideoUrl("")
    setShowHints(false)
    setDeadline("")
    setQuestionList([
      {
        id: 0,
        questionText: "",
        answerType: "",
        duration: 0,
        retakes: 0,
      },
    ])
    setSelectedId(null)
    setData(null)
    setErrorList({
      title: false,
      description: false,
      language: false,
      videoUrl: false,
      deadline: false,
      questionList: [
        {
          questionText: false,
          answerType: false,
          duration: false,
          retakes: false,
        },
      ],
    })
    setCountId(0)
  }

  const checkError = () => {
    let title_error = false
    let description_error = false
    let language_error = false
    let video_url_error = false
    let deadline_error = false
    let question_list_error = []

    let res = false

    if (title === "") {
      title_error = true
      res = true
    }
    if (description === "") {
      description_error = true
      res = true
    }
    if (language === "") {
      language_error = true
      res = true
    }
    if (videoUrl === "") {
      video_url_error = true
      res = true
    }
    if (deadline === "") {
      deadline_error = true
      res = true
    }
    for (let i = 0; i < questionList.length; i++) {
      question_list_error.push({
        questionText: false,
        answerType: false,
        duration: false,
        retakes: false,
      })
      if (questionList[i].questionText === "") {
        question_list_error[i].questionText = true
        res = true
      }
      if (questionList[i].answerType === "") {
        question_list_error[i].answerType = true
        res = true
      }
      if (questionList[i].duration === 0) {
        question_list_error[i].duration = true
        res = true
      }
      if (questionList[i].retakes === 0) {
        question_list_error[i].retakes = true
        res = true
      }
    }

    setErrorList({
      title: title_error,
      description: description_error,
      language: language_error,
      videoUrl: video_url_error,
      deadline: deadline_error,
      questionList: question_list_error,
    })

    return res
  }

  const handleSubmit = () => {
    if (checkError()) {
      return
    }

    const body = {
      title: title,
      description: description,
      language: language,
      video_url: videoUrl,
      show_hints: false,
      deadline: deadline,
      question_list: questionList.map((question) => ({
        ...question,
        duration: parseInt(question.duration),
        retakes: parseInt(question.retakes),
      })),
    }

    setLoadingModal(true)
    if (isUpdate) {
      axiosClient
        .post(`${process.env.API_URL}/interview/${selectedId}`, body)
        .then(() => {
          setModalAddState(false)
          setLoadingModal(false)
          setDataAlert({
            type: "success",
            message: "Successfully update interview",
          })
          setShowAlert(true)
          resetData()
        })
        .catch((err) => {
          setModalAddState(false)
          setLoadingModal(false)
          setDataAlert({
            type: "error",
            message: "Error update interview",
          })
          setShowAlert(true)
        })
    } else {
      axiosClient
        .post(`${process.env.API_URL}/interview`, body)
        .then(() => {
          setModalAddState(false)
          setLoadingModal(false)
          setDataAlert({
            type: "success",
            message: "Successfully create interview",
          })
          setShowAlert(true)
          setTriggerFetch(!triggerFetch)
          resetData()
        })
        .catch((err) => {
          setModalAddState(false)
          setLoadingModal(false)
          setDataAlert({
            type: "error",
            message: "Error create interview",
          })
          setShowAlert(true)
        })
    }
  }

  const handleDelete = () => {
    setLoadingModal(true)
    axiosClient
      .delete(`${process.env.API_URL}/interview/${selectedId}`)
      .then(() => {
        setModalDeleteState(false)
        setLoadingModal(false)
        setDataAlert({
          type: "success",
          message: "Successfully delete interview",
        })
        setTriggerFetch(!triggerFetch)
        setShowAlert(true)
      })
      .catch((err) => {
        setModalDeleteState(false)
        setLoadingModal(false)
        setDataAlert({
          type: "error",
          message: "Error update interview",
        })
        setShowAlert(true)
      })
  }

  const handleQuestionChange = (id, field, value) => {
    const temp = [...questionList]
    temp.find((item) => item.id === id)[field] = value
    setQuestionList(temp)
  }

  const handleDeleteQuestion = (index) => {
    const temp = [...questionList]
    temp.splice(index, 1)
    setQuestionList(temp)
    const temp_error = { ...errorList }
    errorList.questionList.splice(index, 1)
    setErrorList(temp_error)
  }

  const header = [
    {
      type: "text",
      name: "Job Key",
      label: "Key",
    },
    {
      type: "text",
      name: "Interview Title",
      label: "Title",
    },
    {
      type: "action",
      name: "Action",
      generateAction: (data) => (
        <div key={data.Id} className="flex justify-center gap-5">
          <Button text="Detail" color="success" size="xs" />
          <Button text="Edit" color="warning" size="xs" />
          <Button
            text="Delete"
            color="error"
            size="xs"
            onClick={() => {
              setSelectedId(data.Id)
              setModalDeleteState(true)
            }}
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
              dataSource={`${process.env.API_URL}/interview`}
              header={header}
              triggerFetch={triggerFetch}
            />
            <Button
              text={"Add Interview"}
              color="primary"
              icon="fa fa-plus"
              onClick={() => {
                setIsUpdate(false)
                setIsShow(false)
                setModalAddState(true)
              }}
            />
          </div>
          <Modal
            size="md"
            header={
              isUpdate
                ? "Update Interview"
                : isShow
                ? "Detail Interview"
                : "Add Interview"
            }
            modalState={modalAddState}
            handleCloseModal={() => {
              resetData()
              setModalAddState(false)
            }}
            handleSubmit={handleSubmit}
            loading={loadingModal}
          >
            <div className="flex flex-col gap-4">
              <div className="form-field">
                <label className="label flex text-center font-semibold -mb-2">
                  Title:
                </label>
                <input
                  className={`input max-w-full ${
                    errorList.title ? "input-error" : "input-ghost-primary"
                  }`}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="label flex text-center font-semibold -mb-2">
                  Description:
                </label>
                <textarea
                  className={`input textarea max-w-full ${
                    errorList.description
                      ? "border-rose-600"
                      : "input-ghost-primary"
                  }`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="form-field">
                  <label className="label flex text-center font-semibold -mb-2">
                    Language:
                  </label>
                  <select
                    className={`input max-w-full ${
                      errorList.language ? "input-error" : "input-ghost-primary"
                    }`}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">-choose-</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="label flex text-center font-semibold -mb-2">
                    Video URL:
                  </label>
                  <input
                    className={`input max-w-full ${
                      errorList.videoUrl ? "input-error" : "input-ghost-primary"
                    }`}
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="label flex text-center font-semibold -mb-2">
                    Deadlline:
                  </label>
                  <DatePicker
                    type="custom"
                    className={`input max-w-full ${
                      errorList.deadline ? "input-error" : "input-ghost-primary"
                    }`}
                    value={deadline}
                    onChange={(e) => {
                      setDeadline(e.target.value)
                    }}
                  />
                </div>
              </div>
              {Array.isArray(questionList) &&
                questionList.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="border-2 border-black rounded-md p-2"
                    >
                      <div className="form-field mb-4">
                        <label className="label flex text-center font-semibold -mb-2">
                          Question:
                        </label>
                        <textarea
                          className={`input textarea max-w-full ${
                            errorList.questionList[index].questionText
                              ? "border-rose-600"
                              : "input-ghost-primary"
                          }`}
                          value={item.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              item.id,
                              "questionText",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-3 gap-x-4 mb-4">
                        <div className="form-field">
                          <label className="label flex text-center font-semibold -mb-2">
                            Answer Type:
                          </label>
                          <select
                            className={`input max-w-full ${
                              errorList.questionList[index].answerType
                                ? "input-error"
                                : "input-ghost-primary"
                            }`}
                            value={item.answerType}
                            onChange={(e) =>
                              handleQuestionChange(
                                item.id,
                                "answerType",
                                e.target.value
                              )
                            }
                          >
                            <option value="">-choose-</option>
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label className="label flex text-center font-semibold -mb-2">
                            Duration:
                          </label>
                          <input
                            className={`input max-w-full ${
                              errorList.questionList[index].duration
                                ? "input-error"
                                : "input-ghost-primary"
                            }`}
                            type="number"
                            value={item.duration}
                            onChange={(e) =>
                              handleQuestionChange(
                                item.id,
                                "duration",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="form-field">
                          <label className="label flex text-center font-semibold -mb-2">
                            Retakes:
                          </label>
                          <input
                            className={`input max-w-full ${
                              errorList.questionList[index].retakes
                                ? "input-error"
                                : "input-ghost-primary"
                            }`}
                            type="number"
                            value={item.retakes}
                            onChange={(e) =>
                              handleQuestionChange(
                                item.id,
                                "retakes",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      {questionList.length > 1 && (
                        <div className="flex justify-end">
                          <Button
                            text="Delete"
                            color="error"
                            icon="fa fa-trash"
                            onClick={(index) => handleDeleteQuestion(index)}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              <div>
                <Button
                  text="Add Question"
                  color="primary"
                  icon="fa fa-plus"
                  onClick={() => {
                    setCountId(countId + 1)
                  }}
                />
              </div>
            </div>
          </Modal>
          <ConfirmationModal
            loading={loadingModal}
            modalState={modalDeleteState}
            text="Are you sure you want to delete this candidate?"
            handleSubmit={handleDelete}
            handleCloseModal={() => {
              setModalDeleteState(false)
              setSelectedId(null)
            }}
          />
        </>
      )}
    </>
  )
}
