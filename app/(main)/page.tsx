import { AuthenticatedHomePage } from "../_components/AuthenticatedHomePage";
import { GuestHomePage } from "../_components/GuessHomePage";
import { getSession } from "../_lib/getSession";

export default async function HomePage() {
  const session = await getSession();
  return session ? (
    <AuthenticatedHomePage
      userName={session.user.name}
      userId={session.user.id}
    />
  ) : (
    <GuestHomePage />
  );
}
