export default async function resolveUploadResponse(url: string, formdata: FormData) {
    const response = await fetch(url, {
        method: 'POST',
        body: formdata
    })

    if (response.ok) return true;
    else return;
}