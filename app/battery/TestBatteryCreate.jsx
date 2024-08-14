import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import { getCookie, hasCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ConfirmationModal from "@/components/ConfirmationModal"
import CustomSelect from "@/components/CustomSelect"
import Modal from "@/components/Modal"

export default function TestBatteryCreate({
  modalLabel,
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  triggerFetch,
}) {
  const [formData, setFormData] = useState({
    battery_label: "",
    lang_code: "",
    remark: "-",
    client_id: 1,
    test_ids: [],
  })
  const [defaultLang, setDefaultLang] = useState("")
  const [listTest, setListTest] = useState([])
  const [imageSrc, setImageSrc] = useState("")
  const [selectedOption, setSelectedOptions] = useState([{}])
  const [showAdditionalMenu, setShowAdditionalMenu] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [dataAlertModal, setDataAlertModal] = useState({
    type: "",
    message: "",
  })
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingTestList, setLoadingTestList] = useState(false)

  const [modalSubmitState, setModalSubmitState] = useState(false)

  const modalTestDetail = "test-battery-test-description-modal-detail"
  const modalSubmitLabel = "test-battery-submit-modal"

  const getDataTest = async (language) => {
    const response = await axiosClient.get(`/test/options`, {
      params: { lang: language },
    })
    const listTest = response.data.data
    const arrTest = []
    for (const id in listTest) {
      arrTest.push({
        value: id,
        label: listTest[id],
      })
    }
    arrTest.unshift({ value: undefined, label: "-" })
    setListTest(arrTest)
    setLoadingTestList(false)
    return response.data
  }

  const resetData = () => {
    setFormData({
      battery_label: "",
      lang_code: "",
      remark: "-",
      client_id: 1,
      test_ids: [],
    })
    setSelectedOptions([{}])
    setDefaultLang("")
    setShowAdditionalMenu(false)
  }

  const handleAdd = async () => {
    try {
      setLoadingModal(true)
      await axiosClient.post("/battery", {
        ...formData,
        cnd_name: "",
        test_ids: selectedOption
          .map((item) => item.value)
          .filter((item) => item),
      })
      setDataAlert({
        type: "success",
        message: "Successfully created test battery.",
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
      resetData()
      triggerFetch()
    } catch (error) {
      console.error("Error adding data:", error)
      setDataAlert({
        type: "error",
        message: `Error adding data: ${error}`,
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
    }
  }

  const handleLangChange = async (e) => {
    const value = e.target.value
    setFormData({ ...formData, lang_code: value })

    if (value !== defaultLang) {
      setDefaultLang(value)
      setShowAdditionalMenu(value === "indonesia" || value === "english")
      if (value !== "") {
        setLoadingTestList(true)
        setSelectedOptions([{}])
        try {
          getDataTest(value)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }
  }

  const handleOptionChange = (e, index) => {
    if (!e.value) {
      setDataAlertModal({
        type: "error",
        message: "Please type the name of the test battery.",
      })
      setShowAlertModal(true)
      return
    }

    const exists = selectedOption.find((item) => item.value == e.value)
    if (exists) {
      setDataAlertModal({
        type: "error",
        message: "You have added this test on the battery.",
      })
      setShowAlertModal(true)
      return
    }

    const newOption = selectedOption.map((item, key) => {
      if (index == key) {
        return e
      }

      return item
    })

    setSelectedOptions(newOption)
  }

  const handleAddOption = async () => {
    getDataTest(defaultLang)

    if (listTest.length - selectedOption.length > 0) {
      const newArray = [...selectedOption]
      if (newArray[newArray.length - 1].value !== undefined) {
        newArray.push({ value: undefined, label: "-" })
        setSelectedOptions(newArray)
      } else {
        setDataAlertModal({
          type: "error",
          message: "Please choose the test you want to add.",
        })
        setShowAlertModal(true)
      }
    } else {
      setDataAlertModal({
        type: "error",
        message: "All Test Selected",
      })
      setShowAlertModal(true)
    }
  }

  const handleDeleteOption = (index) => {
    let newOptions = [...selectedOption]
    if (newOptions.length > 1) {
      newOptions.splice(index, 1)
      setSelectedOptions(newOptions)
    } else {
      setDataAlertModal({
        type: "error",
        message: "A battery should consist of minimal one test.",
      })
      setShowAlertModal(true)
    }
  }

  const onSubmit = () => {
    if (formData.battery_label.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "Please type the name of the test battery.",
      })
      setShowAlertModal(true)
      return
    }

    if (selectedOption[0].value == undefined) {
      setDataAlertModal({
        type: "error",
        message: "A battery should consist of minimal one test.",
      })
      setShowAlertModal(true)
      return
    }

    const checkTest = selectedOption.find((item) => item.value == undefined)
    if (formData.lang_code.length == 0 || checkTest) {
      setDataAlertModal({
        type: "error",
        message: "Please choose the test you want to add.",
      })
      setShowAlertModal(true)
      return
    }

    setModalSubmitState(true)
  }

  const handleConfirmSubmit = () => {
    setModalSubmitState(false)
    handleAdd()
  }

  return (
    <Modal
      modalLabel={modalLabel}
      size="md"
      header="Create Test Battery"
      modalState={modalState}
      handleCloseModal={() => {
        setModalState(false)
        resetData()
      }}
      handleSubmit={onSubmit}
      loading={loadingModal}
    >
      <Alert
        type={dataAlertModal.type}
        message={dataAlertModal.message}
        flag={showAlertModal}
        setFlag={setShowAlertModal}
      />
      <div className="flex flex-col gap-4">
        <label className="label flex text-center font-semibold -mb-2">
          Test Battery Name:
        </label>
        <input
          className="input-ghost-primary rounded-md  input max-w-full"
          type="text"
          name="battery_label"
          placeholder="Name"
          value={formData.battery_label}
          onChange={(e) =>
            setFormData({
              ...formData,
              battery_label: e.target.value,
            })
          }
        />
        <label className="label flex text-center font-semibold -mb-2">
          Language:
        </label>
        <select
          className="input-ghost-primary input  max-w-full"
          value={defaultLang}
          onChange={handleLangChange}
          name="lang_code"
        >
          <option value="">-Choose Language-</option>
          <option value="indonesia">Indonesia</option>
          <option value="english">English</option>
        </select>
        {showAdditionalMenu && (
          <div className="flex flex-col">
            <label className="label flex text-center font-semibold -mb-2">
              Add Test:
            </label>
            <div>
              <ul className="pt-4 flex flex-col gap-y-3 items-center">
                <label className=" flex text-center font-semibold ">
                  Select Test
                </label>
                <i className="text-xs text-blue-500 ">
                  The order of the test will be the order of how the candidate
                  will do the test.
                </i>

                {selectedOption.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center gap-x-2 pt-2 p w-full "
                  >
                    <div className="w-full flex gap-x-5 ">
                      <div className="flex-1">
                        <CustomSelect
                          onChange={(e) => handleOptionChange(e, index)}
                          value={item ?? "-"}
                          options={listTest}
                          loading={loadingTestList}
                          disabled={loadingTestList}
                          className="w-full"
                        />
                      </div>

                      <div className="space-x-2">
                        <Button
                          color="error"
                          className="btn btn-error rounded-full "
                          onClick={() => handleDeleteOption(index)}
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </Button>
                        {item.value ? (
                          <Button
                            color="primary"
                            type="button"
                            htmlFor={modalTestDetail}
                            className="btn b text-white h-[2rem] w-[2rem] rounded-full"
                            onClick={() =>
                              setImageSrc(
                                `${process.env.API_URL}/test/sample/${item.value}`
                              )
                            }
                          >
                            <i
                              className="fa fa-search-plus"
                              aria-hidden="true"
                            ></i>
                          </Button>
                        ) : (
                          <button className="btn w-[40px] bg-transparent text-white dark:text-black ">
                            ""
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
              <div className="pt-5">
                <Button
                  type="button"
                  onClick={handleAddOption}
                  text="Add Test"
                  icon="fa fa-plus"
                  color="success"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal modalLabel={modalTestDetail} header="Sample Question">
        <div className="relative">
          <img src={imageSrc} alt="sample image" />
        </div>
      </Modal>
      <ConfirmationModal
        modalState={modalSubmitState}
        modalLabel={modalSubmitLabel}
        text={`Are you sure?`}
        smallText={`You won't be able to change or delete this!`}
        handleCloseModal={() => setModalSubmitState(false)}
        handleSubmit={handleConfirmSubmit}
      />
    </Modal>
  )
}
