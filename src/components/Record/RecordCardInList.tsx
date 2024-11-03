import { Category } from '@/stores/recordStore'

type RecordCardInListT = {
    title: string
    category: Category
    details: string
}

const RecordCardInList = ({ title, category, details }: RecordCardInListT) => {
    const MAX_LENGTH = 100
    const isLongText = details.length > MAX_LENGTH

    return (
        <div className="border-2 border-black rounded-md p-4 cursor-pointer">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="text-lg mb-1">{category}</div>
            <div className="relative overflow-hidden">
                <div
                    className={`
            text-base leading-5 text-gray-800
            ${isLongText ? 'line-clamp-2' : ''}
          `}
                    style={{
                        display: isLongText ? '-webkit-box' : 'block',
                        WebkitBoxOrient: isLongText ? 'vertical' : undefined,
                        WebkitLineClamp: isLongText ? 2 : undefined,
                        overflow: isLongText ? 'hidden' : undefined,
                    }}
                >
                    {details}
                </div>
                {isLongText && (
                    <div
                        className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"
                    />
                )}
            </div>
        </div>
    )
}

export default RecordCardInList