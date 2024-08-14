import Button from "./Button.tsx"

export default function ModalDelete({
  modalLabel,
  text,
  handleSubmit,
  loading,
  modalState,
  handleCloseModal,
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
        <div className="modal-content max-w-full p-0 flex flex-col overflow-visible  max-h-max w-[500px]  ">
          <div className="px-5 mb-2">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="spinner-dot-pulse">
                  <div className="spinner-pulse-dot"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pt-5 gap-y-5 items-center justify-center">
                <span className="font-semibold text-xl text-background">
                  Are you sure you want to delete this {text}?
                </span>
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
            />
            {handleSubmit && (
              <Button
                text="Yes"
                icon="fa fa-check-circle"
                color="primary"
                onClick={loading ? () => {} : handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
