interface Props {
    page: number;
    size: number;
    total: number;
    setPage: (page: number) => void;
}

export default function Pagination({
    page,
    size,
    total,
    setPage
}: Props) {
    const pages = Math.ceil(total / size);
    return (
        <div>
            <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
            >
                ←
            </button>

            <span>
                {" "}Страница {page} из {pages}{" "}
            </span>
            <button
                disabled={page >= pages}
                onClick={() => setPage(page + 1)} > →
            </button>
        </div>
    );
}