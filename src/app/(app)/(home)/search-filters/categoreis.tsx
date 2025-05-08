interface CategoriesProps {
    data : any
}

export const Categories = ({
    data
}:CategoriesProps) =>{
    return(
        <div>
            Categories : {JSON.stringify(data,null,2)}
        </div>
    )
}