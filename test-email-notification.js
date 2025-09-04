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
  console.log('\n⚠️  Note: To receive actual emails via UniSender, you need to:')
  console.log('1. Sign up for UniSender at https://unisender.com')
  console.log('2. Get your API key from https://cp.unisender.com/ru/v5/settings/api')
  console.log('3. Add your API key to .env.local: UNISENDER_API_KEY=your_key')
  console.log('4. Verify sender email in UniSender dashboard')
  console.log('5. Add sender email to .env.local: UNISENDER_SENDER_EMAIL=your@email.ru')
  console.log('6. Create a contact list in UniSender and update list_id in the API route')
  console.log('\n📍 UniSender хранит данные в РФ согласно требованиям 152-ФЗ')
}

testEmailNotification()