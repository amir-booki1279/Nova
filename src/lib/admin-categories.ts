import "server-only"
import prisma from "./prisma"

export async function getAdminCategories(){
    return prisma.category.findMany({
        include:{
            _count:{
                select:{
                    products:true
                }
            }
        },
        orderBy:{
            createAt:"desc"
        }
    })
}

export async function getAdminCategoryById(id:string){
    return prisma.category.findUnique({
        where:{id},
        include:{
            _count:{
                select:{
                    products:true
                }
            }
        }
    })
}