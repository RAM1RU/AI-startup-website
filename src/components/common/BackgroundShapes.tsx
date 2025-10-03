"use client";
import Image from "next/image";

export default function BackgroundShapes() {
    return (
        <>
            {/* star — верхний правый */}
            <div
                className="shape shape--feather right-[-90px] top-[4%] opacity-85 rotate-[80deg]"
                style={{ width: 330, height: 330 }}
            >
                <Image
                    src="/shapes/holo-star.png"
                    alt=""
                    width={330}
                    height={330}
                    className="block animate-float"
                    priority
                />
            </div>

            {/* sphere — верхний левый */}
            <Image
                src="/shapes/holo-sphere.png"
                alt=""
                width={300}
                height={300}
                priority
                className="shape shape--feather animate-rot left-[-120px] top-[27%] opacity-85"
            />

            {/* donut — середина справа */}
            <Image
                src="/shapes/donut.png"
                alt=""
                width={360}
                height={360}
                className="shape shape--feather animate-rot right-[-110px] top-[110%] opacity-80 rotate-[-60deg]"
            />

            {/* star — середина слева */}
            <div
                className="shape shape--feather left-[-80px] top-[140%] opacity-85 rotate-[50deg]"
                style={{ width: 380, height: 380 }}
            >
                <Image
                    src="/shapes/holo-star.png"
                    alt=""
                    width={380}
                    height={380}
                    className="block animate-float"
                    priority
                />
            </div>

            {/* S-helix — низ справа */}
            <div
                className="shape shape--feather right-[-120px] top-[220%] opacity-80 rotate-[-30deg]"
                style={{ width: 330, height: 330 }}
            >
                <Image
                    src="/shapes/holo-S.png"
                    alt=""
                    width={330}
                    height={330}
                    className="block animate-float"
                    priority
                />
            </div>

            {/* diamond */}
            <Image
                src="/shapes/holo-diamond.png"
                alt=""
                width={360}
                height={360}
                className="shape shape--feather animate-rot left-[-120px] top-[290%] opacity-80 rotate-[-60deg]"
            />

            {/* purple sphere */}
            <Image
                src="/shapes/purple-sphere.png"
                alt=""
                width={340}
                height={340}
                priority
                className="shape shape--feather animate-rot right-[-110px] top-[375%] opacity-85"
            />

            {/* star — (исправлен путь: был без /shapes) */}
            <Image
                src="/shapes/holo-star.png"
                alt=""
                width={300}
                height={300}
                priority
                className="shape shape--feather animate-rot left-[580px] top-[400%] opacity-85"
            />

            {/* purple helix */}
            <div
                className="shape shape--feather left-[-110px] top-[430%] opacity-85 rotate-[30deg]"
                style={{ width: 340, height: 340 }}
            >
                <Image
                    src="/shapes/purple-helix.png"
                    alt=""
                    width={340}
                    height={340}
                    className="block animate-float"
                    priority
                />
            </div>
        </>
    );
}