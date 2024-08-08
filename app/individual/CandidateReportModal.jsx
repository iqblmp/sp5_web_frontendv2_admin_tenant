import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import axiosClient from '@/utils/axiosClient'
import { getCookie, hasCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

export default function CandidateReportModal({
    modalState,
    setModalState,
    selectedId,
    reportType,
}) {
    const [loadingModal, setLoadingModal] = useState(false)
    const [listTest, setListTest] = useState([])
    const [listReport, setListReport] = useState([])
    const [listNorm, setListNorm] = useState([])
    const [listButtonGenerate, setListButtonGenerate] = useState([])
    const [listButtonDownload, setListButtonDownload] = useState([])

    let client_id = 0
    if (hasCookie('jwt')) {
        const token = getCookie('jwt')
        const data = jwtDecode(token)
        client_id = data.data.client.id
    }

    useEffect(() => {
        setLoadingModal(true)
        if (modalState) {
            axiosClient
                .get(`/candidate/report-standard/${selectedId}/${client_id}`)
                .then((res) => {
                    const data = res.data.data
                    const listTest = []
                    const listReport = []
                    const listNorm = []
                    const listButtonGenerate = []
                    const listButtonDownload = []
                    Object.keys(data.report_label).forEach((item, index) => {
                        listReport.push('')

                        if (
                            data.report_norm[item] &&
                            data.report_norm[item].length > 0
                        )
                            listNorm.push('')
                        else listNorm.push(null)

                        listButtonGenerate.push(false)
                        listButtonDownload.push(null)

                        listTest.push({
                            index: index,
                            test_code: item,
                            test_name: data.report_label[item],
                            test_report: data.report_name[item].map(
                                (value, key) => ({
                                    report_code: data.report_code[item][key],
                                    report_name: value,
                                })
                            ),
                            norm: data.report_norm[item],
                        })
                    })

                    setListTest(listTest)
                    setListReport(listReport)
                    setListNorm(listNorm)
                    setListButtonGenerate(listButtonGenerate)
                    setListButtonDownload(listButtonDownload)
                    setLoadingModal(false)
                })
                .catch((err) => {
                    console.error(err)
                    setLoadingModal(false)
                })
        }
    }, [modalState, selectedId])

    const handleChangeDropdown = (type, value, index) => {
        const listButton = [...listButtonGenerate]
        const report = [...listReport]
        const norm = [...listNorm]
        if (type === 'report') {
            report[index] = value
            if (norm[index] === null || norm[index] !== '')
                listButton[index] = true
            setListReport(report)
        } else if (type === 'norm') {
            norm[index] = value
            if (report[index] !== '') listButton[index] = true
            setListNorm(norm)
        }
        setListButtonGenerate(listButton)
    }

    const handleClickGenerate = (index) => {
        const listButton = [...listButtonDownload]
        if (!listButton[index]) {
            setLoadingModal(true)
            axiosClient
                .get(`/candidate/report-lang/${client_id}/${listReport[index]}`)
                .then((res) => {
                    const data = res.data.data
                    const result = []
                    data &&
                        data.forEach((item) => {
                            if (item.language === 'indonesia')
                                result.push('IND')
                            else if (item.language === 'english')
                                result.push('ENG')
                        })
                    listButton[index] = result
                    setListButtonDownload(listButton)
                    setLoadingModal(false)
                })
                .catch((err) => {
                    console.error(err)
                    setLoadingModal(false)
                })
        }
    }

    const handleClickDownload = (type, index) => {
        const test_code = listTest[index].test_code
        const report_code = listReport[index]
        const norm_code = listNorm[index]

        // TODO: call download link
    }

    const helperReset = () => {
        setListTest([])
        setListReport([])
        setListNorm([])
        setListButtonGenerate([])
        setListButtonDownload([])
    }

    const header = [
        {
            type: 'text',
            name: 'Test Name',
            label: 'test_name',
            align: 'center',
        },
        {
            type: 'action',
            name: 'Report Name',
            generateAction: (data) => {
                return (
                    <select
                        className="input input-sm max-w-full input-ghost-primary"
                        value={listReport[data.index] || ''}
                        onChange={(e) =>
                            handleChangeDropdown(
                                'report',
                                e.target.value,
                                data.index
                            )
                        }
                    >
                        <option value="">-</option>
                        {data.test_report.map((item) => (
                            <option
                                key={item.report_code}
                                value={item.report_code}
                            >
                                {item.report_name}
                            </option>
                        ))}
                    </select>
                )
            },
        },
        {
            type: 'action',
            name: 'Norm',
            generateAction: (data) => {
                if (listNorm[data.index] === null) {
                    return <div>-</div>
                }
                return (
                    <select
                        className="input input-sm max-w-full input-ghost-primary"
                        value={listNorm[data.index] || ''}
                        onChange={(e) =>
                            handleChangeDropdown(
                                'norm',
                                e.target.value,
                                data.index
                            )
                        }
                    >
                        <option value="">-</option>
                        {Array.isArray(data.norm) &&
                            data.norm.map((item) => (
                                <option
                                    key={item.norm_code}
                                    value={item.norm_code}
                                >
                                    {item.norm_name}
                                </option>
                            ))}
                    </select>
                )
            },
        },
        {
            type: 'action',
            name: 'Generate',
            generateAction: (data) => {
                return (
                    <Button
                        icon="fa fa-file-text"
                        text="Generate"
                        disabled={!listButtonGenerate[data.index]}
                        size="sm"
                        color="success"
                        onClick={() => handleClickGenerate(data.index)}
                    />
                )
            },
        },
        {
            type: 'action',
            name: 'Download',
            generateAction: (data) => {
                if (listButtonDownload[data.index]) {
                    return (
                        <div className="flex gap-2">
                            {listButtonDownload[data.index].map((item) => (
                                <Button
                                    key={`${data.test_code}-${item}`}
                                    icon="fa fa-download"
                                    text={item}
                                    size="sm"
                                    color="primary"
                                    onClick={() =>
                                        handleClickDownload(item, data.index)
                                    }
                                />
                            ))}
                        </div>
                    )
                }
                return null
            },
        },
    ]

    const helperGetTitle = (report_type) => {
        switch (reportType) {
            case 'standard_individual':
                return 'Standard Individual Report'
            case 'custom_individual':
                return 'Custom Individual Report'
            case 'standard_summary':
                return 'Standard Summary Report'
            case 'custom_summary':
                return 'Custom Summary Report'
            case 'interview_response':
                return 'Get Written Interview Response'
        }
    }

    const modalHeader = helperGetTitle(reportType)

    return (
        <Modal
            header={modalHeader}
            modalState={modalState}
            handleCloseModal={() => {
                setModalState(false)
                helperReset()
            }}
            size="lg"
            loading={loadingModal}
        >
            {listTest.length > 0 && reportType === 'standard_individual' ? (
                <Table
                    dataTable={listTest}
                    header={header}
                    enableLimit={false}
                    enableSearch={false}
                    enablePagination={false}
                    enableSort={false}
                />
            ) : (
                <>
                    <div className="text-center text-red-500">
                        <i className="fa fa-frown-o mr-2"></i>
                        <i className="fa fa-frown-o mr-2"></i>
                        <i className="fa fa-frown-o"></i>
                    </div>
                    <div className="text-center text-red-500">
                        No {modalHeader} available
                    </div>
                </>
            )}
        </Modal>
    )
}
