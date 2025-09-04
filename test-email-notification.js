// Test script for email notifications
// Run with: node test-email-notification.js

async function testEmailNotification() {
  const baseUrl = 'http://localhost:3000'
  
  console.log('🚀 Testing Email Notification API...\n')
  
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
    
    if (registrationResponse.ok) {
      console.log('✅ Registration notification sent successfully')
    } else {
      console.log('❌ Registration notification failed:', await registrationResponse.text())
    }
  } catch (error) {
    console.log('❌ Registration notification error:', error.message)
  }
  
  console.log('\n')
  
  // Test 2: Newsletter subscription
  console.log('📧 Test 2: Newsletter subscription')
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
    
    if (newsletterResponse.ok) {
      console.log('✅ Newsletter notification sent successfully')
    } else {
      console.log('❌ Newsletter notification failed:', await newsletterResponse.text())
    }
  } catch (error) {
    console.log('❌ Newsletter notification error:', error.message)
  }
  
  console.log('\n🎉 Test completed!')
  console.log('\n⚠️  Note: To receive actual emails, you need to:')
  console.log('1. Sign up for Resend at https://resend.com')
  console.log('2. Get your API key from https://resend.com/api-keys')
  console.log('3. Add your API key to .env.local: RESEND_API_KEY=re_YOUR_KEY')
  console.log('4. Verify your domain in Resend dashboard')
  console.log('5. Update the "from" email in /app/api/send-notification/route.ts')
}

testEmailNotification()