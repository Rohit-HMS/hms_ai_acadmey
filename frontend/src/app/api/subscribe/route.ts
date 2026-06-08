import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('[SUBSCRIBE] SMTP configuration is missing in environment variables.')
      return NextResponse.json({
        error: 'Email subscription service is not configured yet. Please set your SMTP credentials in .env.local.'
      }, { status: 500 })
    }

    const brochurePath = path.join(process.cwd(), 'public', 'brochure.pdf')
    if (!fs.existsSync(brochurePath)) {
      console.error(`[SUBSCRIBE] Brochure file not found at path: ${brochurePath}`)
      return NextResponse.json({ error: 'Brochure attachment file not found on server.' }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(brochurePath)

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_FROM || '"HMS AI Academy" <noreply@hmsacademy.com>',
      to: email,
      subject: 'Your HMS AI Academy Course Brochure',
      text: `Hello,\n\nThank you for subscribing to our newsletter! Please find the HMS AI Academy course brochure attached to this email.\n\nBest regards,\nHMS AI Academy Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; padding: 20px; border-radius: 8px;">
          <h2 style="color: #6356ff;">Welcome to HMS AI Academy!</h2>
          <p>Hello,</p>
          <p>Thank you for subscribing to our newsletter! As promised, we have attached our latest course brochure to this email.</p>
          <p>This brochure contains detailed roadmaps, schedules, syllabus breakdown, and placement information for all our engineering tracks.</p>
          <p>If you have any questions, feel free to reply to this email or contact us via our website.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>HMS AI Academy Team</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: 'brochure.pdf',
          content: fileBuffer,
          contentType: 'application/pdf',
        },
      ],
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' })
  } catch (error: any) {
    console.error('Error sending subscription email:', error)
    return NextResponse.json({ error: 'Internal server error while sending email.' }, { status: 500 })
  }
}
