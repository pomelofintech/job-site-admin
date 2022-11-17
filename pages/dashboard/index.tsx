import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
          <Link href="/company-details" passHref>
            <button className="btn-logo">Company details</button>
          </Link>
          <Link href="/jobs-review" passHref>
            <button className="btn-logo">Review Jobs</button>
          </Link>
          <Link href="/jobs-ready-to-go-live" passHref>
            <button className="btn-logo">Jobs read to go live</button>
          </Link>
          <Link href="/live-jobs" passHref>
            <button className="btn-logo">Live Jobs.</button>
          </Link>
    </div>
  )
}
