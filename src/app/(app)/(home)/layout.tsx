import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { SearchFilters } from "./search-filters"
import { CustomCategory } from './types'


interface Props{
    children : React.ReactNode
}

const Layout = async ({children}: Props) => {

    const payload = await getPayload({
        config: configPromise
      })
    
      const data = await payload.find({
        // @ts-expect-error djjjj
        collection:"Categories",
        depth : 1, // Populate Subcategories
        pagination : false,
        where : {
          parent: {
            exists:false
          },
        },
      });

      const formattedData:CustomCategory[] = data.docs.map(doc => ({
        id: doc.id,
        name: doc.name,
        slug: doc.slug,
        color: doc.color,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        subcategories: (doc.subcategores?.docs ?? []).map(sub => ({
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          color: sub.color,
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