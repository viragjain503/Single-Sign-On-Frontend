"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <link rel="icon" type="image/png" href="/logo"/>
      <body>{children}</body>
    </html>
  )
}
