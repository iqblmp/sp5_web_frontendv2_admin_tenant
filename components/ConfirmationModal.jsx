"use client"

import Button from "./Button"

export default function ConfirmationModal({
  loading, // bool (state)
  modalState, // bool (state)

  modalLabel, // string
  text, // string
  smallText, //string

  handleSubmit, // function (onClick)
  handleCloseModal, // function (onClick)
}) {
  return (
    <>
      <input
        className="modal-state bg-primary"
        id={modalLabel}
        type="checkbox"
        checked={modalState}
        onChange={() => {}}
      />
      <div className="modal overflow-y-auto items-start p-4">
        <label className="modal-overlay" htmlFor={modalLabel}></label>
        <div className="modal-content max-w-full p-0 flex flex-col overflow-visible max-h-max w-[500px]">
          <div className="px-5 mb-2">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="spinner-dot-pulse">
                  <div className="spinner-pulse-dot"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col  pt-4 text-background items-center font-semibold ">
                <span
                  style={{ fontSize: "70px" }}
                  className="text-7xl text-[#f8bb86] "
                >
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                </span>
                <h1 className="text-center text-2xl">{text}</h1>
                <h3 className="text-center text-base">{smallText}</h3>
              </div>
            )}
          </div>
          <div className="divider my-0"></div>
          <div className="flex gap-3 justify-end p-5 pt-2">
            <Button
              text="No"
              icon="fa fa-ban"
              color="error"
              htmlFor={modalLabel}
              onClick={handleCloseModal}
              disabled={loading}
            />
            <Button
              text="Yes"
              icon="fa fa-check-circle"
              color="primary"
              htmlFor={modalLabel}
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}
