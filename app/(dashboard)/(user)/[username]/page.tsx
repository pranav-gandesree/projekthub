// app/users/[username]/page.tsx
import MarkdownEditor from '@/components/canvas/Markdown'
import UserProfile from '@/components/canvas/UserProfile'

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div>
       {/* <div className="flex-1 p-6">
        <MarkdownEditor />
      </div> */}
      <UserProfile username={params.username} />
    </div>
  )


}
