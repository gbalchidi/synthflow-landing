// Test script for UniSender email notifications
// Run with: node test-email-notification.js

async function testEmailNotification() {
  const baseUrl = 'http://localhost:3000'
  
  console.log('🚀 Testing Email Notification API with UniSender...\n')
  
  // Test 1: Registration notification
  console.log('📧 Test 1: Registration notification')
  try {
    const registrationResponse = await fetch(`${baseUrl}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'registration',
        name: 'Тестовый Пользователь',
        email: 'test@example.com',
        plan: 'Годовая подписка (1,330₽/мес)',
        utm: {
          source: 'google',
          medium: 'cpc',
          campaign: 'summer2024'
        }
      })
    })
    
    const result = await registrationResponse.json()
    
    if (registrationResponse.ok) {
      console.log('✅ Registration notification sent successfully')
      console.log('Response:', result)
    } else {
      console.log('❌ Registration notification failed:', result)
    }
  } catch (error) {
    console.log('❌ Registration notification error:', error.message)
  }
  
  console.log('\n')
  
  // Test 2: Payment attempt notification
  console.log('📧 Test 2: Payment attempt notification')
  try {
    const paymentResponse = await fetch(`${baseUrl}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'payment_attempt',
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        plan: 'Месячная подписка (1,990₽/мес)',
        utm: {
          source: 'yandex',
          medium: 'cpc',
          campaign: 'promo2024'
        }
      })
    })
    
    const result = await paymentResponse.json()
    
    if (paymentResponse.ok) {
      console.log('✅ Payment attempt notification sent successfully')
      console.log('Response:', result)
    } else {
      console.log('❌ Payment attempt notification failed:', result)
    }
  } catch (error) {
    console.log('❌ Payment attempt notification error:', error.message)
  }
  
  console.log('\n')
  
  // Test 3: Newsletter subscription
  console.log('📧 Test 3: Newsletter subscription')
  try {
    const newsletterResponse = await fetch(`${baseUrl}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'newsletter',
        email: 'subscriber@example.com',
        source: 'footer',
        utm: {
          source: 'instagram',
          medium: 'social',
          campaign: 'stories'
        }
      })
    })
    
    const result = await newsletterResponse.json()
    
    if (newsletterResponse.ok) {
      console.log('✅ Newsletter notification sent successfully')
      console.log('Response:', result)
    } else {
      console.log('❌ Newsletter notification failed:', result)
    }
  } catch (error) {
    console.log('❌ Newsletter notification error:', error.message)
  }
  
  console.log('\n🎉 Test completed!')
  console.log('\n⚠️  Note: To receive actual emails via Gmail SMTP, you need to:')
  console.log('1. Enable 2-Step Verification in your Google Account')
  console.log('2. Generate an App Password:')
  console.log('   - Go to https://myaccount.google.com/apppasswords')
  console.log('   - Select "Mail" and generate password')
  console.log('3. Add to .env.local:')
  console.log('   SMTP_USER=your_gmail@gmail.com')
  console.log('   SMTP_PASS=your_16_character_app_password')
  console.log('\n📧 Emails will be sent to glebbalchidi@gmail.com')
}

testEmailNotification()