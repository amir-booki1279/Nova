import "server-only"
import prisma from "./prisma"


export async function getAdminProducts(){
    return prisma.product.findMany({
        include :{
            category:true
        },
        orderBy:{
            createAt:"desc"
        }
    })
}