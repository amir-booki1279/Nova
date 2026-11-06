import prisma from "./prisma";



export async function getAdminOders(){
    return prisma.order.findMany({
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    id:true
                }
            },
            items:{
                include:{
                    product:{
                        select:{
                            id:true,
                            name:true,
                            image:true
                        }
                    }
                }
            }
        },
        orderBy:{
            createAt:"desc"
        }
    })
}

export async function getAdminOrderById(id:string){

    return prisma.order.findUnique({
        where:{id},
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            items:{
                include:{
                    product:true
                }
            }
        },
        
    })
}