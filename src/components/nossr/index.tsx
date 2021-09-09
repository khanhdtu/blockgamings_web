import dynamic from 'next/dynamic'

const NoSsr = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const Dynamic = dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
})

export default Dynamic
