import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import HtmlPreview from '@/components/HtmlPreview'
import axiosClient from '@/utils/axiosClient'

const WelcomePagePreview = ({ id, modalLabel, modalState, setModalState, setSelectedId }) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const [data, setData] = useState(null)

    const handleData = async (id) => {
        try {
            setLoadingModal(true)
            const res = await axiosClient.get(`/welcome-page/` + id)
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
            header="Welcome Page Preview"
            modalState={modalState}
            handleCloseModal={() => {
                setModalState(false)
                setSelectedId(null)
            }}
            loading={loadingModal}
        >
            <HtmlPreview source={data} />
        </Modal>
    )
}

export default WelcomePagePreview
