"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set")
    return { success: false, error: "Configuration error" }
  }

  try {
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields" }
    }

    await resend.emails.send({
      from: "Exon Enterprise <contact@exonenterprise.com>",
      to: "ryan@mandarin3d.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <header style="background-color: #6E417D; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </header>
          <main style="padding: 20px;">
            <p style="margin-bottom: 20px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 20px;"><strong>Email:</strong> ${email}</p>
            <h2 style="color: #6E417D; border-bottom: 2px solid #6E417D; padding-bottom: 10px;">Message:</h2>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
          </main>
          <footer style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #666;">
            <p>This email was sent from the Exon Enterprise contact form.</p>
          </footer>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

