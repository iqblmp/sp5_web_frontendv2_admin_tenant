import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import Select from "react-select"
import makeAnimated from "react-select/animated"

import Alert from "@/components/Alert"
import Modal from "@/components/Modal"

const animatedComponents = makeAnimated()

const ProjectManage = ({
  id,
  modalLabel,
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  setId,
  triggerFetch,
}) => {
  const [formData, setFormData] = useState({
    group: [],
  })
  const [option, setOption] = useState([])
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingSelect, setLoadingSelect] = useState(true)
  const [dataAlertModal, setDataAlertModal] = useState({
    type: "",
    message: "",
  })
  const [disabled, setDisabled] = useState(true)

  const handleAdd = async () => {
    try {
      setLoadingModal(true)
      await axiosClient.post(`/project/` + id + "/manage", {
        group: formData.group.map((item) => item.value),
      })
      setDataAlert({
        type: "success",
        message: "Successfully Manage Project",
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
      setId("")
      triggerFetch()
    } catch (error) {
      console.error("Error adding data:", error)
    }
  }

  const handleChangeOption = (selectedOptions) => {
    setFormData({ group: selectedOptions })
  }

  const fetchData = async () => {
    try {
      setDisabled(false)
      setLoadingModal(true)
      const res = await axiosClient.get(`/candidate-group/options`)
      const dataOption = res.data.data.map((item) => {
        return {
          value: item.id + "",
          label: item.group_name,
        }
      })
      setDisabled(true)
      setOption(dataOption)
      setLoadingModal(false)
    } catch (error) {
      console.error("error fetch data", error)
    }
  }

  const getSelected = async (id) => {
    try {
      if (id === "") return
      setDisabled(false)
      setLoadingModal(true)
      const response = await axiosClient.get("/project/" + id + "/group")

      const dataSelected = response.data.data.data.map((item) => {
        return {
          value: item.group_id + "",
          label: item.group_name,
        }
      })

      setFormData({ group: dataSelected })
      setDisabled(true)
      setLoadingModal(false)
      setLoadingSelect(false)
    } catch (error) {
      console.error("error get selected", error)
    }
  }

  useEffect(() => {
    if (modalState) {
      getSelected(id)
      fetchData()
    }
  }, [id])

  const onSubmit = (e) => {
    e.preventDefault()

    if (formData.group.length === 0) {
      setDataAlertModal({
        type: "error",
        message: "Please select the group candidate.",
      })
      setShowAlertModal(true)
      return
    }

    handleAdd()
  }

  return (
    <Modal
      modalLabel={modalLabel}
      size="md"
      header="Manage Project"
      modalState={modalState}
      handleCloseModal={() => {
        setId("")
        setModalState(false)
      }}
      handleSubmit={onSubmit}
      loading={loadingModal}
      disabled={disabled}
    >
      <Alert
        type={dataAlertModal.type}
        message={dataAlertModal.message}
        flag={showAlertModal}
        setFlag={setShowAlertModal}
      />
      <form className="flex flex-col gap-4 ">
        <label className="label flex text-center font-semibold -mb-2">
          Select Group:
        </label>
        <Select
          isDisabled={loadingSelect}
          isLoading={loadingSelect}
          placeholder="-choose-"
          name="group"
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          hideSelectedOptions={false}
          options={option}
          value={formData.group}
          onChange={(selectedOptions) => handleChangeOption(selectedOptions)}
        />
      </form>
    </Modal>
  )
}

export default ProjectManage
