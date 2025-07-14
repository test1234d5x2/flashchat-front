"use server"

import { redirect } from "next/navigation"
import logout from "./logout"

export default async function handleLogout(formData: FormData) {
    const response = await logout()

    if (response.success) {
        redirect("/landing")
    }

    else {
        // TODO: Managed logout failure
        console.log("Logout Failed")
    }
}