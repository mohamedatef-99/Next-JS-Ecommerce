"use client";

import { CartItemWithProducts } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import { product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";


interface CartEntryProps{
    cartItem: CartItemWithProducts,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry({cartItem : {product, quantity},}: CartEntryProps){

    const [isPending, startTransition] = useTransition()

    const quanittyOptions: JSX.Element[] = []
    for(let i = 1; i <= 99; i++){
        quanittyOptions.push(
            <option value={i} key={i}>{i}</option>
        )
    }

    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded"/>
                <div>
                    <Link href={"/products/" + product.id} className="font-bold" >
                        {product.name}
                    </Link>
                    <div>
                        Price: {formatPrice(product.price)}
                    </div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity: <select className="select select-bordered w-full max-w-[80px]" defaultValue={quantity} onChange={e =>{
                            const newQuantity = parseInt(e.currentTarget.value)
                            startTransition(async ()=>{
                                await setProductQuantity(product.id, newQuantity)
                            })
                        }}>
                            <option value={0} >0 (Remove)</option>
                            {quanittyOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Total: {formatPrice(product.price * quantity)}
                        {isPending && <span className="loading loading-spinner loading-sm"></span>}
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}