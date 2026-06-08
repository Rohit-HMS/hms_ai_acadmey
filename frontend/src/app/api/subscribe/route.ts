import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hms-ai-acadmey.vercel.app'

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
      subject: 'Welcome to HMS AI Academy & Your Course Brochure',
      text: `Hello,\n\nThank you for subscribing to our newsletter! Please find the HMS AI Academy course brochure attached to this email.\n\nExplore our courses at ${siteUrl}\n\nBest regards,\nHMS AI Academy Team`,
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6faff; padding: 40px 20px; line-height: 1.6; color: #222c44;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(26, 33, 188, 0.05); border: 1px solid #e1e8f5;">
            
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #1a21bc 0%, #6556ff 100%); padding: 40px 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">HMS AI ACADEMY</h1>
              <p style="margin: 8px 0 0 0; font-size: 15px; color: #d5effa; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Become AI-Ready in 30–120 Days</p>
            </div>

            <!-- Content Area -->
            <div style="padding: 40px 30px;">
              <h2 style="margin-top: 0; font-size: 22px; font-weight: 700; color: #1a21bc; line-height: 1.2;">Welcome to the Future of Learning! 🚀</h2>
              <p style="font-size: 16px; color: #57595f; margin-bottom: 24px;">Hello there,</p>
              <p style="font-size: 16px; color: #57595f; margin-bottom: 28px;">
                Thank you for subscribing to our newsletter! You've taken the first step toward building real-world AI products and mastering modern engineering tracks.
              </p>

              <!-- Feature Callouts -->
              <div style="background-color: #f6faff; border-left: 4px solid #6556ff; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 28px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #222c44;">What's waiting for you at HMS:</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="vertical-align: top; width: 32px; padding-bottom: 12px;">✅</td>
                    <td style="font-size: 14px; color: #57595f; padding-bottom: 12px;">
                      <strong>Project-Led Curriculum:</strong> Don't just watch videos—build production-ready products.
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 32px; padding-bottom: 12px;">✅</td>
                    <td style="font-size: 14px; color: #57595f; padding-bottom: 12px;">
                      <strong>Flexible Schedules:</strong> Guided paths designed to fit your busy life.
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 32px;">✅</td>
                    <td style="font-size: 14px; color: #57595f;">
                      <strong>Active Community:</strong> Join peers and industry experts for collaborative learning and placement guidance.
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Brochure Callout -->
              <p style="font-size: 15px; color: #57595f; margin-bottom: 28px;">
                As promised, we have <strong>attached our latest course brochure</strong> to this email. In it, you'll find detailed roadmaps, schedules, syllabus breakdowns, and career outcomes for all our programs.
              </p>

              <!-- Call to Action -->
              <div style="text-align: center; margin-bottom: 35px; margin-top: 30px;">
                <a href="${siteUrl}" style="background-color: #1a21bc; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 16px; font-weight: 700; border-radius: 9999px; display: inline-block; box-shadow: 0 4px 10px rgba(26, 33, 188, 0.25);">
                  Explore Courses
                </a>
              </div>

              <hr style="border: 0; border-top: 1px solid #e1e8f5; margin: 30px 0;">

              <!-- Questions / Outro -->
              <p style="font-size: 14px; color: #57595f; margin-bottom: 0;">
                Have questions about our syllabus or admissions? Simply reply to this email, and our academic advisors will get right back to you!
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f6faff; padding: 30px; text-align: center; border-top: 1px solid #e1e8f5; font-size: 12px; color: #9aa2b1;">
              <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} HMS AI Academy. All rights reserved.</p>
              <p style="margin: 0;">You are receiving this because you signed up on our website. <a href="#" style="color: #6556ff; text-decoration: underline;">Unsubscribe</a></p>
            </div>

          </div>
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
