import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiDownload, FiPrinter, FiShoppingBag, FiMessageCircle } from "react-icons/fi";
import { BUSINESS } from "@/config/business";
import BackButton from "@/components/ui/BackButton";
import type { MenuItem } from "@/data/menu";

interface CartEntry extends MenuItem {
  qty: number;
}

const getCart = (): MenuItem[] => {
  try {
    return JSON.parse(localStorage.getItem("velvet-cart") || "[]");
  } catch {
    return [];
  }
};

const saveCart = (items: MenuItem[]) =>
  localStorage.setItem("velvet-cart", JSON.stringify(items));

/** Aggregate raw cart array into entries with qty */
const aggregate = (items: MenuItem[]): CartEntry[] => {
  const map = new Map<string, CartEntry>();
  items.forEach((item) => {
    const existing = map.get(item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      map.set(item.id, { ...item, qty: 1 });
    }
  });
  return Array.from(map.values());
};

const parsePrice = (p: string) => Number(p.replace(/,/g, ""));

const CartPage = () => {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEntries(aggregate(getCart()));
  }, []);

  const totalAmount = entries.reduce(
    (sum, e) => sum + parsePrice(e.price) * e.qty,
    0
  );

  const removeItem = (id: string) => {
    const raw = getCart().filter((i) => i.id !== id);
    saveCart(raw);
    setEntries(aggregate(raw));
  };

  const updateQty = (id: string, delta: number) => {
    const raw = getCart();
    if (delta > 0) {
      const item = entries.find((e) => e.id === id);
      if (item) raw.push({ ...item } as MenuItem);
    } else {
      const idx = raw.findIndex((i) => i.id === id);
      if (idx !== -1) raw.splice(idx, 1);
    }
    saveCart(raw);
    setEntries(aggregate(raw));
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const text = [
      `========================================`,
      `         ${BUSINESS.name}`,
      `         ORDER RECEIPT`,
      `========================================`,
      `Date: ${new Date().toLocaleString("en-IN")}`,
      `----------------------------------------`,
      ...entries.map(
        (e) =>
          `${e.name} x${e.qty}  ₹${(parsePrice(e.price) * e.qty).toLocaleString("en-IN")}`
      ),
      `----------------------------------------`,
      `TOTAL:  ₹${totalAmount.toLocaleString("en-IN")}`,
      `========================================`,
      `Phone: ${BUSINESS.phone}`,
      `Address: ${BUSINESS.address}`,
      `Thank you for ordering!`,
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `velvet-receipt-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Build WhatsApp message with full order and send to owner */
  const sendOrderViaWhatsApp = () => {
    const itemLines = entries
      .map((e) => `• ${e.name} x${e.qty} — ₹${(parsePrice(e.price) * e.qty).toLocaleString("en-IN")}`)
      .join("\n");

    const msg = encodeURIComponent(
      `🧁 *New Order — ${BUSINESS.name}*\n\n` +
        `${itemLines}\n\n` +
        `*Total: ₹${totalAmount.toLocaleString("en-IN")}*\n\n` +
        `Customer Name: ________\nPhone: ________\nPickup/Delivery Date: ________`
    );

    window.open(`https://wa.me/${BUSINESS.phoneRaw}?text=${msg}`, "_blank");
  };

  if (entries.length === 0) {
    return (
      <main className="pt-24 pb-32">
        <div className="section-container max-w-2xl text-center">
          <BackButton />
          <div className="py-20">
            <FiShoppingBag className="mx-auto text-muted-foreground mb-4" size={48} />
            <h1 className="font-serif text-2xl font-bold text-foreground mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Browse our menu and add some delicious items!
            </p>
            <Link to="/menu" className="btn-gold inline-flex items-center gap-2">
              <FiShoppingBag size={16} /> Browse Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-32">
      <div className="section-container max-w-3xl">
        <BackButton />

        {/* Receipt — print-friendly area */}
        <div
          ref={receiptRef}
          className="card-bakery p-6 md:p-10 print:shadow-none print:border print:border-foreground/20"
          id="receipt"
        >
          {/* Header */}
          <div className="text-center mb-6 border-b border-border pb-4">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              {BUSINESS.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Order Receipt</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date().toLocaleString("en-IN")}
            </p>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-6">
            <AnimatePresence>
              {entries.map((e) => (
                <motion.div
                  key={e.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-0"
                >
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-14 h-14 rounded-xl object-cover print:w-10 print:h-10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-foreground text-sm truncate">
                      {e.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{e.price} each
                    </p>
                  </div>
                  {/* Qty controls — hidden in print */}
                  <div className="flex items-center gap-2 print:hidden">
                    <button
                      onClick={() => updateQty(e.id, -1)}
                      className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold hover:bg-secondary/80"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-5 text-center text-foreground">
                      {e.qty}
                    </span>
                    <button
                      onClick={() => updateQty(e.id, 1)}
                      className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold hover:bg-secondary/80"
                    >
                      +
                    </button>
                  </div>
                  {/* Print qty */}
                  <span className="hidden print:inline text-sm text-foreground">
                    x{e.qty}
                  </span>
                  <p className="font-bold text-foreground text-sm w-20 text-right">
                    ₹{(parsePrice(e.price) * e.qty).toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => removeItem(e.id)}
                    className="text-destructive hover:text-destructive/80 print:hidden"
                    aria-label={`Remove ${e.name}`}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-primary">
            <span className="font-serif text-lg font-bold text-foreground">
              Total
            </span>
            <span className="font-serif text-xl font-bold text-primary">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
            <p>{BUSINESS.address}</p>
            <p>Phone: {BUSINESS.phone}</p>
            <p className="mt-1">Thank you for choosing {BUSINESS.name}!</p>
          </div>
        </div>

        {/* Action buttons — hidden in print */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center print:hidden">
          <button onClick={sendOrderViaWhatsApp} className="btn-gold flex items-center gap-2">
            <FiMessageCircle size={16} /> Order via WhatsApp
          </button>
          <button onClick={handlePrint} className="btn-velvet flex items-center gap-2">
            <FiPrinter size={16} /> Print Receipt
          </button>
          <button onClick={handleDownload} className="btn-outline-cream flex items-center gap-2">
            <FiDownload size={16} /> Download Receipt
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
