import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-full">
            <FaExclamationTriangle />
          </div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 text-sm text-slate-600">
          {message}
        </div>

        {/* ACTIONS */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-500 disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
