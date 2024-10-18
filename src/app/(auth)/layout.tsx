const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[100vh] overflow-y-scroll flex justify-center items-center bg-darkbg  '>{children}</div>
  )
}

export default AuthenticationLayout


