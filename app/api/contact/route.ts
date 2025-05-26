import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Define the request body type
interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

export async function POST(request: Request) {
    try {
        const { name, email, subject, message }: ContactFormData = await request.json()

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Create transporter (configure with your email service)
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
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                        <p>This email was sent from your portfolio contact form.</p>
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
                This email was sent from your portfolio contact form.
                Reply directly to this email to respond to ${name}.
            `,
            replyTo: email, // This allows you to reply directly to the sender
        }

        // Send email
        await transporter.sendMail(mailOptions)

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
