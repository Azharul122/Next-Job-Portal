import { Category } from "@prisma/client"
import Link from "next/link"

interface propsTypes {
  categoriesData: Category[]
}

const Categories = ({ categoriesData }: propsTypes) => {

  return (
    <div className="">
      <h2 className="text-xl py-5">Recommented categories</h2>
      <div className="flex items-center gap-2 flex-wrap">
        {
          categoriesData.map(category => (<Link href={`/search?categoryId=${category.id}`} key={category.id} className="flex items-center text-sm gap-2 border dark:border-dark-border border-light-border px-3 py-2 bg-lightbg dark:bg-darkbg text-justify ">
                <p className="text-muted-foreground">{category.categoryTitle}</p>
          </Link>))
        }
      </div>

    </div>
  )
}

export default Categories