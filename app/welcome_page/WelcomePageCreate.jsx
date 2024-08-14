import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import TextEditor from '@/components/TextEditor'
import axiosClient from '@/utils/axiosClient'

const WelcomePageCreate = ({
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
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

    const handleAdd = async () => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.post(`/welcome-page`, formData)
            setDataAlert({
                type: 'success',
                message: 'Successfully added a new Welcome Page.',
            })
            setShowAlert(true)
            setModalState(false)
            setFormData({
                id_client: '4',
                wpage_name: '',
                wpage_title: '',
                wpage_content: '',
                wpage_language: 'English',
            })
            triggerFetch()
            setLoadingModal(false)
        } catch (error) {
            setDataAlertModal({
                type: 'error',
                message: 'Error create/update data.',
            })
            setLoadingModal(false)
            setShowAlertModal(true)
            console.error('Error adding data:', error)
        }
    }

    const handleFromTextEditor = (raw, inlined) => {
        setWepageContent(raw)
        setFormData({...formData, wpage_content: inlined})
    }

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
        handleAdd()
    }

    useEffect(() => {
        setFormData({
            wpage_name: '',
            wpage_title: '',
            wpage_content: '',
            wpage_language: 'English',
        })
        setWepageContent('')
    }, [modalState])

    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header="Create Welcome Page"
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

export default WelcomePageCreate
