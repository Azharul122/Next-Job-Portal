import { Category } from "@prisma/client"
import { Button } from "./button"
import CategoryItems from "@/app/(userLayout)/(routes)/search/_components/CategoryItems"

interface categoryListProps {
    categories: Category[]
}
const CategoriesList = ({ categories }: categoryListProps) => {
    return (
        <div className="py-2 flex items-center overflow-auto hide-scrollbar gap-2">
            {
                categories.map((category) => (
                    <CategoryItems key={category.id} lable={category.categoryTitle} value={category.id} />
                ))
            }
        </div>
    )
}

export default CategoriesList