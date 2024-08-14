import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Alert from '@/components/Alert'
import TextEditor from '@/components/TextEditor'
import axiosClient from '@/utils/axiosClient'

const EmailInvitationCreate = ({
    triggerFetch,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
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

    const handleAdd = async () => {
        setLoadingModal(true)
        try {
            const response = await axiosClient.post(`/email-invitation`, formData)
            setDataAlert({
                type: 'success',
                message: 'Successfully added a new Email Invitation.',
            })
            setShowAlert(true)
            setModalState(false)
            setFormData({
                id_client: '4',
                email_name: '',
                email_subject: '',
                email_content: '',
                language: 'English',
            })
            triggerFetch()
            setLoadingModal(false)
        } catch (error) {
            console.error('Error adding data:', error)
        }
    }

    const handleFromTextEditor = (raw, inlined) => {
        setEmailContent(raw)
        setFormData({...formData, email_content: inlined})
    }

    const onSubmit = () => {
        if (formData.email_name.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Template Name field is required.',
            })
            setShowAlertModal(true)
            return
        }
        if (formData.email_subject.length == 0) {
            setDataAlertModal({
                type: 'error',
                message: 'The Email Subject field is required.',
            })
            setShowAlertModal(true)
            return
        }
        handleAdd()
    }

    useEffect(() => {
        setFormData({
            email_name: '',
            email_subject: '',
            email_content: '',
            language: 'English',
        })
        setEmailContent('')
    }, [modalState])

    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header="Create Email invitation"
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

export default EmailInvitationCreate
