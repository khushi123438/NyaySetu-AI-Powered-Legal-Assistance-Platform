import { FiMessageCircle } from "react-icons/fi";

export default function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 px-6">

      <div className="w-28 h-28 rounded-full bg-teal-100 flex items-center justify-center mb-6">

        <FiMessageCircle
          size={60}
          className="text-teal-700"
        />

      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Welcome to NyaySetu Chat
      </h2>

      <p className="text-slate-500 text-center max-w-md leading-7">
        Select an advocate or client from the left sidebar to start chatting.
      </p>

      <div className="mt-10 bg-white shadow rounded-xl p-5 max-w-md w-full">

        <h3 className="font-semibold text-slate-700 mb-3">
          Features
        </h3>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>✅ Real-time conversation (Polling)</li>
          <li>✅ Image sharing</li>
          <li>✅ PDF sharing</li>
          <li>✅ Delete messages</li>
          <li>✅ Delete complete chat</li>
          <li>✅ Secure booking-wise chat</li>
        </ul>

      </div>

    </div>
  );
}