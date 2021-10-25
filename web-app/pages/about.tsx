import Link from 'next/link'

export default function About() {
  return (
    <>
      <h1>About page</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
