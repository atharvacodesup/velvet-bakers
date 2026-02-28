import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
  label?: string;
}

/** Reusable back button for inner pages */
const BackButton = ({ label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-velvet-light transition-colors mb-6"
      aria-label="Go back"
    >
      <FiArrowLeft /> {label}
    </button>
  );
};

export default BackButton;
