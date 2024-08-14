import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import axiosClient from '@/utils/axiosClient'

const BiodataRegistrationCreate = ({
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
}) => {
    const [formData, setFormData] = useState({
        id_client: 4,
        template_name: '',
    })
    const [loadingModal, setLoadingModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    const handleAdd = async () => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.post(
                process.env.API_URL + `/biodata-registration`,
                formData
            )
            setDataAlert({
                type: 'success',
                message: 'Successfully added a new Template Biodata.',
            })
            setShowAlert(true)
            setModalState(false)
            setFormData({
                id_client: 4,
                template_name: '',
            })
            triggerFetch()
            setLoadingModal(false)
        } catch (error) {
            setDataAlert({
                type: 'error',
                message: 'Failed created a new Biodata Registration',
            })
            setLoadingModal(false)
        }
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
        handleAdd()
    }

    useEffect(() => {
        setFormData({
            template_name: '',
        })
    }, [modalState])

    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header="Create Custom Registration"
            modalState={modalState}
            handleCloseModal={() => setModalState(false)}
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
                    value={formData.template_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            template_name: e.target.value,
                        })
                    }
                />
            </form>
        </Modal>
    )
}

export default BiodataRegistrationCreate
