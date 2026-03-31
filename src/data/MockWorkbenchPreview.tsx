export default function MockWorkbenchPreview() {
  return (
    <div className="h-full w-full bg-gray-900">
      <main className="absolute top-1/2 left-1/2 min-w-xs -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 lg:min-w-md">
        <header className="space-y-1.5 text-center">
          <h1 className="text-3xl font-bold text-gray-900">PostFlow</h1>

          <p className="text-gray-600">Social media scheduling made simple.</p>
        </header>

        <form className="mt-6 space-y-4 text-gray-900">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-white transition-colors hover:bg-blue-900"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 block text-center text-gray-900">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-blue-700">
            Sign up
          </a>
        </p>
      </main>
    </div>
  )
}
