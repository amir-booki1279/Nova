import prisma from "./prisma";


export async function getAdminState(){
    const[productCount,usersCount,ordersCount] = await Promise.all([
        prisma.product.count({
            where:{isActive:true}
        }),
        prisma.user.count(),
        prisma.order.count()
    ]);
    
    return {productCount,usersCount,ordersCount}
}