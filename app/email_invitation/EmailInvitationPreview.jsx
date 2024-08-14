import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import HtmlPreview from '@/components/HtmlPreview'
import axiosClient from '@/utils/axiosClient'

const EmailInvitationPreview = ({
    id,
    modalLabel,
    modalState,
    setModalState,
    setId,
}) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const [data, setData] = useState(null)

    const handleData = async (id) => {
        try {
            setLoadingModal(true)
            const res = await axiosClient.get(`/email-invitation/` + id)
            return res
        } catch (error) {
            // todo: handle error
        }
    }

    useEffect(() => {
        if (id) {
            handleData(id).then((res) => {
                if (res) {
                    const _res = res.data.data
                    setData(_res.content)
                    setLoadingModal(false)
                }
            })
        }
    }, [id])

    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header="Email Invitation Preview"
            modalState={modalState}
            handleCloseModal={() => {
                setId("")
                setModalState(false)
            }}
            loading={loadingModal}
        >
            <HtmlPreview source={data} />
        </Modal>
    )
}

export default EmailInvitationPreview
