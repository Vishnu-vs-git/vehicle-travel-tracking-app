import Swal from "sweetalert2";

interface ConfirmDeleteOptions {
  title?: string;
  text?: string;
  onConfirm: () => void;
}

export const confirmDelete = ({
  title = "Delete Trip",
  text = "Are you sure you want to delete this trip? This action cannot be undone.",
  onConfirm,
}: ConfirmDeleteOptions) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444", // red-500
    cancelButtonColor: "#6b7280",  // gray-500
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
