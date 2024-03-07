import ClientOnly from '@/components/ClientOnly'
import StarTrail from '@/components/StarTrail'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <ClientOnly>
        <div className="relative">
          <StarTrail />
          <div className="absolute top-1/2 left-1/4 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="flex flex-col">
              <span>Hobbyist</span>
              <span>Doctor</span>
              <span>Drummer</span>
            </h1>
          </div>
        </div>
        <div className="h-[100vh]"></div>
      </ClientOnly>
    </main>
  )
}
