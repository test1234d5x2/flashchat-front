"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import User from "@/types/User";
import UserListItem from "../userList/userListItem";
import userSearchQuery from "@/app/portal/messages/userSearchQuery";

export default function UserSearch({ handleChatClick }: { handleChatClick: (user1Id: string, user2Id: string) => void }) {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const [users, setUsers] = useState<User[]>([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const searchQuery = searchParams.get("search")
        if (searchQuery) {
             userSearchQuery(searchQuery).then((returnValue) => {
                if (returnValue.success) {
                    setUsers(returnValue.users);
                }
                else {
                    setUsers([]);
                }
            });
        }
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set("search", searchQuery);
        } 
        else {
            params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <section>
            <input
                type="text"
                placeholder="Search users"
                className="border rounded bg-gray-50 w-full p-2"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("search")?.toString() || ""}
            />
            <div className="absolute bg-white z-50 w-full flex flex-col border border-gray-200">
                {!searchParams.get("search") ? "" :
                    users.map((user) => {
                        return (
                            <div key={user.id} onClick={() => handleChatClick(user.id, LOGGED_IN_USER_ID)} className="hover:bg-gray-100 p-2 cursor-pointer">
                                <UserListItem user={user} />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}