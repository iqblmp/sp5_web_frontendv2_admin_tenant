'use client'

import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import ButtonDropdown from '@/components/ButtonDropdown'
import Table from '@/components/Table'
import ModalDelete from '@/components/ModalDelete'
import Alert from '@/components/Alert'
import axiosClient from '@/utils/axiosClient'
import dayjs from 'dayjs'
import Button from '@/components/Button'

const GroupView = ({
    groupId,
    content,
    modalLabel,
    modalState,
    loading,
    setModalState,
    updateDataCandidate,
}) => {
    const [loadingModal, setLoadingModal] = useState(false)
    const [modalStateView, setModalStateView] = useState(false)
    const [modalStateDelete, setModalStateDelete] = useState(false)
    const [detail, setDetail] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [dataAlertModal, setDataAlertModal] = useState({
        type: '',
        message: '',
    })

    useEffect(() => {
        console.log('Group Id:', groupId)
    }, [groupId])

    const changeModalStateView = (id) => {
        getCandidateTest(id)
        setModalStateView(!modalStateView)
    }
    const changeModalStateDelete = (id) => {
        setSelectedId(id)
        setModalStateDelete(!modalStateDelete)
    }

    const candidateView = 'candidate-view'
    const candidateDelete = 'candidate-delete'

    const getCandidateTest = async (id) => {
        setLoadingModal(true)
        try {
            const res = await axiosClient.get(`/test/candidate/${id}`)
            const response = res.data.data.data
            setDetail(response)
            setLoadingModal(false)
        } catch (err) {
            console.err
            setLoadingModal(false)
        }
    }

    const trigger = (id) => {
        // getCandidateTest(id)
    }

    const handleDelete = async (selectedId) => {
        try {
            setLoadingModal(true)
            const response = await axiosClient.delete(
                `/candidate/` + selectedId
            )
            setDataAlertModal({
                type: 'success',
                message: 'Successfully Delete Candidate data',
            })
            setShowAlertModal(true)
            setModalStateDelete(false)
            setLoadingModal(false)
            trigger()
        } catch (error) {
            console.error('Error delete data:', error)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        handleDelete(selectedId)
        updateDataCandidate()
    }

    const generateAction = (data) => {
        return (
            <div className="flex justify-center">
                <ButtonDropdown
                    text="Action"
                    icon="fa fa-list-alt"
                    color="primary"
                    size="xs"
                    actionList={[
                        {
                            text: 'View',
                            icon: 'fa fa-search-plus',
                            onClick: () => {
                                changeModalStateView(data.id)
                            },
                        },
                        {
                            text: 'Delete',
                            icon: 'fa fa-trash-o',
                            onClick: () => {
                                changeModalStateDelete(data.id)
                            },
                        },
                    ]}
                />
            </div>
        )
    }
    const headerDetail = [
        {
            type: 'text',
            name: 'Name',
            label: 'candidate_name',
            width: 'center',
        },
        {
            type: 'text',
            name: 'Username',
            label: 'username',
            align: 'center',
        },
        {
            type: 'text',
            name: 'Password',
            label: 'password',
            align: 'center',
            order: false,
        },
        {
            type: 'html',
            name: 'Expiry Date',
            label: 'expire_date',
            render: (data) => {
                const date = dayjs(
                    data.expire_date,
                    'DD-MMM-YYYY HH:mm'
                ).format('DD-MMM-YYYY HH:mm')
                return (
                    <div className="text-wrap text-center">
                        {data.expire_date == null ? '-' : date}
                    </div>
                )
            },
        },
        {
            type: 'html',
            name: 'Completion Date',
            label: 'completion_date',
            render: (data) => {
                const date = dayjs(
                    data.completion_date,
                    'DD-MMM-YYYY HH:mm'
                ).format('DD-MMM-YYYY HH:mm')
                return (
                    <div className="text-wrap text-center">
                        {data.completion_date == null ? '-' : date}
                    </div>
                )
            },
        },
        {
            type: 'action',
            name: 'Invitation Status',
            generateAction: (data) => (
                <div className="flex justify-center">
                    <Button
                        text={`${
                            data.invitation_status == 0 ? 'Not Sent' : 'Sent'
                        }`}
                        size="xs"
                        color={`${
                            data.invitation_status == 0 ? 'error' : 'primary'
                        }`}
                        icon={`${
                            data.invitation_status == 0
                                ? 'fa fa-exclamation-circle'
                                : 'fa fa-envelope-o'
                        }`}
                        colorStyle={`${
                            data.invitation_status == 0 ? 'outline' : 'solid'
                        }`}
                    />
                </div>
            ),
        },
        {
            type: 'action',
            name: 'Status Progress',
            generateAction: (data) => {
                const text = data.status_progress_text
                const status_progress = data.status_progress
                let color = ''
                let icon = ''
                switch (status_progress) {
                    case '0':
                        // Not Log In
                        color = 'secondary'
                        icon = 'fa fa-key'
                        break
                    case '1':
                        // On Progress
                        color = 'primary'
                        icon = 'fa fa-clock-o'
                        break
                    case '2':
                        // Complete
                        color = 'success'
                        icon = 'fa fa-check-circle'
                        break
                    case '3':
                        // Expired
                        color = 'error'
                        icon = 'fa fa-times'
                        break
                    case '4':
                        // Incomplete
                        color = 'warning'
                        icon = 'fa fa-minus-circle'
                }

                return (
                    <div className="flex justify-center">
                        <Button
                            text={text}
                            icon={icon}
                            color={color}
                            size="xs"
                        />
                    </div>
                )
            },
        },
        {
            type: 'action',
            name: 'Action',
            generateAction,
        },
    ]
    const headerCandidateTest = [
        {
            type: 'text',
            name: 'Test Name',
            label: 'test_name',
            width: 'full',
        },
        {
            type: 'text',
            name: 'Status Progress',
            label: 'status_progress',
            align: 'center',
        },
    ]

    return (
        <Modal
            modalLabel={modalLabel}
            size="lg"
            header={content}
            modalState={modalState}
            handleCloseModal={() => setModalState(false)}
            loading={loading}
        >
            <Alert
                type={dataAlertModal.type}
                message={dataAlertModal.message}
                flag={showAlertModal}
                setFlag={setShowAlertModal}
            />
            <Table
                dataSource={`${process.env.API_URL}/candidate-group/candidate-list/${groupId}`}
                header={headerDetail}
                enableDateRange={true}
                triggerFetch={groupId}
            />
            <Modal
                modalLabel={candidateView}
                header="Test List"
                size="md"
                loading={loadingModal}
                modalState={modalStateView}
                handleCloseModal={() => setModalStateView(false)}
            >
                <Table
                    dataTable={detail}
                    header={headerCandidateTest}
                    enableLimit={false}
                    enableSearch={false}
                    enablePagination={false}
                    enableSort={false}
                />
            </Modal>
            <ModalDelete
                modalLabel={candidateDelete}
                size="sm"
                text="Candidate"
                modalState={modalStateDelete}
                handleCloseModal={() => setModalStateDelete(false)}
                handleSubmit={onSubmit}
                loading={loadingModal}
            ></ModalDelete>
        </Modal>
    )
}

export default GroupView
