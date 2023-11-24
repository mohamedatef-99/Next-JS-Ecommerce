import { product } from "@prisma/client"
import Link from "next/link"
import PriceTage from "./PriceTage"
import Image from "next/image"
interface ProductCardProps{
    product: product
}

export default function ProductCard({product}: ProductCardProps){
    
    const isNew = Date.now() - new Date(product.createAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    
    return(
        <Link
            href={"/products/" + product.id}
            className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
        >
            <figure>
                <Image 
                    src={product.imageUrl}
                    alt={product.name}
                    width={800}
                    height={400}
                    className="h-48 object-cover"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {product.name}
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p>{product.description}</p>
                <PriceTage price= {product.price} />
            </div>
        </Link>
    )
}