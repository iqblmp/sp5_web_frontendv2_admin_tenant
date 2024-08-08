import React, { useState } from 'react'
import Modal from '@/components/Modal'

const BiodataRegistrationPreview = ({
    id,
    data,
    loadingModal,
    headerLabel,
    modalLabel,
    modalState,
    setModalState,
    setId,
    language = "english"
}) => {
    return (
        <Modal
            modalLabel={modalLabel}
            size="md"
            header={headerLabel}
            modalState={modalState}
            handleCloseModal={() => {
                setModalState(false)
                setId("")
            }}
            loading={loadingModal}
        >
            <div className="flex flex-col bg-slate-200">
                <div className="rounded-sm bg-white shadow-lg p-5">
                    <div>
                        {Array.isArray(data) && data.map((item) => {
                            if (item.is_required.toLowerCase() !== 'not_required') {
                                return (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6">
                                        <div
                                            className='w-full md:text-right flex items-center justify-start md:justify-end'
                                        >
                                            {item.is_required.toLowerCase() ==
                                            'mandatory' ? (
                                                <div className='w-full text-blue-800 break-words'>
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                    {item.label_alias}
                                                </div>
                                            ) : (
                                                <p className='w-full text-blue-800 break-words'>
                                                    {item.label_alias}
                                                </p>
                                            )}
                                        </div>
                                        <div className='md:col-span-2 w-full text-blue-700'>
                                            {item.field_name.toLowerCase() ==
                                            'gender' ? (
                                                <div className="flex flex-row gap-10 h-10 items-center">
                                                    <div className="flex gap-x-2 items-center">
                                                        <input
                                                            disabled
                                                            type="radio"
                                                            className="disabled:bg-white w-[20px] h-[20px] hover:cursor-default"
                                                        />
                                                        <span>
                                                            {language == "english" ? "Male" : "Laki-laki"}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-x-2 items-center">
                                                        <input
                                                            disabled
                                                            type="radio"
                                                            className="disabled:bg-white w-[20px] h-[20px] hover:cursor-default"
                                                        />
                                                        <span>
                                                            {language == "english" ? "Female" : "Perempuan"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <input
                                                    readOnly
                                                    type="text"
                                                    className="h-8 border border-blue-500 rounded-r-full rounded-l-full md:rounded-l-none border-ra w-full"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BiodataRegistrationPreview
