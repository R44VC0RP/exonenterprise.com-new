"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Terminal, CuboidIcon as Cube, Radio, X, Loader2 } from "lucide-react"
import { sendEmail } from "./actions"

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendEmail(formData)
      if (result.success) {
        setFormStatus("success")
        setTimeout(() => {
          setIsContactOpen(false)
          setFormStatus("idle")
        }, 2000)
      } else {
        setFormStatus("error")
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-white text-zinc-800 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"
        animate={{
          background: [
            "linear-gradient(to bottom right, #f9fafb, #ffffff, #f9fafb)",
            "linear-gradient(to bottom right, #f3f4f6, #ffffff, #f3f4f6)",
            "linear-gradient(to bottom right, #f9fafb, #ffffff, #f9fafb)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <main className="relative h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Logo and company name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold tracking-normal lowercase"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ex
            </motion.span>
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/raavcorp%20logo-cgEhiADcwyNa03RZEyMSi4245B1nWT.png"
              alt="O"
              className="mx-1 inline-block align-baseline"
              style={{ height: "22px" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              whileHover={{ rotate: 360 }}
            />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              n enterprise
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xs md:text-sm text-zinc-500 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Building Tomorrow&apos;s Technology
          </motion.p>
        </motion.div>

        {/* Company cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl w-full">
          {[
            {
              name: "Mandarin 3D Prints",
              description: "Advanced 3D Printing Solutions",
              gradient: "from-zinc-800 to-zinc-900",
              accentColor: "border-[#0d939b] text-[#0d939b]",
              icon: Cube,
              delay: 0.2,
            },
            {
              name: "AppliedTrack",
              description: "Enterprise Software Platform",
              gradient: "from-zinc-800 to-zinc-900",
              accentColor: "border-[#eab308] text-[#eab308]",
              icon: Terminal,
              delay: 0.3,
            },
            {
              name: "NextDev.fm",
              description: "Developer Insights Podcast",
              gradient: "from-zinc-800 to-zinc-900",
              accentColor: "border-green-400 text-green-400",
              icon: Radio,
              delay: 0.4,
            },
          ].map((company) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: company.delay }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <motion.div
                layoutId={`card-container-${company.name}`}
                className={`
                  block p-6 rounded-2xl cursor-pointer
                  bg-gradient-to-br ${company.gradient}
                  border-2 border-transparent
                  text-white
                  group-hover:${company.accentColor} transition-all duration-300
                  relative overflow-hidden
                  before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300
                  before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)]
                  group-hover:before:opacity-20
                `}
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: company.delay + 0.2, duration: 0.3 }}
                  >
                    <company.icon className={`w-8 h-8 mb-4 opacity-75 group-hover:${company.accentColor}`} />
                  </motion.div>
                  <motion.h2
                    className={`text-xl md:text-2xl font-bold flex items-center gap-2 group-hover:${company.accentColor}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: company.delay + 0.4, duration: 0.3 }}
                  >
                    {company.name}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </motion.h2>
                  <motion.p
                    className="text-sm mt-2 text-gray-300 group-hover:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: company.delay + 0.6, duration: 0.3 }}
                  >
                    {company.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 text-sm text-zinc-500"
        >
          <motion.button
            onClick={() => setIsContactOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-zinc-800 transition-colors"
          >
            Contact
          </motion.button>
        </motion.div>
      </main>

      {/* Contact Popup */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 transition-colors"
                aria-label="Close contact form"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

              <form action={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:border-transparent transition-shadow resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`
                    w-full py-2 px-4 rounded-lg
                    bg-[#eab308] text-white font-medium
                    hover:bg-[#ca9a07] 
                    focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors
                    flex items-center justify-center
                  `}
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : formStatus === "success" ? (
                    "Message Sent!"
                  ) : formStatus === "error" ? (
                    "Failed to Send"
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

