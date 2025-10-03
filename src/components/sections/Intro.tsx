import Section from "../ui/Section";

export default function Intro() {
    return (
        <Section className="pt-14 md:pt-20 pb-24 md:pb-28 text-center">
            {/* Пилюля */}
            <div className="flex justify-center">
        <span className="pill">
          <span className="pill-dot" />
          Everything you need
        </span>
            </div>

            {/* Заголовок */}
            <h2
                className="mt-6 font-display font-semibold tracking-tight
                   text-[26px] leading-snug
                   md:text-[34px] md:leading-snug
                   text-white"
            >
                An AI designed to connect with you on a human level - offering <br className="hidden md:block" />
                support, understanding, <br className="hidden md:block" />
                and real companionship anytime.
            </h2>
        </Section>
    );
}