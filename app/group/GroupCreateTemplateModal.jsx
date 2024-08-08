import Alert from '@/components/Alert'
import Button from '@/components/Button'
import DateTime from '@/components/DateTime'
import Modal from '@/components/Modal'
import axiosClient from '@/utils/axiosClient'
import { useState } from 'react'
import moment from 'moment'

export default function GroupCreateTemplateModal({
    modalState,
    setModalState,
}) {
    const [numberOfCandidate, setNumberOfCandidate] = useState(1)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [xmlFileUrl, setXmlFileUrl] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [errorFieldList, setErrorFieldList] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [dataAlert, setDataAlert] = useState({
        type: '',
        message: '',
    })

    const handleCreateTemplate = () => {
        const tempErrorList = []
        if (startDate === '') tempErrorList.push('start_date')
        if (endDate === '') tempErrorList.push('end_date')

        setErrorFieldList(tempErrorList)
        if (tempErrorList.length !== 0) {
            return
        }

        setLoadingModal(true)
        axiosClient
            .get(`/candidate-group/excel/generate`, {
                params: {
                    number: numberOfCandidate,
                    start: startDate,
                    expire: endDate,
                },
                responseType: 'blob',
            })
            .then((res) => {
                const blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    name: 'template-new-candidate.xlsx',
                })

                const file = new File([blob], 'template-new-candidate.xlsx', {
                    type: blob.type,
                })

                const url = URL.createObjectURL(file)
                setXmlFileUrl(url)
                setLoadingModal(false)
            })
            .catch(() => {
                setLoadingModal(false)
                setDataAlert({
                    type: 'error',
                    message: 'Failed to generate excel',
                })
                setShowAlert(true)
            })
    }

    return (
        <Modal
            modalState={modalState}
            header="New Group Template"
            handleCloseModal={() => setModalState(false)}
            handleSubmit={handleCreateTemplate}
            buttonSubmitText="Generate Template"
            loading={loadingModal}
            size="md"
        >
            <Alert
                type={dataAlert.type}
                message={dataAlert.message}
                flag={showAlert}
                setFlag={setShowAlert}
            />
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="form-field">
                        <label className="form-label">No. of Candidate</label>
                        <input
                            type="number"
                            min={1}
                            className="input input-sm max-w-full"
                            value={numberOfCandidate}
                            onChange={(e) =>
                                setNumberOfCandidate(e.target.value)
                            }
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-label">Login - Start</label>
                        <DateTime
                            value={startDate}
                            placeholder="Login - Start"
                            className="input input-sm max-w-full"
                            onChange={(val) => {
                                setStartDate(val)
                                if (
                                    moment(val).isSameOrAfter(moment(endDate))
                                ) {
                                    setEndDate(val)
                                }
                            }}
                            min={moment()}
                        />
                        {errorFieldList.find(
                            (item) => item === 'start_date'
                        ) && (
                            <label className="form-label">
                                <span className="form-label-alt text-error">
                                    The login start field is required
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Login - Finish</label>
                        <DateTime
                            value={endDate}
                            placeholder="Login - Finish"
                            className="input input-sm max-w-full"
                            onChange={(val) => {
                                setEndDate(val)
                            }}
                            min={startDate || moment()}
                        />
                        {errorFieldList.find((item) => item === 'end_date') && (
                            <label className="form-label">
                                <span className="form-label-alt text-error">
                                    The login finish field is required
                                </span>
                            </label>
                        )}
                    </div>
                </div>
                {xmlFileUrl && (
                    <div className="flex flex-col items-center gap-2">
                        <div>
                            Template generated, please download the file below.
                        </div>
                        <a
                            href={xmlFileUrl}
                            download="template-new-candidate.xlsx"
                        >
                            <Button
                                text="Download Template"
                                icon="fa fa-download"
                                color="success"
                            />
                        </a>
                    </div>
                )}
            </div>
        </Modal>
    )
}
