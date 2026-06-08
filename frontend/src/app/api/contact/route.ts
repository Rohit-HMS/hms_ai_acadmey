import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005'

  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, message } = body

    // Submit inquiry to Payload CMS API
    const res = await fetch(`${cmsUrl}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        message,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return NextResponse.json(
        { error: errorData.message || 'Failed to store inquiry in Payload CMS' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error in proxy route /api/contact:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
