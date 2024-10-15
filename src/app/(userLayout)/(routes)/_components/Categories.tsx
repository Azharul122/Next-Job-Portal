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
          categoriesData.map(category => (<Link href={`/search?categoryId=${category.id}`} key={category.id} className="flex items-center gap-2 border dark:border-dark-border border-light-border px-5 py-1 bg-lightbg dark:bg-darkbg text-justify">
                <p className="dark:text-neutral-200/20 text-neutral-500">{category.categoryTitle}</p>
          </Link>))
        }
      </div>

    </div>
  )
}

export default Categories