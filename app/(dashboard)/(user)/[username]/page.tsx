import UserProfile from '@/components/canvas/UserProfile'

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div>

      <UserProfile username={params.username} />
    </div>
  )


}
