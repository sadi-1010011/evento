

export default function Page({ params }: { params: { id: string }}) {

    const num = params.id;
    return (
        <div>
            <h1>test number: {num}</h1>
        </div>
    )
}