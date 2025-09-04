import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            🎯 Новая заявка на оплату SynthFlow
          </h2>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">Данные пользователя:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Имя:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.name || 'Не указано'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">
                  <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Тариф:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.plan || 'Не указан'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Время:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${timestamp}</td>
              </tr>
            </table>
          </div>

          ${data.utm && (data.utm.source || data.utm.medium || data.utm.campaign) ? `
            <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">📊 UTM метки:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${data.utm.source ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Источник:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.source}</td>
                  </tr>
                ` : ''}
                ${data.utm.medium ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Канал:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.medium}</td>
                  </tr>
                ` : ''}
                ${data.utm.campaign ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Кампания:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.campaign}</td>
                  </tr>
                ` : ''}
              </table>
            </div>
          ` : ''}

          <div style="background: #dcfce7; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
            <p style="color: #14532d; margin: 0; font-weight: 500;">
              ✅ Пользователь готов к оплате
            </p>
          </div>
        </div>
      `
    } else {
      subject = `📧 Новая подписка на рассылку - ${data.email}`
      htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            📮 Новая подписка на рассылку SynthFlow
          </h2>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">
                  <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Источник:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.source || 'Форма в футере'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Время:</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${timestamp}</td>
              </tr>
            </table>
          </div>

          ${data.utm && (data.utm.source || data.utm.medium || data.utm.campaign) ? `
            <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">📊 UTM метки:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${data.utm.source ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Источник:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.source}</td>
                  </tr>
                ` : ''}
                ${data.utm.medium ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Канал:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.medium}</td>
                  </tr>
                ` : ''}
                ${data.utm.campaign ? `
                  <tr>
                    <td style="padding: 4px 0; color: #92400e;">Кампания:</td>
                    <td style="padding: 4px 0; color: #78350f; font-weight: 500;">${data.utm.campaign}</td>
                  </tr>
                ` : ''}
              </table>
            </div>
          ` : ''}
        </div>
      `
    }

    const { error } = await resend.emails.send({
      from: 'SynthFlow <notifications@synthflow.ai>',
      to: 'glebbalchidi@gmail.com',
      subject,
      html: htmlContent,
    })

    if (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}