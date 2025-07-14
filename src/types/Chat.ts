import Message from "./Message"
import User from "./User"

interface Chat {
    id: string
    messages: Message[]
    user1: User
    user2: User
}

export default Chat;