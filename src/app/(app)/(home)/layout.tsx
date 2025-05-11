import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { SearchFilters } from "./search-filters"
import { CustomCategory } from './types'
import { Category } from '@/payload-types'


interface Props{
    children : React.ReactNode
}

const Layout = async ({children}: Props) => {

    const payload = await getPayload({
        config: configPromise
      })
    
      const data = await payload.find({
        
        collection:"Categories",
        depth : 1, // Populate Subcategories
        pagination : false,
        where : {
          parent: {
            exists:false
          },
        },
        sort:"name"
      });

      const formattedData:CustomCategory[] = data.docs.map(doc => ({
        ...doc,
        subcategories : (doc.subcategores?.docs ?? []).map((doc)=>({
          ...(doc as Category),
          subcategores:undefined
        }))
      }));

      
   console.log(data,formattedData)

    return(
        <div
            className='flex flex-col min-h-screen'
        >
            <Navbar/>
            
            <SearchFilters data = {formattedData} />
            <div
                className="flex-1 bg-[#f4f4f0]"
            >
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout