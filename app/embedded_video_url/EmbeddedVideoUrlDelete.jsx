import React, { useState } from 'react'
import ModalDelete from '@/components/ModalDelete'
import axiosClient from '@/utils/axiosClient'

const EmbeddedVideoUrlDelete = ({
    id,
    modalLabel,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    setId,
    triggerFetch,
}) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const handleDelete = async (id) => {
        try {
            setLoadingModal(true)
            const response = await axiosClient.delete(`/embedded-vidio-url/` + id)
            setDataAlert({
                type: 'success',
                message: 'Successfully deleted embedded video URL.',
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
            text="embedded video URL"
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

export default EmbeddedVideoUrlDelete
