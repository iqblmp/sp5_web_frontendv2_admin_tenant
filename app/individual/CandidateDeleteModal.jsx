import ConfirmationModal from '@/components/ConfirmationModal'
import axiosClient from '@/utils/axiosClient'
import { useState } from 'react'

export default function CandidateDeleteModal({
    selectedId,
    setSelectedId,
    modalState,
    setModalState,
    setShowAlert,
    setDataAlert,
    triggerFunc,
}) {
    const [loadingModal, setLoadingModal] = useState(false)

    const handleDelete = () => {
        setLoadingModal(true)
        axiosClient
            .delete(`/candidate/${selectedId}`)
            .then(() => {
                setModalState(false)
                setLoadingModal(false)
                setDataAlert({
                    type: 'success',
                    message: 'Successfully deleted candidate data.',
                })
                setShowAlert(true)
                triggerFunc()
                setSelectedId(null)
            })
            .catch(() => {
                setModalState(false)
                setLoadingModal(false)
                setDataAlert({
                    type: 'error',
                    message: 'Failed to delete candidate',
                })
                setShowAlert(true)
                setSelectedId(null)
            })
    }

    return (
        <ConfirmationModal
            loading={loadingModal}
            modalState={modalState}
            text="Are you sure you want to delete this candidate?"
            handleSubmit={handleDelete}
            handleCloseModal={() => {
                setModalState(false)
                setSelectedId(null)
            }}
        />
    )
}
