import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import axiosClient from '@/utils/axiosClient'

const EmbeddedVideoUrlEdit = ({
    id,
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    setId,
}) => {
    const [formData, setFormData] = useState({
        id_client: '',
        vidio_title: '',
        vidio_url: '',
    })
    const [loadingModal, setLoadingModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    const handleData = async (id) => {
        try {
            setLoadingModal(true)
            const res = await axiosClient.get(`/embedded-vidio-url/` + id)
            return res
        } catch (error) {
            // todo: handle error
        }
    }

    const handleUpdate = async (id) => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.put(`/embedded-vidio-url/` + id, formData)
            setDataAlert({
                type: 'success',
                message: 'Successfully updated embedded video URL.',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)
            setFormData({
                id_client: '',
                vidio_title: '',
                vidio_url: '',
            })
            setId("")
            triggerFetch()
        } catch (error) {
            console.error('Error adding data:', error)
        }
    }

    useEffect(() => {
        if (id) {
            handleData(id).then((res) => {
                if (res) {
                    const _res = res.data.data
                    setFormData({
                        id_client: _res.client.id,
                        vidio_title: _res.title,
                        vidio_url: _res.url,
                    })
                    setLoadingModal(false)
                }
            })
        }
    }, [id])

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
        handleUpdate(id)
    }

    return (
        <Modal
            modalLabel={modalLabel}
            size="sm"
            header="Edit Embedded Video URL"
            modalState={modalState}
            handleCloseModal={() => {
                setId("")
                setModalState(false)
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
                    placeholder="Title"
                    value={formData.vidio_url}
                    onChange={(e) =>
                        setFormData({ ...formData, vidio_url: e.target.value })
                    }
                />
            </form>
        </Modal>
    )
}

export default EmbeddedVideoUrlEdit
