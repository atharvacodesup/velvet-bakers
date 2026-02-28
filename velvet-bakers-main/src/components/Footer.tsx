import { Link } from "react-router-dom";
import { BUSINESS } from "@/config/business";
import { GiCupcake } from "react-icons/gi";
import { FiInstagram, FiFacebook, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="section-container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <GiCupcake className="text-accent text-2xl" />
            <span className="font-serif text-xl font-bold">{BUSINESS.name}</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            {BUSINESS.tagline}. Freshly baked with love since {BUSINESS.yearEstablished}.
          </p>
          <p className="text-xs mt-3 opacity-60">{BUSINESS.fssai}</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {[
              { label: "Home", to: "/" },
              { label: "Our Cakes", to: "/menu" },
              { label: "Custom Order", to: "/custom-order" },
              { label: "Gallery", to: "/gallery" },
              { label: "Reviews", to: "/reviews" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-1 shrink-0" /> {BUSINESS.address}
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0" />
              <a href={`tel:${BUSINESS.phone}`} className="hover:text-accent transition-colors">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-accent transition-colors">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Opening Hours</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {BUSINESS.hours.map((h) => (
              <li key={h.day}>
                <span className="font-medium">{h.day}:</span> {h.time}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-4">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram className="text-xl hover:text-accent transition-colors" />
            </a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FiFacebook className="text-xl hover:text-accent transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. | Built with love in Kolhapur.
      </div>
    </div>
  </footer>
);

export default Footer;
