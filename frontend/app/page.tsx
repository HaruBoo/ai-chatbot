import { auth, signIn } from "@/auth"
import ChatClient from "./ChatClient"

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg">
            GitHubでログイン
          </button>
        </form>
      </div>
    )
  }

  return <ChatClient session={session} />
}