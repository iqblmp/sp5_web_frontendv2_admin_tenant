import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import axiosClient from '@/utils/axiosClient'
import { useEffect, useState } from 'react'

export default function CandidateTestListModal({
    selectedId,
    setSelectedId,
    modalState,
    setModalState,
}) {
    const [loadingModal, setLoadingModal] = useState(false)
    const [testList, setTestList] = useState([])

    useEffect(() => {
        if (selectedId) {
            setLoadingModal(true)
            axiosClient
                .get(`/test/candidate/${selectedId}`)
                .then((res) => {
                    setTestList(res.data.data || [])
                    setLoadingModal(false)
                })
                .catch(() => {
                    setLoadingModal(false)
                })
        }
    }, [selectedId])

    const header = [
        {
            type: 'text',
            name: 'Test Name',
            label: 'test_name',
            width: 'full',
            align: 'center',
        },
        {
            type: 'action',
            name: 'Status Progress',
            generateAction: (data) => {
                let text = ''
                let color = ''
                let icon = ''
                switch (data.status_progress) {
                    case 0:
                        text = 'Not Started'
                        color = 'error'
                        icon = 'fa fa-minus-circle'
                        break
                    case 1:
                        text = 'On Progress'
                        color = 'primary'
                        icon = 'fa fa-pencil-square-o'
                        break
                    case 2:
                        text = 'Complete'
                        color = 'success'
                        icon = 'fa fa-check-circle'
                        break
                    default:
                        text = 'Not Started'
                        color = 'error'
                        icon = 'fa fa-minus-circle'
                        break
                }
                return (
                    <div className="w-full">
                        <Button
                            text={text}
                            icon={icon}
                            color={color}
                            size="xs"
                            block={true}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <Modal
            header="Test List"
            modalState={modalState}
            size="md"
            handleCloseModal={() => {
                setModalState(false)
                setSelectedId(null)
            }}
            loading={loadingModal}
        >
            <Table
                dataTable={testList}
                header={header}
                enableLimit={false}
                enableSearch={false}
                enablePagination={false}
                enableSort={false}
            />
        </Modal>
    )
}
