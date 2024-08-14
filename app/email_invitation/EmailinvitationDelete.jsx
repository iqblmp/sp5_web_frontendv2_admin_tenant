import React, { useState } from 'react'
import ModalDelete from '@/components/ModalDelete'
import axiosClient from '@/utils/axiosClient'

const EmailInvitationDelete = ({
    id,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    triggerFetch,
    setId,
    data
}) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const handleDelete = async (id) => {
        try {
            setLoadingModal(true)
            const response = await axiosClient.delete(`/email-invitation/` + id)
            setDataAlert({
                type: 'success',
                message: 'Successfully deleted ' + data.email_name + '.',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)
            setId("")
            triggerFetch()
        } catch (error) {
            console.error('Error delete data:', error)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        handleDelete(id)
    }

    return (
        <ModalDelete
            modalLabel={modalLabel}
            size="sm"
            text="template"
            modalState={modalState}
            handleCloseModal={() => {
                setId("")
                setModalState(false)
            }}
            handleSubmit={onSubmit}
            loading={loadingModal}
        ></ModalDelete>
    )
}

export default EmailInvitationDelete
