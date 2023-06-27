export const useSignInHandler = async ({ username, password }: { username: string, password: string }) => {
  const { signIn } = useAuth()
  const route = useRoute()
  const { error } = await signIn('credentials', { username, password, redirect: false })
  if (error) {
    // Do your custom error handling here
    console.error('Erro ao digitar credenciais')
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    //@ts-expect-error
    return navigateTo(route.query.callbackUrl ?? '/dashboard', { external: true })
  }
}