export default function LoadingPage() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <div className="spinner-dot-circle spinner-xl spinner-primary">
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
    </div>
  )
}
