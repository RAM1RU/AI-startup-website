"use client";
import Image from "next/image";

/**
 * Фигуры распределены по всей высоте страницы.
 * Оборачивай всю страницу в <main className="relative overflow-x-hidden">,
 * чтобы абсолюты позиционировались относительно всей ленты.
 */
export default function BackgroundShapes() {
    return (
        <>
            {/* top-right — star 1 */}
            <div
                className="shape shape--feather right-[-90px] top-[4%] opacity-85 rotate-[80deg]"
                style={{ width: 330, height: 330 }}  // размеры у обёртки
            >
                <Image
                    src="/holo-star.png"
                    alt=""
                    width={330}
                    height={330}
                    className="block animate-float"     // теперь анимация у img
                    priority
                />
            </div>

            {/* top-left — sphere (частично заезжает в контейнер) */}
            <Image
                src="/holo-sphere.png"
                alt=""
                width={300}
                height={300}
                priority
                className="shape shape--feather animate-rot
                   left-[-120px] top-[27%] opacity-85"
            />

            {/* mid-right — donut (тор) */}
            <Image
                src="/donut.png"
                alt=""
                width={360}
                height={360}
                className="shape shape--feather animate-rot
                   right-[-110px] top-[110%] opacity-80 rotate-[-60deg]"
            />

            {/* mid-left — star 2 */}
            <div
                className="shape shape--feather left-[-80px] top-[140%] opacity-85 rotate-[50deg]"
                style={{ width: 380, height: 380 }}  // размеры у обёртки
            >
                <Image
                    src="/holo-star.png"
                    alt=""
                    width={380}
                    height={380}
                    className="block animate-float"     // теперь анимация у img
                    priority
                />
            </div>

            {/* bottom-right — S-спираль */}
            <div
                className="shape shape--feather right-[-120px] top-[220%] opacity-80 rotate-[-30deg]"
                style={{ width: 330, height: 330 }}  // размеры у обёртки
            >
                <Image
                    src="/holo-S.png"
                    alt=""
                    width={330}
                    height={330}
                    className="block animate-float"     // теперь анимация у img
                    priority
                />
            </div>

            <Image
                src="/holo-diamond.png"
                alt=""
                width={360}
                height={360}
                className="shape shape--feather animate-rot
                   left-[-120px] top-[290%] opacity-80 rotate-[-60deg]"
            />

            {/* top-left — sphere (частично заезжает в контейнер) */}
            <Image
                src="/purple-sphere.png"
                alt=""
                width={340}
                height={340}
                priority
                className="shape shape--feather animate-rot
                   right-[-110px] top-[375%] opacity-85"
            />

            <Image
                src="/holo-star.png"
                alt=""
                width={300}
                height={300}
                priority
                className="shape shape--feather animate-rot
                   left-[580px] top-[400%] opacity-85"
            />

            <div
                className="shape shape--feather left-[-110px] top-[430%] opacity-85 rotate-[30deg]"
                style={{ width: 340, height: 340 }}  // размеры у обёртки
            >
                <Image
                    src="/purple-helix.png"
                    alt=""
                    width={340}
                    height={340}
                    className="block animate-float"     // теперь анимация у img
                    priority
                />
            </div>
        </>
    );
}