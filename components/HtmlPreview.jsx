const HtmlPreview = ({ source }) => {
    return (
        <div className="flex flex-col max-h-screen overflow-auto">
            <div className="p-5">
                <div dangerouslySetInnerHTML={{ __html: source }} />
            </div>
        </div>
    )
}

export default HtmlPreview
