import { ReactNode } from "react";
import { X } from "lucide-react";

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-[#E4E4E1] rounded-sm ${className}`}>{children}</div>;
}

export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-[#6B6B70] mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatTile({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <AdminCard className="p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B70]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-[#8B8B90]">{sub}</p>}
    </AdminCard>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) {
  const base = "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm transition-colors disabled:opacity-50";
  const styles = {
    primary: "bg-[#16161A] text-white hover:bg-[#2A2A30]",
    secondary: "bg-white border border-[#D8D8D4] text-[#16161A] hover:border-[#16161A]",
    danger: "bg-white border border-red-300 text-red-600 hover:bg-red-50",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function AdminInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-1.5">{label}</label>}
      <input
        {...props}
        className="w-full border border-[#D8D8D4] rounded-sm px-3 py-2 text-sm outline-none focus:border-[#16161A] bg-white"
      />
    </div>
  );
}

export function AdminTextarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-1.5">{label}</label>}
      <textarea
        {...props}
        className="w-full border border-[#D8D8D4] rounded-sm px-3 py-2 text-sm outline-none focus:border-[#16161A] bg-white resize-none"
      />
    </div>
  );
}

export function AdminSelect({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: ReactNode }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-1.5">{label}</label>}
      <select {...props} className="w-full border border-[#D8D8D4] rounded-sm px-3 py-2 text-sm outline-none focus:border-[#16161A] bg-white">
        {children}
      </select>
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative bg-white rounded-sm shadow-xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4E1] sticky top-0 bg-white">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
}) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description && <p className="text-sm text-[#6B6B70] mb-6">{description}</p>}
      <div className="flex justify-end gap-3">
        <AdminButton variant="secondary" onClick={onClose}>
          Cancel
        </AdminButton>
        <AdminButton
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </AdminButton>
      </div>
    </Modal>
  );
}
