import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Define the request body type
interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
    recaptchaToken: string
}

export async function POST(request: Request) {
    try {
        console.log('Received POST request')
        const { name, email, subject, message, recaptchaToken }: ContactFormData = await request.json()
        console.log('Parsed form data:', { name, email, subject, message, recaptchaToken })

        // Validate required fields
        if (!name || !email || !subject || !message || !recaptchaToken) {
            console.warn('Missing required fields')
            return NextResponse.json(
                { error: 'All fields including reCAPTCHA are required' },
                { status: 400 }
            )
        }

        // Verify reCAPTCHA token with Google
        console.log('Verifying reCAPTCHA token...')
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
        const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
        })

        const recaptchaData = await recaptchaRes.json()
        console.log('reCAPTCHA response:', recaptchaData)

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.warn('Failed reCAPTCHA verification')
            return NextResponse.json(
                { error: 'Failed reCAPTCHA verification' },
                { status: 403 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            console.warn('Invalid email format')
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Create transporter (configure with your email service)
        console.log('Setting up mail transporter...')
        const transporter = nodemailer.createTransport({
            // For Gmail
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail App Password
            },
            // For other services, use:
            // host: process.env.SMTP_HOST,
            // port: parseInt(process.env.SMTP_PORT || '587'),
            // secure: false, // true for 465, false for other ports
            // auth: {
            //     user: process.env.EMAIL_USER,
            //     pass: process.env.EMAIL_PASSWORD,
            // },
        })

        // Email to you (the recipient)
        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Your email where you want to receive messages
            subject: `Portfolio v2 Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #444; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #444; margin-bottom: 10px;">Message:</h3>
                        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
                        <p>This email was sent from your Portfolio v2 contact form.</p>
                        <p>Reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
                
                ---
                This email was sent from your Portfolio v2 contact form.
                Reply directly to this email to respond to ${name}.
            `,
            replyTo: email, // This allows you to reply directly to the sender
        }

        // Send email
        console.log('Sending email...')
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        )

    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
