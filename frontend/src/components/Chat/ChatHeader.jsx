import { FiUser, FiMenu } from "react-icons/fi";

export default function ChatHeader({
  currentClient,
  onBack,
}) {

  return (
    <div className="h-16 bg-teal-700 text-white flex items-center justify-between px-5 shadow-md">
      

      {/* Left */}

        <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          onClick={onBack}
          className="md:hidden p-1"
        >
          <FiMenu size={24} />
        </button>

        <div className="w-11 h-11 rounded-full bg-white text-teal-700 flex items-center justify-center text-lg font-bold">
          {currentClient ? (
            currentClient.name?.charAt(0).toUpperCase()
          ) : (
            <FiUser size={20} />
          )}
        </div>

        <div>
          <h2 className="font-semibold text-lg">
            {currentClient
              ? currentClient.name
              : "Select a Conversation"}
          </h2>
        </div>

      
      </div>

      {/* Right */}

   
      {currentClient && (
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

          <span className="text-sm text-teal-100">
            Active
          </span>
        </div>
      )}
    </div>
  );
}