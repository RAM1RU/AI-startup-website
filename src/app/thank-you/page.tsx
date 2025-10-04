import { Suspense } from "react";

function Content() {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const ok = params.get("ok");
    const err = params.get("err");
    const unsub = params.get("unsub");

    let title = "You’re on the list 🎉";
    let subtitle = "We’ve confirmed your email. We’ll notify you at launch.";

    if (err) {
        title = "Hmm, that link didn’t work";
        subtitle = "The confirmation link is invalid or expired. Please try again.";
    } else if (unsub === "1") {
        title = "You’re unsubscribed";
        subtitle = "We won’t email you again, unless you opt in later.";
    } else if (unsub === "already") {
        title = "Already unsubscribed";
        subtitle = "Your address is already opted out.";
    } else if (unsub === "missing") {
        title = "Email not found";
        subtitle = "We couldn’t find that email in our list.";
    } else if (!ok) {
        title = "Thanks!";
        subtitle = "We’ve processed your request.";
    }

    return (
        <main className="min-h-[60vh] grid place-items-center px-6">
            <div className="text-center max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                <p className="mt-3 text-white/70">{subtitle}</p>
            </div>
        </main>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="min-h-[60vh] grid place-items-center">Loading…</div>}>
            <Content />
        </Suspense>
    );
}