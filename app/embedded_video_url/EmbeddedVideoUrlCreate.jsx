import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import axiosClient from '@/utils/axiosClient'

const embeddedVideoUrlCreate = ({
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
}) => {
    const [formData, setFormData] = useState({
        id_client: '4',
        vidio_title: '',
        vidio_url: '',
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
                `/embedded-vidio-url`,
                formData
            )
            setDataAlert({
                type: 'success',
                message: 'Successfully created embedded video URL.',
            })
            setShowAlert(true)
            setModalState(false)
            setFormData({
                id_client: '4',
                vidio_title: '',
                vidio_url: '',
            })
            triggerFetch()
            setLoadingModal(false)
        } catch (error) {
            setDataAlert({
                type: 'error',
                message: 'Failed to create new embedded video url',
            })
            setShowAlert(true)
            setLoadingModal(false)
        }
    }

    const onSubmit = () => {
        if (formData.vidio_title.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Video Title field is required.',
            })
            setShowAlertModal(true)
            return
        }
        if (formData.vidio_url.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Video URL field is required.',
            })
            setShowAlertModal(true)
            return
        }
        handleAdd()
    }

    useEffect(() => {
        setFormData({
            id_client: '4',
            vidio_title: '',
            vidio_url: '',
        })
    }, [modalState])

    return (
        <Modal
            modalLabel={modalLabel}
            size="sm"
            header="Add Embedded Video URL"
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
                    Video Title:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="vidio_title"
                    value={formData.vidio_title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            vidio_title: e.target.value,
                        })
                    }
                />
                <label className="flex text-center font-semibold -mb-2">
                    Video URL:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="vidio_url"
                    value={formData.vidio_url}
                    onChange={(e) =>
                        setFormData({ ...formData, vidio_url: e.target.value })
                    }
                />
            </form>
        </Modal>
    )
}

export default embeddedVideoUrlCreate
