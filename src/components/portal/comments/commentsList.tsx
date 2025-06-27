import Comment from "./comment";

export default function CommentsList() {
    return (
        <section className="p-4 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Comments (2)</h2>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </section>
    )
}