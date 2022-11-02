import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
          <Link href="/jobs-review" passHref>
            <button className="btn-logo">Review Jobs.</button>
          </Link>
    </div>
  )
}
