import { useCart } from "../components/CartContent";     
import { useNavigate } from "react-router-dom"; 
import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Montserrat', sans-serif";

const TAX_RATE   = 0.085;
const SERVICE_RATE = 0.12;

/* ─── OrderRow ─── */
const OrderRow = forwardRef(function OrderRow({ item, onIncrease, onDecrease, onRemove }, ref) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.idMeal), 320);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: removing ? 0 : 1, x: removing ? -40 : 0 }}
      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3"
      style={{
        padding: "16px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        marginBottom: "12px",
        overflow: "hidden",
      }}
    >
      {/* Top row on mobile: thumbnail + name + remove */}
      <div className="flex items-center gap-3 sm:contents">
        {/* Thumbnail */}
        <div style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 12, overflow: "hidden", position: "relative" }} className="sm:!w-16 sm:!h-16">
          <img
            src={`${item.strMealThumb}/preview`}
            alt={item.strMeal}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.88)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.strMeal}
          </p>
        </div>

        {/* Remove — shown here on mobile, moves to the end on larger screens */}
        <button
          onClick={handleRemove}
          aria-label="Remove item"
          style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            background: "transparent", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.28)", transition: "color 0.2s",
          }}
          className="sm:order-4"
          onMouseEnter={e => e.currentTarget.style.color = "#e87070"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Bottom row on mobile: qty controls + line total */}
      <div className="flex items-center justify-between sm:justify-end sm:flex-1 sm:gap-6">
        {/* Qty controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDecrease(item.idMeal)}
            aria-label="Decrease quantity"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              color: "rgba(255,255,255,0.45)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            <Minus size={13} />
          </button>

          <AnimatePresence mode="wait">
            <motion.span
              key={item.qty}
              initial={{ opacity: 0, y: 5, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)", minWidth: 20, textAlign: "center" }}
            >
              {item.qty}
            </motion.span>
          </AnimatePresence>

          <button
            onClick={() => onIncrease(item.idMeal)}
            aria-label="Increase quantity"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(200,169,126,0.1)",
              border: "1px solid rgba(200,169,126,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              color: "#c8a97e",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,126,0.22)"; e.currentTarget.style.borderColor = "rgba(200,169,126,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,169,126,0.1)"; e.currentTarget.style.borderColor = "rgba(200,169,126,0.25)"; }}
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Line total */}
        <div style={{ flexShrink: 0, textAlign: "right", minWidth: 64 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={item.qty}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ fontFamily: sans, fontSize: 15, fontWeight: 400, color: "#c8a97e", margin: 0 }}
            >
              ${(item.price * item.qty).toFixed(2)}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

/* ─── PriceLine ─── */
function PriceLine({ label, value, highlight = false, large = false }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: large ? "10px 0" : "7px 0",
    }}>
      <span style={{
        fontFamily: large ? serif : sans,
        fontSize: large ? 18 : 11,
        fontStyle: large ? "italic" : "normal",
        letterSpacing: large ? "0.02em" : "0.14em",
        textTransform: large ? "none" : "uppercase",
        color: large ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)",
        fontWeight: large ? 300 : 400,
      }}>
        {label}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: sans,
            fontSize: large ? 20 : 13,
            fontWeight: large ? 500 : 300,
            color: highlight ? "#c8a97e" : large ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── CheckOrdersPage ─── */
