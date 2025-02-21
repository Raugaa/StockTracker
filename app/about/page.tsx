import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            At Stock Market Tracker, our mission is to empower investors with real-time, accurate, and comprehensive
            stock market data. We strive to provide a user-friendly platform that helps both novice and experienced
            traders make informed decisions in the dynamic world of Indian stock markets.
          </p>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our team consists of passionate finance professionals, data scientists, and software engineers who are
              dedicated to delivering the best stock market tracking experience for our users.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: support@stockmarkettracker.com</p>
            <p>Phone: +91 (123) 456-7890</p>
            <p>Address: 123 Finance Street, Mumbai, India</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

