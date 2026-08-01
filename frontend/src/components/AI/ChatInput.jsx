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
  loading,
}) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl p-5">

      {/* File Preview */}

      {selectedFile && (
        <div className="mb-4 flex items-center justify-between rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-3">

          <div className="flex items-center gap-3">

            <FiFile className="text-cyan-300 text-xl" />

            <div>

              <p className="text-white font-medium">

                {selectedFile.name}

              </p>

              <p className="text-xs text-gray-400">

                {(selectedFile.size / 1024).toFixed(2)} KB

              </p>

            </div>

          </div>

          <button
            onClick={removeFile}
            className="text-red-400 hover:text-red-300"
          >
            <FiX size={18} />
          </button>

        </div>
      )}

      {/* Input */}

      <div className="flex items-end gap-3">

        {/* Upload */}

        <button
          onClick={() => fileInputRef.current.click()}
          className="
          h-12
          w-12
          rounded-xl
          bg-white/10
          hover:bg-white/20
          flex
          items-center
          justify-center
          text-cyan-300
          transition"
        >

          <FiPaperclip size={20} />

        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Text Area */}

        <textarea
          rows={1}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            e.target.style.height = "auto";
            e.target.style.height =
              e.target.scrollHeight + "px";
          }}
          onKeyDown={onKeyDown}
          placeholder="Describe your legal issue..."
          className="
          flex-1
          resize-none
          max-h-40
          rounded-xl
          bg-white/10
          border
          border-white/10
          px-4
          py-3
          text-white
          placeholder-gray-400
          outline-none
          focus:border-cyan-500"
        />

        {/* Send */}

        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="
          h-12
          w-12
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          hover:scale-105
          disabled:opacity-50
          transition
          flex
          items-center
          justify-center
          text-white"
        >

          <FiSend size={20} />

        </button>

      </div>

      {/* Footer */}

      <div className="mt-3 text-xs text-gray-400">

        Press <span className="text-cyan-300">Enter</span> to send •{" "}
        <span className="text-cyan-300">Shift + Enter</span> for a new line

      </div>

    </div>
  );
}