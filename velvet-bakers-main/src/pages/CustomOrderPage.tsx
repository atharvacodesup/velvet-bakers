import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUpload, FiCheck, FiAlertCircle } from "react-icons/fi";
import BackButton from "@/components/ui/BackButton";

interface CustomFormData {
  name: string;
  phone: string;
  eventDate: string;
  cakeSize: string;
  flavour: string;
  theme: string;
  notes: string;
}

const sizes = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg", "5 kg"];
const flavours = [
  "Chocolate Truffle",
  "Red Velvet",
  "Vanilla",
  "Butterscotch",
  "Black Forest",
  "Strawberry",
  "Mango",
  "Pineapple",
  "Mixed Fruit",
  "Coffee",
];

const CustomOrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: CustomFormData) => {
    // Build WhatsApp message with order details and send to owner
    const msg = encodeURIComponent(
      `🎂 *Custom Cake Order — Velvet Cake & Bakery*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Event Date:* ${data.eventDate || "Not specified"}\n` +
        `*Size:* ${data.cakeSize || "Not specified"}\n` +
        `*Flavour:* ${data.flavour || "Not specified"}\n` +
        `*Theme:* ${data.theme || "Not specified"}\n` +
        `*Notes:* ${data.notes || "None"}\n` +
        `${imagePreview ? "\n📷 Reference image attached separately" : ""}`
    );
    window.open(`https://wa.me/919096123495?text=${msg}`, "_blank");

    setSubmitted(true);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";
  const errorClass = "text-destructive text-xs mt-1 flex items-center gap-1";

  return (
    <main className="pt-24 pb-32">
      <div className="section-container max-w-2xl">
        <BackButton />
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Request a Custom Cake
          </h1>
          <p className="text-muted-foreground">
            Tell us your dream cake and we will make it real. Minimum 24-48 hours notice required.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <FiCheck className="text-accent text-3xl" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Order Received!</h2>
            <p className="text-muted-foreground mb-6">
              We will contact you shortly to confirm your custom cake order.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-gold">
              Place Another Order
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={inputClass}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className={errorClass}>
                    <FiAlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Contact Number *</label>
                <input
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                  })}
                  className={inputClass}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <p className={errorClass}>
                    <FiAlertCircle size={12} /> {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Event Date</label>
                <input type="date" {...register("eventDate")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cake Size</label>
                <select {...register("cakeSize")} className={inputClass}>
                  <option value="">Select size</option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Flavour</label>
                <select {...register("flavour")} className={inputClass}>
                  <option value="">Select flavour</option>
                  {flavours.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Theme / Design Description</label>
              <textarea
                {...register("theme")}
                rows={3}
                className={inputClass}
                placeholder="Describe your dream cake design..."
              />
            </div>

            <div>
              <label className={labelClass}>Upload Reference Image</label>
              <label className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border border-dashed border-border hover:border-primary transition-colors">
                <FiUpload className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {imagePreview ? "Image selected" : "Click to upload (JPG, PNG)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Reference preview"
                  className="mt-3 w-32 h-32 object-cover rounded-xl border border-border"
                />
              )}
            </div>

            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea
                {...register("notes")}
                rows={2}
                className={inputClass}
                placeholder="Any allergy info, delivery instructions, etc."
              />
            </div>

            <p className="text-xs text-muted-foreground">
              All our cakes are prepared in a hygienic FSSAI-licensed kitchen using fresh, quality ingredients.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-4 text-base disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Custom Order"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default CustomOrderPage;
