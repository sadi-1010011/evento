export async function generateStaticParams() {
    const events = await fetch(`https://evento-calicut.vercel.app/api/events`, { method: 'GET' }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
  }

export default function Page({ params }: { params: { id: string }}) {

    const num = params.id;
    return (
        <div>
            <h1>test number: {num}</h1>
        </div>
    )
}