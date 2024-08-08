import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import axiosClient from '@/utils/axiosClient'

const BiodataRegistrationEdit = ({
    id,
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    setId,
}) => {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        id_client: '',
        template_name: '',
        template: [],
    })
    const [loadingModal, setLoadingModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    useEffect(() => {
        if (id) {
            handleData(id)
        }
    }, [id])

    const handleData = async (id) => {
        setLoadingModal(true)
        try {
            const res = await axiosClient.get(`/biodata-registration/` + id)

            if (res.data && res.data.data) {
                const _res = res.data.data
                setData(_res.template)

                const form_data = _res.template.map((item) => ({
                    id_template: item.id_template,
                    label_default: item.label_default,
                    label_alias: item.label_alias,
                    is_required: item.is_required,
                    field_type: item.field_type,
                    category: item.category,
                    field_name: item.field_name,
                }))
                setFormData({
                    id_client: _res.client.id,
                    template_name: _res.template_name,
                    template: form_data,
                })
            }
            setLoadingModal(false)
        } catch (error) {
            // todo: handle error
        }
    }

    const handleUpdate = async (id) => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.put(`/biodata-registration/` + id, formData)
            const data = response.data
            setDataAlert({
                type: 'success',
                message: 'Successfully updated ' + formData.template_name + '.',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)

            setId("")
            triggerFetch()
        } catch (error) {
            console.error('Error adding data:', error)
        }
    }

    const handleRequirementChange = (value, index) => {
        const template = [...formData.template]
        template[index].is_required = value
        setFormData({ ...formData, template: template })
    }

    const handleChangeLabel = (value, index) => {
        const template = [...formData.template]
        template[index].label_alias = value
        setFormData({ ...formData, template: template })
    }

    const onSubmit = () => {
        if (formData.template_name.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Template Name field is required.',
            })
            setShowAlertModal(true)
            return
        }
        handleUpdate(id)
    }

    return (
        <Modal
            modalLabel={modalLabel}
            size="lg"
            header="Edit Custom Registration"
            modalState={modalState}
            handleCloseModal={() => {
                setModalState(false)
                setId("")
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
            <form className="flex flex-col gap-4">
                <label className="flex text-center font-semibold -mb-2">
                    Template Name:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="template_name"
                    placeholder="Name"
                    value={formData.template_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            template_name: e.target.value,
                        })
                    }
                />

                <h2 className="text-lg text-center p-3 -mb-4 bg-green-600 text-white  font-semibold">
                    General Information
                </h2>
                <div className='overflow-x-auto'>
                    <table className="table table-compact bg-green-200">
                        <tbody>
                            <tr className='h-10'>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Default Field Name</p>
                                </th>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Custom Field Name</p>
                                </th>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Requirement</p>
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            {data.map((item, index) => {
                                if (item.category == 'General Information') {
                                    return (
                                        <tr
                                            key={`${item.id}_${item.label_default}`}
                                        >
                                            <td className="w-96 font-semibold">
                                                <span className="pl-2">
                                                    {item.label_default}
                                                </span>
                                            </td>
                                            <td>
                                                <input
                                                    className="input-success  input w-80"
                                                    type="text"
                                                    name="label_alias"
                                                    placeholder="Title"
                                                    value={
                                                        formData.template[index]
                                                            ?.label_alias
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeLabel(
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                            {item.label_default == 'First Name' ||
                                            item.label_default == 'Last Name' ||
                                            item.label_default == 'Email' ||
                                            item.label_default == 'Gender' ||
                                            item.label_default == 'Date of Birth' ||
                                            item.label_default == 'Country' ? (
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <i className="text-center items-center justify-center font-semibold text-sm ">
                                                        Mandatory
                                                    </i>
                                                </td>
                                            ) : (
                                                <td className="flex flex-row h-16 gap-x-5 ">
                                                    <div className="pl-5 pt-3  ">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="not_required"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'not_required'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'not_required',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'not_required',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Not Required
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="Required"
                                                                id="reqG2"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'required'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'Required',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'Required',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Required
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div className="pr-5 pt-3">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="andatory"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'mandatory'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'mandatory',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'mandatory',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Mandatory
                                                            </i>
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-lg text-center p-3 -my-4 bg-sky-600 text-white  font-semibold">
                    Education Information
                </h2>
                <div className='overflow-x-auto'>
                    <table className="table table-compact bg-sky-200">
                        <tbody>
                            <tr className='h-10'>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Default Field Name</p>
                                </th>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Custom Field Name</p>
                                </th>
                                <th className='bg-orange-600'>
                                    <p className='text-white text-center font-semibold'>Requirement</p>
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            {data.map((item, index) => {
                                if (item.category == 'Education Information') {
                                    return (
                                        <tr
                                            key={`${item.id}_${item.label_default}`}
                                        >
                                            <td className="w-96 font-semibold">
                                                <span className="pl-2">
                                                    {item.label_default}
                                                </span>
                                            </td>
                                            <td>
                                                <input
                                                    className="input-primary  input w-80"
                                                    type="text"
                                                    name="label_alias"
                                                    placeholder="Title"
                                                    value={
                                                        formData.template[index]
                                                            ?.label_alias
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeLabel(
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>

                                            {item.label_default ==
                                            'Education Level' ? (
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <i className="font-semibold text-sm ">
                                                        Mandatory
                                                    </i>
                                                </td>
                                            ) : (
                                                <td className="flex flex-row h-16 gap-x-5 ">
                                                    <div className="pl-5 pt-3  ">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="not_required"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'not_required'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'not_required',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'not_required',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Not Required
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="Required"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'required'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'Required',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'Required',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Required
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div className="pr-5 pt-3">
                                                        <div className="flex gap-1 radio-item">
                                                            <input
                                                                type="radio"
                                                                value="mandatory"
                                                                id="reqE3"
                                                                checked={
                                                                    formData.template[
                                                                        index
                                                                    ]?.is_required.toLowerCase() ===
                                                                    'mandatory'
                                                                }
                                                                onChange={() =>
                                                                    handleRequirementChange(
                                                                        'mandatory',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <i
                                                                onClick={() =>
                                                                    handleRequirementChange(
                                                                        'mandatory',
                                                                        index
                                                                    )
                                                                }
                                                                className="font-semibold cursor-pointer"
                                                            >
                                                                Mandatory
                                                            </i>
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </form>
        </Modal>
    )
}

export default BiodataRegistrationEdit
