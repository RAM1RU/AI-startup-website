export default function Announcement(){
    return (
        <div className="flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/15 px-3 py-1 text-xs text-brand-300">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" />
        Latest integration just arrived
      </span>
        </div>
    );
}