import { FiTrash2, FiDownload } from "react-icons/fi";
import { getFileUrl } from "../../services/chatService";


export default function MessageBubble({
  message,
  onDelete,
}) {
 const file =
  typeof message.attachments === "string"
    ? message.attachments.trim()
    : null;

const fileUrl = file ? getFileUrl(file) : "";
  const isImage =
    file &&
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file);

  const isPDF =
    file &&
    /\.pdf$/i.test(file);

  return (
    <div
      className={`flex ${
        message.isMine
          ? "justify-end"
          : "justify-start"
      } mb-4`}
    >
      <div
        className={`relative max-w-[75%] rounded-2xl px-4 py-3 shadow

        ${
          message.isMine
            ? "bg-green-500 text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm"
        }`}
      >
        {/* Sender */}

        {!message.isMine && (
          <h4 className="font-semibold text-sm mb-1 text-teal-700">
            {message.senderName}
          </h4>
        )}

        {/* Text */}

        {message.message && (
          <p className="whitespace-pre-wrap break-words">
            {message.message}
          </p>
        )}

        {/* IMAGE */}

        {isImage && (
          <img
            src={fileUrl}
            alt="attachment"
            className="mt-3 rounded-xl max-h-72 cursor-pointer border"
            onClick={() =>
              window.open(fileUrl, "_blank")
            }
          />
        )}

        {/* PDF */}

        {isPDF && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 bg-gray-100 rounded-lg p-3 text-blue-700 hover:bg-gray-200"
          >
            <FiDownload />

            Open PDF
          </a>
        )}

        {/* OTHER FILE */}

      {fileUrl && !isImage && !isPDF && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 bg-gray-100 rounded-lg p-3 text-blue-700 hover:bg-gray-200"
          >
            <FiDownload />

            Download File
          </a>
        )}

        {/* Time */}

        <div
          className={`text-[11px] mt-2 flex justify-end

          ${
            message.isMine
              ? "text-green-100"
              : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </div>

        {/* Delete */}

        <button
          onClick={() => onDelete(message._id)}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}