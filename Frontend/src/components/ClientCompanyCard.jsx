import readableDateTime from "../utils/formatDate";

export default function ClientCompanyCard({item}) {

    return (
        <div key={item?._id} className="w-full bg-white break-inside-avoid self-start overflow-hidden border text-(--dark-color) rounded-md p-2">
            <h5 className="font-bold capitalize">{item?.name}</h5>
            <p className="text-sm whitespace-pre-wrap">{item?.description}</p>
            <p className="text-sm">🕛 {readableDateTime(item?.createdAt)}</p>
            <div className="w-full flex items-center justify-between gap-2 border-t border-dashed pt-2 mt-2">
                <img className="rounded-md border bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${item?.createdBy?.name}`} alt={item?.createdBy?.name} width={42} height={42} />
                <div className="w-full text-xs">
                    <p className="line-clamp-1 capitalize">{item?.createdBy?.name}</p>
                    <p className="line-clamp-1">{item?.createdBy?.email}</p>
                    <p className="font-semibold capitalize">CreatedBy: {item?.createdBy?.role}</p>
                </div>
            </div>
        </div>
    );
}
