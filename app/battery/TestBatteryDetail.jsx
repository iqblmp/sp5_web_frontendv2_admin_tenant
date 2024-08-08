import Modal from '@/components/Modal'
import Table from '@/components/Table'
import { useState } from 'react'

export default function TestBatteryDetail({
    state,
    setState,
    batteryLabel,
    loadingModal,
    dataTest,
}) {
    const [imageSrc, setImageSrc] = useState('')

    const sampleModalLabel = 'test-battery-sample-modal'

    const headerDetail = [
        {
            type: 'html',
            name: 'Test Name',
            width: 'full',
            align: 'center',
            render: (data) => {
                return (
                    <div className="flex justify-center">
                        <label
                            className="text-[#054c97] hover:text-[#448aff] cursor-pointer"
                            htmlFor={sampleModalLabel}
                            onClick={() => {
                                setImageSrc(
                                    `${process.env.API_URL}/test/sample/${data.id_test}`
                                )
                            }}
                        >
                            {data.test_name}
                        </label>
                    </div>
                )
            },
        },
        {
            type: 'html',
            name: 'Test Time',
            label: 'total_time_text',
            width: 'full',
            align: 'center',
            render: (data) => {
                return (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.total_time_text,
                        }}
                    />
                )
            },
        },
    ]
    return (
        <>
            <Modal
                modalState={state}
                header={batteryLabel}
                size="md"
                loading={loadingModal}
                handleCloseModal={() => setState(false)}
            >
                <Table
                    dataTable={dataTest}
                    header={headerDetail}
                    enableLimit={false}
                    enableSearch={false}
                    enablePagination={false}
                    enableSort={false}
                />
            </Modal>
            <Modal
                header="Sample Question"
                modalLabel={sampleModalLabel}
                size="md"
            >
                <div className="flex justify-center">
                    <img src={imageSrc} alt="sample image" />
                </div>
            </Modal>
        </>
    )
}
