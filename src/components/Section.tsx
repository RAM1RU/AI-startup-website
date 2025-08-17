export default function Section({ children, className="" }:{
    children: React.ReactNode; className?: string
}) {
    return <section className={`py-20 md:py-28 ${className}`}><div className="container">{children}</div></section>;
}