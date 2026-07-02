interface Props {
    message: string;
}

export default function Error({
    message
}: Props) {
    return (
        <h3 style={{ color: "red" }}>
            {message}
        </h3>
    );
}