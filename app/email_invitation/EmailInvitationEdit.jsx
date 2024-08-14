import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import TextEditor from '@/components/TextEditor'
import axiosClient from '@/utils/axiosClient'

const EmailinvitationEdit = ({
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
        id_client: '4',
        email_name: '',
        email_subject: '',
        email_content: '',
        language: 'English',
    })
    const [emailContent, setEmailContent] = useState("")
    const [loadingModal, setLoadingModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    const handleData = async (id) => {
        try {
            setLoadingModal(true)
            const res = await axiosClient.get(`/email-invitation/` + id)
            return res
        } catch (error) {
            // todo: handle error
        }
    }

    const handleUpdate = async (id) => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.put(`/email-invitation/` + id, formData)
            setDataAlert({
                type: 'success',
                message: 'Successfully edited a new Email Invitation.',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)
            setFormData({
                id_client: '4',
                email_name: '',
                email_subject: '',
                email_content: '',
                language: 'English',
            })
            setId("")
            triggerFetch()
        } catch (error) {
            console.error('Error adding data:', error)
        }
    }

    const handleFromTextEditor = (raw, inlined) => {
        setEmailContent(raw)
        setFormData({...formData, email_content: inlined})
    }

    useEffect(() => {
        if (id) {
            handleData(id).then((res) => {
                if (res) {
                    const _res = res.data.data
                    setFormData({
                        id_client: _res.client.id,
                        email_name: _res.name,
                        email_subject: _res.subject,
                        email_content: _res.content,
                        language: _res.language,
                    })
                    setEmailContent(_res.content)
                    setLoadingModal(false)
                }
            })
        }
    }, [id])

    const onSubmit = () => {
        if (formData.email_name.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Welcome Page Name field is required.',
            })
            setShowAlertModal(true)
            return
        }
        if (formData.email_subject.length == 0) {
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
            header="Edit Email invitation"
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
                    Template Name:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="email_name"
                    value={formData.email_name}
                    onChange={(e) =>
                        setFormData({ ...formData, email_name: e.target.value })
                    }
                />
                <label className="flex text-center font-semibold -mb-2">
                    Email Subject:
                </label>
                <input
                    className="input-ghost-primary input max-w-full"
                    type="text"
                    name="email_subject"
                    value={formData.email_subject}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email_subject: e.target.value,
                        })
                    }
                />
                <label className="flex text-center font-semibold -mb-2">
                    Email Content:
                </label>
                <TextEditor data={emailContent} setDataEditor={handleFromTextEditor} />
            </form>
        </Modal>
    )
}

export default EmailinvitationEdit
