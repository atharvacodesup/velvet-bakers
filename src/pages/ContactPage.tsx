import { useForm } from "react-hook-form";
import { useState } from "react";
import { BUSINESS } from "@/config/business";
import BackButton from "@/components/ui/BackButton";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiAlertCircle } from "react-icons/fi";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    console.log("Contact form:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    reset();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all";

  return (
    <main className="pt-24 pb-32">
      <div className="section-container">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            Get In Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question or want to place a bulk order? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="card-bakery p-6 md:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-accent text-2xl" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-4">We will get back to you soon.</p>
                <button onClick={() => setSent(false)} className="btn-gold text-sm">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={4}
                    className={inputClass}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.message.message}
                    </p>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-3 disabled:opacity-60">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info & Map */}
          <div className="space-y-6">
            <div className="card-bakery p-6 space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 shrink-0" />
                <p className="text-sm text-foreground">{BUSINESS.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="text-sm text-foreground hover:text-primary transition-colors">
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-foreground hover:text-primary transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-primary mt-1 shrink-0" />
                <div className="text-sm text-foreground">
                  {BUSINESS.hours.map((h) => (
                    <p key={h.day}>{h.day}: {h.time}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Velvet Cake and Bakery location"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
