import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { type, messages } = await req.json()
    console.log(`[CLIENT ${type.toUpperCase()}]`, ...messages)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log' }, { status: 400 })
  }
}
