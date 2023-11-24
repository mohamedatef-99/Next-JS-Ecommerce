import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function searchQuery(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString()

    if(searchQuery){
        redirect("/Search?query" + searchQuery)
    }
}



export default async function Navbar(){

    const session = await getServerSession(authOptions)

    const cart = await getCart()

    return(
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl normal-case">
                        <Image src="https://img.freepik.com/free-vector/gradient-instagram-shop-logo-template_23-2149704603.jpg?w=740&t=st=1700779626~exp=1700780226~hmac=c58d9568b809b04ac3bd00447131d9b4d34c64292c5a0d131cb04c03e53d0e56" height={50} width={40} alt="Flowmazon logo" className="rounded" />
                        Smile Shop
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchQuery}>
                        <div className="form-control">
                            <input type="text" name="searchQuery" placeholder="Search" className="input input-bordered w-full min-w-[100px]" />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart}/>
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    )
}