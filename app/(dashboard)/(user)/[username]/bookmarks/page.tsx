import UserBookmarks from "@/components/canvas/UserBookmarks";


export default function BookmarksPage({ params }: { params: { username: string } }) {
return <UserBookmarks username={params.username} />;
}

