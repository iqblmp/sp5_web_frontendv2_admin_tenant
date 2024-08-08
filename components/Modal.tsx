"use client"

import Button from "./Button.tsx"

export default function Modal({
  children,
  modalLabel,
  size,
  header,
  handleSubmit,
  loading,
  modalState,
  handleCloseModal,
  buttonSubmitText,
}) {
  const mappingSize = {
    sm: "w-[500px]",
    md: "w-[800px]",
    lg: "w-[1000px]",
    xl: "w-full",
  }

  return (
    <>
      <input
        className="modal-state bg-primary"
        id={modalLabel}
        type="checkbox"
        checked={modalState}
        onChange={() => {}}
      />
      <div className="modal overflow-auto items-start p-4">
        <label className="modal-overlay -z-50 " htmlFor={modalLabel}></label>
        {modalState && (
          <div
            className={
              "bg-background rounded-md max-w-full p-0 flex flex-col overflow-visible max-h-max  " +
              (size ? `${mappingSize[size]}` : "")
            }
          >
            {header && (
              <div className="bg-background rounded-t-xl font-semibold flex justify-center p-4  border-b text-2xl text-foreground ">
                {header}
              </div>
            )}
            <div className="px-5 py-4 ">
              {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="spinner-dot-pulse">
                    <div className="spinner-pulse-dot"></div>
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
            <div className="divider my-0"></div>
            <div className="flex gap-3 justify-end p-4 pt-2 ">
              <Button
                text={handleSubmit ? "Cancel" : "Close"}
                icon="fa fa-ban"
                color="error"
                htmlFor={modalLabel}
                onClick={handleCloseModal}
                disabled={loading}
              />
              {handleSubmit && (
                <Button
                  text={buttonSubmitText || "Submit"}
                  icon="fa fa-save"
                  color="primary"
                  onClick={loading ? () => {} : handleSubmit}
                  loading={loading}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
