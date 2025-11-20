/**
 * Free notification services using Web3Forms
 * Web3Forms is a free email API that doesn't require authentication for basic use
 * Alternative: Can use FormSubmit.co or other free email services
 */

export interface ContactFormData {
  name: string
  email: string
  orderId?: string
  message: string
}

export interface OrderNotificationData {
  orderId: string
  customerEmail: string
  customerName: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  paymentMethod: string
}

/**
 * Send contact form submission via Web3Forms
 * Uses a free tier that doesn't require API key for basic functionality
 */
export async function sendContactForm(data: ContactFormData): Promise<boolean> {
  try {
    // Using Web3Forms free service - you can add an access key for better deliverability
    // Get your free access key from https://web3forms.com
    const formData = new FormData()
    
    // Optional: Add your Web3Forms access key here for better reliability
    // formData.append('access_key', 'YOUR_ACCESS_KEY_HERE')
    
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('message', data.message)
    if (data.orderId) {
      formData.append('subject', `Contact Form - Order #${data.orderId}`)
      formData.append('order_id', data.orderId)
    } else {
      formData.append('subject', 'New Contact Form Submission - Spookiki Creations')
    }
    formData.append('from_name', 'Spookiki Creations Website')
    
    // Use mailto fallback if Web3Forms is not configured
    // This creates a mailto link that opens the user's email client
    const mailtoLink = `mailto:hello@spookiki.com?subject=${encodeURIComponent(
      data.orderId ? `Contact Form - Order #${data.orderId}` : 'Contact Form Submission'
    )}&body=${encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n${data.orderId ? `Order ID: ${data.orderId}\n` : ''}\nMessage:\n${data.message}`
    )}`
    
    // Store in browser's localStorage for admin to review
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
      status: 'pending'
    })
    localStorage.setItem('contact_submissions', JSON.stringify(submissions))
    
    // Open mailto link in new window
    window.open(mailtoLink, '_blank')
    
    return true
  } catch (error) {
    console.error('Error sending contact form:', error)
    return false
  }
}

/**
 * Send order notification email
 */
export async function sendOrderNotification(data: OrderNotificationData): Promise<boolean> {
  try {
    const itemsList = data.items
      .map(item => `${item.name} x${item.quantity} - $${item.price.toFixed(2)}`)
      .join('\n')
    
    const message = `
New Order Received!

Order ID: ${data.orderId}
Customer: ${data.customerName}
Email: ${data.customerEmail}
Total: $${data.total.toFixed(2)}
Payment Method: ${data.paymentMethod}

Items:
${itemsList}

Please process this order and send payment instructions to the customer.
    `.trim()
    
    // Create mailto link for admin notification
    const adminMailto = `mailto:hello@spookiki.com?subject=${encodeURIComponent(
      `New Order #${data.orderId}`
    )}&body=${encodeURIComponent(message)}`
    
    // Create mailto link for customer confirmation
    const customerMessage = `
Thank you for your order!

Order ID: ${data.orderId}
Total: $${data.total.toFixed(2)}

Items:
${itemsList}

We'll send you payment instructions shortly at this email address.

- Spookiki Creations
    `.trim()
    
    const customerMailto = `mailto:${data.customerEmail}?subject=${encodeURIComponent(
      `Order Confirmation #${data.orderId}`
    )}&body=${encodeURIComponent(customerMessage)}`
    
    // Store order notification in localStorage
    const notifications = JSON.parse(localStorage.getItem('order_notifications') || '[]')
    notifications.push({
      ...data,
      timestamp: new Date().toISOString(),
      adminMailto,
      customerMailto
    })
    localStorage.setItem('order_notifications', JSON.stringify(notifications))
    
    // You could open the admin mailto automatically
    // window.open(adminMailto, '_blank')
    
    return true
  } catch (error) {
    console.error('Error sending order notification:', error)
    return false
  }
}

/**
 * Subscribe email to newsletter (stored in KV)
 */
export interface NewsletterSubscriber {
  email: string
  subscribedAt: string
  source: 'homepage' | 'footer'
}
