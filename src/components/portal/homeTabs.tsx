import FeedType from "@/enums/FeedTypes"

export default function HomeTabs({selectedTab, setTab}: { selectedTab: string, setTab: (tab: FeedType) => void }) {
    return (
        <div className="flex justify-between w-full">
            <Tab title="For You" selected={selectedTab === FeedType.FORYOU} onClick={() => setTab(FeedType.FORYOU)} />
            <Tab title="Following" selected={selectedTab === FeedType.FOLLOWING} onClick={() => setTab(FeedType.FOLLOWING)} />
        </div>
    )
}


function Tab({ title, selected, onClick }: { title: string, selected: boolean, onClick: () => void }) {
    return (
        <div className={`w-1/2 pb-4 text-center ${selected ? "text-blue-500 border-b-4 border-blue-500" : ""}`}>
            <span className="text-sm font-bold cursor-pointer" onClick={onClick}>{title}</span>
        </div>
    )
}