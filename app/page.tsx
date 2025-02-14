"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Terminal, CuboidIcon as Cube, Radio, X, Loader2, CheckCircle } from "lucide-react"
import { sendEmail } from "@/app/actions"

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
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
      } catch (error) {
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
            className="text-5xl md:text-7xl font-bold tracking-normal lowercase"
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
            <motion.video
              src="https://0o4pg1fpby.ufs.sh/f/RSbfEU0J8DcdoT0Oke3BV7pR2kHdOZDN6Mjc8tXeiLQzrPxY"
              alt="O"
              className="mx-2 inline-block align-middle"
              style={{ height: "44px" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              whileHover={{ rotate: 360 }}
              autoPlay
              loop
              muted
              playsInline
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
            className="text-sm md:text-base text-zinc-500 mt-3"
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
              gradient: "from-gray-50 to-white",
              accentColor: "text-[#0d939b]",
              borderColor: "border-[#0d939b]/20",
              hoverBorder: "hover:border-[#0d939b]",
              icon: Cube,
              delay: 0.2,
            },
            {
              name: "AppliedTrack",
              description: "Enterprise Software Platform",
              gradient: "from-gray-50 to-white",
              accentColor: "text-[#eab308]",
              borderColor: "border-[#eab308]/20",
              hoverBorder: "hover:border-[#eab308]",
              icon: Terminal,
              delay: 0.3,
            },
            {
              name: "NextDev.fm",
              description: "Developer Insights Podcast",
              gradient: "from-gray-50 to-white",
              accentColor: "text-green-500",
              borderColor: "border-green-500/20",
              hoverBorder: "hover:border-green-500",
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
                  border-2 ${company.borderColor} ${company.hoverBorder}
                  text-zinc-800
                  transition-all duration-300
                  relative overflow-hidden
                  shadow-sm hover:shadow-md
                `}
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: company.delay + 0.2, duration: 0.3 }}
                  >
                    <company.icon className={`w-8 h-8 mb-4 ${company.accentColor}`} />
                  </motion.div>
                  <motion.h2
                    className={`text-xl md:text-2xl font-bold flex items-center gap-2 ${company.accentColor}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: company.delay + 0.4, duration: 0.3 }}
                  >
                    {company.name}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </motion.h2>
                  <motion.p
                    className="text-sm mt-2 text-zinc-600"
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
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#6E417D] focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#6E417D] focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#6E417D] focus:border-transparent transition-shadow resize-none"
                  ></textarea>
                </div>
                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center text-green-600"
                    >
                      <CheckCircle className="mr-2" />
                      Message Sent Successfully!
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={isPending}
                      className={`
                        w-full py-2 px-4 rounded-lg
                        bg-[#6E417D] text-white font-medium
                        hover:bg-[#5D3569] 
                        focus:outline-none focus:ring-2 focus:ring-[#6E417D] focus:ring-offset-2
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors
                        flex items-center justify-center
                      `}
                    >
                      {isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : formStatus === "error" ? (
                        "Failed to Send"
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

