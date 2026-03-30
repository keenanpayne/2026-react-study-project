/**
 * TODO:
 *  - Extract hard-coded content
 *  - Add a loading state while response is being generated
 *  - Add a error state if response generation fails
 */

export default function EditorOutput() {
  return (
    <div className="relative bg-gray-900 rounded-lg border border-gray-200 dark:border-zinc-700 h-full w-full">
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg min-w-md">
        <header className="text-center space-y-1.5">
          <h1 className="text-3xl font-bold">
            PostFlow
          </h1>

          <p className="text-gray-600">
            Social media scheduling made simple.
          </p>
        </header>

        <form className="space-y-4 mt-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="********" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <button type="submit" className="cursor-pointer w-full px-3 py-2 bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-lg">
            Sign In
          </button>
        </form>

        <p className="block text-center mt-8">
          Don't have an account? <a href="#" className="text-blue-700 font-medium">Sign up</a>
        </p>
      </main>
    </div>
  )
}