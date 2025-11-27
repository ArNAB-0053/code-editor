import Home from '@/components/home'
import Header from '@/components/home/header'

const Page = () => {
  return (
    <div className="overflow-y-auto h-screen custom-scrollbar scroll-smooth relative  ">
      {/* <Link href="/python" >Gooo</Link> */}
      <Header/>
      <Home/>
    </div>
  )
}

export default Page