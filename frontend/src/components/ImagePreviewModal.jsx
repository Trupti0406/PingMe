export const ImagePreviewModal = ({ file, isOpen, onClose, onSend }) => {
  if (!isOpen || !file) return null;

  const fileUrl = URL.createObjectURL(file);
  const isPdf = file.type === "application/pdf";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-3xl shadow-lg modal-box">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {isPdf ? "PDF Preview" : "Image Preview"}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost font-bold text-2xl">
            &times;
          </button>
        </div>

        {/* Form for handling submission */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center">
          {isPdf ? (
            <embed
              src={fileUrl}
              type="application/pdf"
              width="400px"
              height="500px"
            />
          ) : (
            <img src={fileUrl} alt="Preview" className="w-72 h-72 mb-4" />
          )}
          <div className="form-control mt-2">
            <button
              type="submit"
              className="btn bg-purple-300 hover:bg-purple-400 w-72 m-auto font-bold text-lg">
              Send File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
