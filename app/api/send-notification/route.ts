import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const UNISENDER_API_KEY = process.env.UNISENDER_API_KEY
const UNISENDER_API_URL = 'https://api.unisender.com/ru/api'
const NOTIFICATION_EMAIL = 'glebbalchidi@gmail.com'
const SENDER_NAME = 'SynthFlow'
const SENDER_EMAIL = process.env.UNISENDER_SENDER_EMAIL || 'noreply@synthflow.ai'

interface NotificationData {
  type: 'registration' | 'newsletter'
  name?: string
  email: string
  plan?: string
  source?: string
  utm?: {
    source?: string
    medium?: string
    campaign?: string
  }
}

async function sendEmailViaUnisender(to: string, subject: string, html: string) {
  if (!UNISENDER_API_KEY) {
    console.error('UNISENDER_API_KEY is not configured')
    throw new Error('Email service not configured')
  }

  const params = new URLSearchParams({
    api_key: UNISENDER_API_KEY,
    email: to,
    sender_name: SENDER_NAME,
    sender_email: SENDER_EMAIL,
    subject: subject,
    body: html,
  })

  try {
    const response = await axios.post(
      `${UNISENDER_API_URL}/sendEmail.json`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (response.data.error) {
      console.error('UniSender API error:', response.data.error)
      throw new Error(response.data.error)
    }

    return response.data
  } catch (error) {
    console.error('UniSender request error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: NotificationData = await request.json()
    
    const timestamp = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    let subject = ''
    let htmlContent = ''

    if (data.type === 'registration') {
      subject = `💰 Новая заявка на оплату - ${data.name || 'Без имени'}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
                🎯 Новая заявка на оплату SynthFlow
              </h1>
            </div>
            
            <div style="padding: 30px;">
              <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h2 style="color: #7c3aed; margin-top: 0; font-size: 18px;">Данные пользователя:</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280; width: 30%;">Имя:</td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${data.name || 'Не указано'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280;">Email:</td>
                    <td style="padding: 10px 0;">
                      <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280;">Тариф:</td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${data.plan || 'Не указан'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280;">Время:</td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${timestamp}</td>
                  </tr>
                </table>
              </div>

              ${data.utm && (data.utm.source || data.utm.medium || data.utm.campaign) ? `
                <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                  <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">📊 UTM метки:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${data.utm.source ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e; width: 30%;">Источник:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.source}</td>
                      </tr>
                    ` : ''}
                    ${data.utm.medium ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e;">Канал:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.medium}</td>
                      </tr>
                    ` : ''}
                    ${data.utm.campaign ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e;">Кампания:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.campaign}</td>
                      </tr>
                    ` : ''}
                  </table>
                </div>
              ` : ''}

              <div style="background: #dcfce7; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="color: #14532d; margin: 0; font-weight: 600; font-size: 16px;">
                  ✅ Пользователь готов к оплате
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    } else {
      subject = `📧 Новая подписка на рассылку - ${data.email}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
                📮 Новая подписка на рассылку SynthFlow
              </h1>
            </div>
            
            <div style="padding: 30px;">
              <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280; width: 30%;">Email:</td>
                    <td style="padding: 10px 0;">
                      <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280;">Источник:</td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${data.source || 'Форма в футере'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280;">Время:</td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${timestamp}</td>
                  </tr>
                </table>
              </div>

              ${data.utm && (data.utm.source || data.utm.medium || data.utm.campaign) ? `
                <div style="background: #fef3c7; border-radius: 8px; padding: 20px;">
                  <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">📊 UTM метки:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${data.utm.source ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e; width: 30%;">Источник:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.source}</td>
                      </tr>
                    ` : ''}
                    ${data.utm.medium ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e;">Канал:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.medium}</td>
                      </tr>
                    ` : ''}
                    ${data.utm.campaign ? `
                      <tr>
                        <td style="padding: 6px 0; color: #92400e;">Кампания:</td>
                        <td style="padding: 6px 0; color: #78350f; font-weight: 500;">${data.utm.campaign}</td>
                      </tr>
                    ` : ''}
                  </table>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `
    }

    await sendEmailViaUnisender(NOTIFICATION_EMAIL, subject, htmlContent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}