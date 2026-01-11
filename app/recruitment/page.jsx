import fetchData from "@/lib/sanity/fetchData";
import RecruitmentForm from "@/components/RecruitmentForm";
import LoginSection from "@/components/LoginSection";
import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

export default async function RecruitmentPage() {
  const session = await getServerSession(authOptions);
  const positions = await fetchData("recruitment");
  const activePositions = positions?.filter((pos) => pos.isActive === true) || [];

  if (activePositions.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 px-6 max-w-4xl mx-auto">
      {!session ? (
        <LoginSection />
      ) : (
        <>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-white">
                Join Our Team
              </h1>
              <p className="text-gray-400">
                Welcome,{" "}
                <span className="text-neon-green font-medium">
                  {session.user.name}
                </span>
                . Please select a position and complete your application.
              </p>
            </div>

            <div className="pb-1">
              <LogoutButton />
            </div>
          </div>

          {activePositions && activePositions.length > 0 ? (
            <RecruitmentForm positions={activePositions} user={session.user} />
          ) : (
            <div className="p-8 rounded-2xl border border-neon-green/20 bg-neon-green/5 text-center">
              <p className="text-neon-green font-medium">
                We are not currently recruiting. Check back later!
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
