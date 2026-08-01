import {
  FiSend,
  FiPaperclip,
  FiX,
  FiFile,
} from "react-icons/fi";

export default function ChatInput({
  message,
  setMessage,
  handleSendMessage,
  handleFileChange,
  filePreview,
  selectedFile,
  removeFile,
  fileInputRef,
}) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t bg-white p-4">

      {/* Attachment Preview */}

      {selectedFile && (
        <div className="mb-3 bg-slate-100 rounded-xl p-3 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {filePreview ? (
              <img
                src={filePreview}
                alt="preview"
                className="w-20 h-20 rounded-lg object-cover border"
              />
            ) : (
              <div className="flex items-center gap-2">
                <FiFile className="text-2xl text-red-500" />
                <span className="text-sm font-medium">
                  {selectedFile.name}
                </span>
              </div>
            )}

          </div>

          <button
            onClick={removeFile}
            className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
          >
            <FiX />
          </button>

        </div>
      )}

      {/* Input */}

      <div className="flex items-center gap-3">

        {/* Attachment */}

        <label
          htmlFor="chat-file"
          className="cursor-pointer text-teal-700 hover:text-teal-900 text-2xl"
        >
          <FiPaperclip />
        </label>

        <input
          id="chat-file"
          type="file"
          hidden
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
          onChange={handleFileChange}
        />

        {/* Message */}
<textarea
  rows={1}
  value={message}
  onChange={(e) => {
    setMessage(e.target.value);

    
  }}
  onKeyDown={onKeyDown}
  placeholder="Type a message..."
  className="flex-1 resize-none rounded-full px-5 py-3 outline-none
  bg-[#202c33] text-white placeholder-gray-400
  border border-transparent focus:border-[#00a884]"
/>

        {/* Send */}

        <button
          onClick={handleSendMessage}
          className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition"
        >
          <FiSend size={18} />
        </button>

      </div>
    </div>
  );
}