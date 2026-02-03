import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";

export default function AlertToast({
  open,
  type = "success", // success | error
  message,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-70">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold
          ${isSuccess ? "bg-green-600 text-white" : "bg-red-600 text-white"}
        `}
      >
        {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
        {message}
      </div>
    </div>
  );
}
