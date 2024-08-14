import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import TextEditor from '@/components/TextEditor'
import axiosClient from '@/utils/axiosClient'

const WelcomePageEdit = ({
    id,
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    setSelectedId,
}) => {
    const [formData, setFormData] = useState({
        id_client: '4',
        wpage_name: '',
        wpage_title: '',
        wpage_content: '',
        wpage_language: 'English',
    })
    const [wpageContent, setWepageContent] = useState("")
    const [loadingModal, setLoadingModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    const handleData = async (id) => {
        try {
            setLoadingModal(true)
            const res = await axiosClient.get(`/welcome-page/` + id)
            return res
        } catch (error) {
            // todo: handle error
        }
    }

    const handleUpdate = async (id) => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.put(`/welcome-page/` + id, formData)
            setDataAlert({
                type: 'success',
                message: 'Successfully updated ' + formData.wpage_name + '.',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)
            setFormData({
                id_client: '4',
                wpage_name: '',
                wpage_title: '',
                wpage_content: '',
                wpage_language: 'English',
            })
            setSelectedId(null)
            triggerFetch()
        } catch (error) {
            // todo: handle error
            setLoadingModal(false)
            setDataAlertModal({
                type: 'error',
                message: 'Error create/update data.',
            })
            setShowAlertModal(true)
        }
    }

    const handleFromTextEditor = (raw, inlined) => {
        setWepageContent(raw)
        setFormData({...formData, wpage_content: inlined})
    }

    useEffect(() => {
        if (id) {
            handleData(id).then((res) => {
                if (res) {
                    const _res = res.data.data
                    setFormData({
                        id_client: _res.client.id,
                        wpage_name: _res.name,
                        wpage_title: _res.title,
                        wpage_content: _res.content,
                        wpage_language: _res.language,
                    })
                    setWepageContent(_res.content)
                    setLoadingModal(false)
                }
            })
        }
    }, [id])

    const onSubmit = () => {
        if (formData.wpage_name.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Welcome Page Name field is required.',
            })
            setShowAlertModal(true)
            return
        }
        if (formData.wpage_title.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Welcome Page Title field is required.',
            })
            setShowAlertModal(true)
            return
        }
        handleUpdate(id)
    }

    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header="Edit Welcome Page"
            modalState={modalState}
            handleCloseModal={() => {
                setModalState(false)
                setSelectedId(null)
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
                    Welcome Page Name:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="wpage_name"
                    placeholder="Name"
                    value={formData.wpage_name}
                    onChange={(e) =>
                        setFormData({ ...formData, wpage_name: e.target.value })
                    }
                />
                <label className="flex text-center font-semibold -mb-2">
                    Welcome Page Title:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="wpage_title"
                    placeholder="Title"
                    value={formData.wpage_title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            wpage_title: e.target.value,
                        })
                    }
                />
                <label className="flex text-center font-semibold -mb-2">
                    Welcome Page Description:
                </label>
                <TextEditor data={wpageContent} setDataEditor={handleFromTextEditor} />
            </form>
        </Modal>
    )
}

export default WelcomePageEdit
