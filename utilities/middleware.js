import { NextRequest, NextResponse } from 'next/server'

function getUserStatus(role) {
  if (role === 'admin') {
    return 'admin'
  } else if (role === 'user') {
    return 'user'
  } else {
    return 'guest'
  }
}

function getRequiredStatus(pathname) {
  if (pathname === '/admin') {
    return 'admin'
  } else if (pathname === '/wallet') {
    return 'user'
  } else {
    return 'guest'
  }
}

export default function middleware(req) {
  const role = localStorage.getItem("role")
  const userStatus = getUserStatus(role)
  const requiredStatus = getRequiredStatus(req.nextUrl.pathname)

  if (userStatus !== requiredStatus) {
    if (userStatus === 'guest') {
      return NextResponse.redirect('/login')
    } else {
      return NextResponse.redirect('/error')
    }
  }
}