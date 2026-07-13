import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  Headphones,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useState, type ComponentType } from "react";

type PreviewMode = "catalog" | "fullscreen";

type PaymentMethod = {
  id: "card" | "wallet" | "bank";
  label: string;
  detail: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    label: "Card",
    detail: "•••• 9042",
    helper: "Your card details stay encrypted from entry to confirmation.",
    icon: CreditCard,
  },
  {
    id: "wallet",
    label: "Wallet",
    detail: "One-tap approval",
    helper: "Confirm securely with the payment method already on your device.",
    icon: WalletCards,
  },
  {
    id: "bank",
    label: "Bank transfer",
    detail: "Settle in 1–2 days",
    helper: "We will reserve your Studio workspace while the transfer clears.",
    icon: Landmark,
  },
];

export default function CheckoutConfidenceElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const compact = previewMode === "catalog";
  const reducedMotion = useReducedMotion();
  const [activePayment, setActivePayment] = useState<PaymentMethod["id"]>("card");
  const selectedPayment =
    paymentMethods.find((method) => method.id === activePayment) ?? paymentMethods[0];

  return (
    <section className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#0a0a0b] px-5 py-8 text-white sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
      <div className={`relative mx-auto w-full ${compact ? "max-w-[860px]" : "max-w-5xl"}`}>
        <header
          className={`flex items-end justify-between border-b border-white/10 ${compact ? "pb-3" : "pb-4"}`}
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Checkout confidence / 02
            </p>
            <h2
              className={`font-sans font-semibold tracking-[-0.045em] ${compact ? "mt-2 text-xl" : "mt-3 text-3xl md:text-4xl"}`}
            >
              A clear final step.
            </h2>
          </div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/28 sm:block">
            No hidden costs
          </span>
        </header>

        <div
          className={`grid gap-3 ${compact ? "mt-4 md:gap-3" : "mt-6 md:gap-5"} md:grid-cols-[0.78fr_1.22fr]`}
        >
          <aside className={`border border-white/10 bg-white/[0.018] ${compact ? "p-3.5" : "p-4"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                  Order summary
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">Studio</h3>
                <p className="mt-1 text-xs text-white/42">
                  A shared operating picture for growing teams.
                </p>
              </div>
              <span className="rounded-full border border-white/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
                Monthly
              </span>
            </div>

            <div className="mt-6 space-y-3 border-y border-white/10 py-4 text-xs">
              <div className="flex justify-between text-white/55">
                <span>Studio workspace</span>
                <span>$42.00</span>
              </div>
              <div className="flex justify-between text-white/40">
                <span>Estimated tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-sm font-medium text-white">
                <span>Due today</span>
                <span>$42.00</span>
              </div>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-white/35">
              No setup fee. You can cancel before the next billing date.
            </p>
          </aside>

          <div className={`border border-white/10 bg-white/[0.018] ${compact ? "p-3.5" : "p-4"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                  Payment method
                </p>
                <p className="mt-1 text-xs text-white/45">Choose the way that feels right.</p>
              </div>
              <LockKeyhole className="h-4 w-4 text-white/45" />
            </div>

            <div
              className="mt-4 grid grid-cols-3 gap-2"
              role="radiogroup"
              aria-label="Payment method"
            >
              {paymentMethods.map((method) => {
                const selected = method.id === activePayment;
                const Icon = method.icon;

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onPointerEnter={() => setActivePayment(method.id)}
                    onFocus={() => setActivePayment(method.id)}
                    onClick={() => setActivePayment(method.id)}
                    className="relative min-h-16 overflow-hidden border border-white/10 px-2 py-3 text-left outline-none focus-visible:border-white/55"
                  >
                    {selected && (
                      <motion.span
                        layoutId="checkout-confidence-payment"
                        className="absolute inset-0 border border-white/45 bg-white/[0.06]"
                        transition={{ duration: 0 }}
                      />
                    )}
                    <Icon
                      className={`relative h-3.5 w-3.5 ${selected ? "text-white" : "text-white/35"}`}
                    />
                    <span
                      className={`relative mt-2 block text-[10px] font-medium ${selected ? "text-white" : "text-white/45"}`}
                    >
                      {method.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-3 h-[76px] overflow-hidden border border-white/10 bg-black/15 px-3 py-3">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={selectedPayment.id}
                  initial={
                    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 7, filter: "blur(2px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5, filter: "blur(2px)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.52 }}
                  className="flex h-full items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                      {selectedPayment.label}
                    </span>
                    <p className="mt-1 text-xs text-white/75">{selectedPayment.detail}</p>
                  </div>
                  <p className="max-w-[195px] text-right text-[10px] leading-relaxed text-white/38">
                    {selectedPayment.helper}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              className="mt-3 flex w-full items-center justify-center gap-2 bg-white px-3 py-3 text-xs font-semibold text-black"
            >
              <LockKeyhole className="h-3.5 w-3.5" />
              Continue securely
            </motion.button>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
              {[
                [ShieldCheck, "Encrypted"],
                [LockKeyhole, "Cancel anytime"],
                [Headphones, "Human support"],
              ].map(([Icon, label]) => {
                const AssuranceIcon = Icon as ComponentType<{ className?: string }>;
                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-1.5 text-[9px] text-white/38"
                  >
                    <AssuranceIcon className="h-3 w-3 text-white/52" />
                    <span>{label as string}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <footer
          className={`${compact ? "mt-4 pt-3" : "mt-5 pt-4"} flex justify-between border-t border-white/10 font-mono text-[8px] uppercase tracking-[0.16em] text-white/28`}
        >
          <span>Transparent total, no surprise at confirmation</span>
          <span className="hidden sm:block">Komorebi / checkout confidence</span>
        </footer>
      </div>
    </section>
  );
}
