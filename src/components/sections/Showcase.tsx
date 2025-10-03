import Image from "next/image";
import Section from "../Section";

export default function Showcase() {
    return (
        <Section className="pt-10 md:pt-14 pb-16 md:pb-20">
            <div className="container">
                {/* Внешняя рамка + glow */}
                <div className="showcase-wrapper">
                    {/* Карточка-рамка приложения */}
                    <div className="app-shell relative z-[2]">
                        {/* Верхняя полоска окна */}
                        <div className="app-titlebar">
                            <span className="win-dot win-red" />
                            <span className="win-dot win-yellow" />
                            <span className="win-dot win-green" />
                            <div className="ml-2 text-sm text-white/60">Assistant Studio</div>
                        </div>

                        {/* Контент окна */}
                        <div className="relative">
                            <Image
                                src="/Assistant-1.png"
                                alt="Assistant customization and chat"
                                width={1600}
                                height={1100}
                                quality={95}
                                priority
                                sizes="(min-width:1280px) 1100px, (min-width:768px) 90vw, 100vw"
                                className="block w-full h-auto select-none
                           ring-1 ring-white/10 rounded-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}