export default function CheckOrdersPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [checkedOut, setCheckedOut] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleIncrease = (id) =>
    setCart((p) => p.map((i) => i.idMeal === id ? { ...i, qty: i.qty + 1 } : i));

  const handleDecrease = (id) =>
    setCart((p) => p
      .map((i) => i.idMeal === id ? { ...i, qty: i.qty - 1 } : i)
      .filter((i) => i.qty > 0)
    );

  const handleRemove = (id) =>
    setCart((p) => p.filter((i) => i.idMeal !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = subtotal * TAX_RATE;
  const service  = subtotal * SERVICE_RATE;
  const total    = subtotal + tax + service;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCheckedOut(true);
      setCart([]);
    }, 1600);
  };

  /* ── Success screen ── */
  if (checkedOut) {
    return (
      <div style={{
        minHeight: "100vh", background: "#080808",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 24, padding: "40px 24px", textAlign: "center",
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
        >
          <CheckCircle size={56} style={{ color: "#c8a97e" }} strokeWidth={1.5} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: "clamp(34px,6vw,56px)", color: "rgba(255,255,255,0.9)", margin: "0 0 12px", lineHeight: 1 }}>
            Order <em style={{ color: "#c8a97e" }}>Confirmed</em>
          </h2>
          <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
            Your table will be served shortly
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          onClick={() => navigate("/menu")}
          style={{
            marginTop: 16, fontFamily: sans, fontSize: 10, letterSpacing: "0.28em",
            textTransform: "uppercase", color: "#0a0805", background: "#c8a97e",
            border: "none", padding: "14px 32px", cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#dbbf8e"}
          onMouseLeave={e => e.currentTarget.style.background = "#c8a97e"}
        >
          Back to Menu
        </motion.button>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100vh", background: "#080808", color: "white", fontFamily: sans }}
      className="flex flex-col lg:flex-row"
    >
      {/* ── LEFT: sticky summary panel ── */}
      <div
        className="relative flex-shrink-0 h-[60vw] min-h-[250px] max-h-[380px] lg:w-[40%] lg:h-screen lg:max-h-none lg:sticky lg:top-0"
      >
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85"
          alt="Restaurant"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(0,0,0,0.15) 55%)" }} />

        {/* <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 32px", textAlign: "center" }}> */}
        <div className="flex absolute inset-0 items-center justify-center flex-col text-center px-6 py-10 sm:px-10">
          <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.25)", marginBottom: 20 }} />
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
            Your Order
          </p>
          <h1
            style={{ fontFamily: serif, fontWeight: 300, fontSize: "clamp(48px,6vw,80px)", lineHeight: 0.92, textTransform: "uppercase", letterSpacing: "0.04em", color: "rgba(255,255,255,0.92)", marginBottom: 16 }}
          >
            Check<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c8a97e" }}>Order</em>
          </h1>
          <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.25)", marginTop: 4, marginBottom: 14 }} />

          {totalQty > 0 ? (
            <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              {totalQty} {totalQty === 1 ? "item" : "items"} · ${subtotal.toFixed(2)}
            </p>
          ) : (
            <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              No items yet
            </p>
          )}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, transparent, #080808)" }} className="lg:hidden" />
      </div>

      {/* ── RIGHT: order list + summary ── */}
      <div className="flex-1 lg:h-screen lg:overflow-y-auto overscroll-contain">

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(8,8,8,0.96)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button
            onClick={() => navigate("/menu")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "transparent", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.38)", transition: "color 0.2s",
              fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
          >
            <ArrowLeft size={14} />
            Back to Menu
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <ShoppingBag size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
            <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "50px 24px 120px" }} className="sm:px-10 lg:px-15">

          {/* ── Empty state ── */}
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px", textAlign: "center" }}
            >
              <ShoppingBag size={40} style={{ color: "rgba(255,255,255,0.1)", marginBottom: 20 }} strokeWidth={1} />
              <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 26, color: "rgba(255,255,255,0.2)", marginBottom: 10 }}>
                Your order is empty
              </p>
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.14)" }}>
                Add dishes from the menu
              </p>
              <button
                onClick={() => navigate("/menu")}
                style={{
                  marginTop: 32, fontFamily: sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "#c8a97e", border: "1px solid rgba(200,169,126,0.3)",
                  background: "transparent", padding: "12px 28px", cursor: "pointer", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a97e"; e.currentTarget.style.background = "rgba(200,169,126,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,169,126,0.3)"; e.currentTarget.style.background = "transparent"; }}
              >
                Browse Menu →
              </button>
            </motion.div>
          ) : (
            <>
              {/* Order items */}
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 18 }}>
                  Order Summary
                </p>
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <OrderRow
                      key={item.idMeal}
                      item={item}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Special instructions */}
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>
                  Special Instructions
                </p>
                <textarea
                  rows={3}
                  placeholder="Allergies, dietary needs, special requests…"
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, padding: "14px 16px", color: "rgba(255,255,255,0.6)", resize: "vertical", outline: "none",
                    fontFamily: serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.6,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(200,169,126,0.3)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
                />
              </div>

              {/* Price breakdown */}
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "20px 24px", marginBottom: 24,
              }}>
                <PriceLine label="Subtotal"     value={`$${subtotal.toFixed(2)}`} />
                <PriceLine label={`Service (${(SERVICE_RATE * 100).toFixed(0)}%)`} value={`$${service.toFixed(2)}`} />
                <PriceLine label={`Tax (${(TAX_RATE * 100).toFixed(1)}%)`}         value={`$${tax.toFixed(2)}`} />
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "10px 0" }} />
                <PriceLine label="Total"        value={`$${total.toFixed(2)}`} highlight large />
              </div>

              {/* Checkout button */}
              <motion.button
                onClick={handleCheckout}
                disabled={processing}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%", padding: "17px 32px",
                  background: processing ? "rgba(200,169,126,0.5)" : "#c8a97e",
                  border: "none", cursor: processing ? "default" : "pointer",
                  fontFamily: sans, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "#0a0805", fontWeight: 500,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "background 0.3s",
                }}
              >
                {processing ? (
                  <>
                    <div style={{ width: 14, height: 14, border: "2px solid rgba(10,8,5,0.35)", borderTopColor: "#0a0805", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Processing…
                  </>
                ) : (
                  <>
                    <CheckCircle size={15} />
                    Confirm Order · ${total.toFixed(2)}
                  </>
                )}
              </motion.button>

              <p style={{ textAlign: "center", marginTop: 14, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
                Your waiter will confirm the order at your table
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}