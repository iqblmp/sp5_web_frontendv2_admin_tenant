import React, { useState } from 'react'
import ModalDelete from '@/components/ModalDelete'
import axiosClient from '@/utils/axiosClient'

const GroupDelete = ({
    id,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    triggerFetch,
}) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const handleDelete = async (id) => {
        try {
            setLoadingModal(true)
            const response = await axiosClient.delete(`/candidate-group/` + id)
            setDataAlert({
                type: 'success',
                message: 'Successfully Delete Group',
            })
            setShowAlert(true)
            setModalState(false)
            setLoadingModal(false)
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
            text="Group"
            modalState={modalState}
            handleCloseModal={() => setModalState(false)}
            handleSubmit={onSubmit}
            loading={loadingModal}
        ></ModalDelete>
    )
}

export default GroupDelete
